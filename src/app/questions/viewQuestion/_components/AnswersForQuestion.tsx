import { connectDB } from '@/config/dbConfig';
import { IQuestion } from '@/interfaces';
import Answer from '@/models/AnswerModel';
import React from 'react';
import AnswerCard from './AnswerCard';
import { currentUser } from '@clerk/nextjs';
import { getMongoUseridFromClerkId } from '@/actions/users';

connectDB();

async function AnswersForQuestion({question}:{question: IQuestion}) {

  const userData = await currentUser(); 
  const mongoId = await getMongoUseridFromClerkId(userData?.id!);

    const answers = await Answer.find({question: question._id}).populate('user').populate("question").sort({updatedAt: -1});
    
  return (
    <div className='flex flex-col gap-5'>
        {answers.map((answer:any) => (
            <AnswerCard answer={JSON.parse(JSON.stringify(answer))} key={answer._id} mongoId={mongoId.toString()}/>
        ))}

    </div>
  )
}

export default AnswersForQuestion;