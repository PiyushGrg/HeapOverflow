import Answer from "@/models/AnswerModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getMongoUseridFromClerkId } from "@/actions/users";
import Question from "@/models/QuestionModel";
import { Resend } from "resend";
import User from "@/models/userModel";
import EmailTemplate from "@/components/EmailTemplate";

connectDB();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:NextRequest) {
    try {
        const {userId} = auth();
        const reqBody = await request.json();
        reqBody.user = await getMongoUseridFromClerkId(userId!);
        await Answer.create(reqBody);

        // increment totalAnswers
        const question :any = await Question.findById(reqBody.question);
        question.totalAnswers += 1;
        await question.save();

        const questionOwner = await User.findById(question.user);
        const email:string = questionOwner!.email;

        // author details
        const author = await User.findById(reqBody.user);
        const authorName = author!.name;
        const authorImage = author!.profilePicUrl as string;
        const reviewText = reqBody.description.length > 100 ? reqBody.description.substring(0, 100) + '...' : reqBody.description;

        // send notification to question owner
        const data = await resend.emails.send({
            from: 'Heap Overflow <no-reply@heapoverflow.tech>',
            to: email,
            subject: '🎉 Your question has been answered!',
            react: EmailTemplate({ authorName, authorImage, reviewText,questionId:question._id}),
        });

        // console.log(data);

        return NextResponse.json(data);
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}