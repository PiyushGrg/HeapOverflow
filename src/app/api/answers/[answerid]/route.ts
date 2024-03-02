import Answer from "@/models/AnswerModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Question from "@/models/QuestionModel";
import Comment from "@/models/CommentModel";

connectDB();

export async function PUT(request:NextRequest,{params}:{params:{answerid:string}}) {
    try {
        
        const reqBody = await request.json();
    
        await Answer.findByIdAndUpdate(params.answerid,reqBody);

        return NextResponse.json({message:"Answer updated successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}


export async function DELETE(request:NextRequest,{params}:{params:{answerid:string}}) {
    try {

        const searchParams = request.nextUrl.searchParams;
        const questionid = searchParams.get('question');

        const {userId} = auth();
        if(!userId) {
            throw new Error("User not authenticated");
        }
        
        // delete comments of answer also
        const comments = await Comment.find({answer:params.answerid});

        for(let i=0;i<comments.length;i++) {
            await Comment.findByIdAndDelete(comments[i]._id);
        }

        await Answer.findByIdAndDelete(params.answerid);

        // decrement totalAnswers
        const question :any = await Question.findById(questionid);
        question.totalAnswers-=1;
        await question.save();

        return NextResponse.json({message:"Answer deleted successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}