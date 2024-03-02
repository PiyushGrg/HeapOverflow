import Question from "@/models/QuestionModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Answer from "@/models/AnswerModel";
import Comment from "@/models/CommentModel";

connectDB();

export async function PUT(request:NextRequest,{params}:{params:{questionid:string}}) {
    try {

        const reqBody = await request.json();
        await Question.findByIdAndUpdate(params.questionid,reqBody);

        return NextResponse.json({message:"Question updated successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}


export async function DELETE(request:NextRequest,{params}:{params:{questionid:string}}) {
    try {
        const {userId} = auth();
        if(!userId) {
            throw new Error("User not authenticated");
        }
        
        // delete comments of question and answers too
        const answers = await Answer.find({question:params.questionid});
        const comments = await Comment.find({question:params.questionid});
    
        for(let i=0;i<answers.length;i++) {
            await Answer.findByIdAndDelete(answers[i]._id);
        }

        for(let i=0;i<comments.length;i++) {
            await Comment.findByIdAndDelete(comments[i]._id);
        }

        await Question.findByIdAndDelete(params.questionid);

        return NextResponse.json({message:"Question deleted successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}