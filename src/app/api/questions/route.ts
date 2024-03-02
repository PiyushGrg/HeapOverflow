import Question from "@/models/QuestionModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getMongoUseridFromClerkId } from "@/actions/users";

connectDB();

export async function POST(request:NextRequest) {
    try {
        const {userId} = auth();
        const reqBody = await request.json();
        reqBody.user = await getMongoUseridFromClerkId(userId!);
        await Question.create(reqBody);

        return NextResponse.json({message:"Question created successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}