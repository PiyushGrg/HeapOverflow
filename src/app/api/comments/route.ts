import Answer from "@/models/AnswerModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getMongoUseridFromClerkId } from "@/actions/users";
import Question from "@/models/QuestionModel";
import Comment from "@/models/CommentModel";

connectDB();

export async function POST(request:NextRequest) {
    try {
        const {userId} = auth();
        const reqBody = await request.json();
        reqBody.user = await getMongoUseridFromClerkId(userId!);
        await Comment.create(reqBody);

        return NextResponse.json({message:"Comment added successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}


export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl?.searchParams;
        const answer = searchParams?.get('answer');
        
        const comments = await Comment.find({answer}).populate('user').sort({updatedAt:-1});
        return NextResponse.json({data:comments},{status:200});

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}