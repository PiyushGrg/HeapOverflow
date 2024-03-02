import Comment from "@/models/CommentModel";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

connectDB();

export async function PUT(request:NextRequest,{params}:{params:{commentid:string}}) {
    try {
        
        const reqBody = await request.json();

        await Comment.findByIdAndUpdate(params.commentid,reqBody);

        return NextResponse.json({message:"Comment updated successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}


export async function DELETE(request:NextRequest,{params}:{params:{commentid:string}}) {
    try {
        
        const {userId} = auth();
        if(!userId) {
            throw new Error("User not authenticated");
        }
        
        await Comment.findByIdAndDelete(params.commentid);

        return NextResponse.json({message:"Comment deleted successfully"},{status:201});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}