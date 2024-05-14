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
      <div className='bg-gray-100 p-3 dark:bg-gray-700'>
          <h1 className='text-primary text-lg md:text-xl dark:text-dark-primary'>{question.title}</h1>
          
          <div className='flex gap-5 md:gap-10 text-xs mt-2'>
            <span className='dark:text-gray-300'>
              Asked On <span className='text-primary dark:text-dark-primary'>{dateTimeFormat(question.createdAt)}</span>
            </span>

            <Link href={`/users/${question.user._id}`} className='dark:text-gray-300'>
              By <span className='text-secondary underline cursor-pointer dark:text-dark-secondary'>{question.user.name}</span>
            </Link>
          </div>

      </div>

      <div className='flex gap-5 mt-5'>
        {question.tags.map((tag:string, index:number) => (
          <Link href={`/?tag=${tag}`} key={index} className='bg-primary dark:bg-dark-primary p-2 rounded-md text-sm text-white capitalize underline cursor-pointer'>{tag}</Link>
        ))}
      </div>

      <div className='flex flex-col gap-5 mt-7'>
        <p className='text-sm text-gray-600 dark:text-gray-300'>{question.description}</p>

        {question.code && <ViewCode code={question.code}/>}
        <ViewQuesFooter question={JSON.parse(JSON.stringify(question))} mongoId={mongoId.toString()}/>

        {question.totalAnswers>0 && <AnswersForQuestion question={JSON.parse(JSON.stringify(question))}/>}
      </div>
    </div>
  )
}

export default ViewQuestion;