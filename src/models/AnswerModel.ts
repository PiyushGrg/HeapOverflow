import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: false,
        trim: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

}, {timestamps:true} );


// check if model already exists
if(mongoose.models && mongoose.models["answers"]) {
    delete mongoose.models["answers"];
}

const Answer = mongoose.model("answers", answerSchema);
export default Answer;