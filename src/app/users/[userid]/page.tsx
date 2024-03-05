import User from "@/models/userModel";
import Question from "@/models/QuestionModel";
import React from "react";
import { connectDB } from "@/config/dbConfig";
import Image from "next/image";
import QuestionCard from "@/components/QuestionCard";
import { IQuestion } from "@/interfaces";

connectDB();

interface userInfoProps {
  params: {
    userid: string;
  };
}

async function userInfo({ params }: userInfoProps) {

  const userData: any = await User.findById(params.userid);
  const questions: IQuestion[] = await Question.find({user: params.userid,}).sort({createdAt: -1}).populate("user");
  
  return (
    <div>
      <div className="bg-gray-100 p-5 flex gap-5 items-center">
        <Image
          src={userData?.profilePicUrl!}
          height={70}
          width={70}
          alt=""
          className="rounded-full"
        />

        <div className="flex flex-col">
          <h1 className="text-primary text-xl uppercase font-semibold">
            {userData?.name}
          </h1>
          <p className="text-gray-600 text-sm">{userData?.email}</p>
          <p className="text-gray-600 text-sm">
            {questions.length} Questions Asked
          </p>
        </div>
      </div>

      <h1 className="mt-5">
        Questions Asked By {userData?.name} ({questions.length})
      </h1>

      <div className="mt-5">
        <div className="flex flex-col gap-5 mt-5">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={JSON.parse(JSON.stringify(question))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default userInfo;