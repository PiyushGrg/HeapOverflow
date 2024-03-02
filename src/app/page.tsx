import { handleUserRegister } from "@/actions/users";
import Filter from "@/components/Filter";
import QuestionCard from "@/components/QuestionCard";
import { connectDB } from "@/config/dbConfig";
import { IQuestion } from "@/interfaces";
import Question from "@/models/QuestionModel";
import Link from "next/link";

connectDB();

interface HomeProps {
  searchParams: {
    tag: string;
    search: string;
  };
}

export default async function Home({searchParams}: HomeProps) {
  
  await handleUserRegister();

  const {tag,search} = searchParams;

  let filtersObject = {};

  if(tag){
    filtersObject = {
      tags: {
        $in: [tag],
      },
    };
  }

  if(search){
    filtersObject = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
  }

  const questions: IQuestion[] = await Question.find(filtersObject).sort({ updatedAt: -1 }).populate("user");


  return (
    <div>
      <div className="flex justify-end">
        <Link href="/questions/newQuestion" className="bg-primary text-white px-4 py-2 rounded">Ask a question</Link>
      </div>

      <Filter/>

      <div className="flex flex-col gap-5 mt-5">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={JSON.parse(JSON.stringify(question))} />
        ))}
      </div>
    </div>
  );
}
