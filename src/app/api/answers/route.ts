import Answer from "@/models/AnswerModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getMongoUseridFromClerkId } from "@/actions/users";
import Question from "@/models/QuestionModel";

connectDB();

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

        return NextResponse.json({message:"Answer posted successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}