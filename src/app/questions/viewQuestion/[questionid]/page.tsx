import ViewCode from '@/components/ViewCode';
import { dateTimeFormat } from '@/helpers/DateTimeFormat';
import { IQuestion } from '@/interfaces';
import Question from '@/models/QuestionModel';
import React from 'react';
import ViewQuesFooter from '../_components/ViewQuesFooter';
import { currentUser } from '@clerk/nextjs';
import { getMongoUseridFromClerkId } from '@/actions/users';
import { connectDB } from '@/config/dbConfig';
import AnswersForQuestion from '../_components/AnswersForQuestion';
import Link from 'next/link';

connectDB();

interface ViewQuestionProps {
  params: {
    questionid: string
  }
}

async function ViewQuestion({params}: ViewQuestionProps) {

  const question:IQuestion = await Question.findById(params.questionid).populate('user') as IQuestion;

  const userData = await currentUser();
  const mongoId = await getMongoUseridFromClerkId(userData?.id!);

  return (
    <div>
      <div className='bg-gray-100 p-3'>
          <h1 className='text-primary text-lg md:text-xl'>{question.title}</h1>
          
          <div className='flex gap-5 md:gap-10 text-xs mt-2'>
            <span>
              Asked On <span className='text-primary'>{dateTimeFormat(question.createdAt)}</span>
            </span>

            <Link href={`/users/${question.user._id}`}>
              By <span className='text-secondary underline cursor-pointer'>{question.user.name}</span>
            </Link>
          </div>

      </div>

      <div className='flex gap-5 mt-5'>
        {question.tags.map((tag:string, index:number) => (
          <Link href={`/?tag=${tag}`} key={index} className='bg-primary p-2 rounded-md text-sm text-white capitalize underline cursor-pointer'>{tag}</Link>
        ))}
      </div>

      <div className='flex flex-col gap-5 mt-7'>
        <p className='text-sm text-gray-600'>{question.description}</p>

        {question.code && <ViewCode code={question.code}/>}
        <ViewQuesFooter question={JSON.parse(JSON.stringify(question))} mongoId={mongoId.toString()}/>

        {question.totalAnswers>0 && <AnswersForQuestion question={JSON.parse(JSON.stringify(question))}/>}
      </div>
    </div>
  )
}

export default ViewQuestion;