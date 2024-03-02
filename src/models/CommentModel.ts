import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true,
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answers",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

}, {timestamps:true} );


// check if model already exists
if(mongoose.models && mongoose.models["comments"]) {
    delete mongoose.models["comments"];
}

const Comment = mongoose.model("comments", commentSchema);
export default Comment;