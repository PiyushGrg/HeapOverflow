import React from 'react'
import QuestionForm from '../../_components/QuestionForm';
import Question from '@/models/QuestionModel';
import { IQuestion } from '@/interfaces';
import { connectDB } from '@/config/dbConfig';

connectDB();

interface EditQuestionProps {
  params: {
    questionid: string
  }
}


async function EditQuestion({params}: EditQuestionProps) {

  const question:IQuestion = await Question.findById(params.questionid).populate('user') as IQuestion;

  return (
    <div>
      <div className='bg-gray-100 p-3 dark:bg-gray-800'>
            <h1 className='text-secondary font-semibold text-xl dark:text-dark-secondary'>Edit Question</h1>
            <span className='text-gray-600 text-sm dark:text-gray-300'>Write a question that you want to ask from the community.</span>
        </div>
        
        <div className='border p-3 mt-5 dark:border-gray-700'>
            <QuestionForm initialData={JSON.parse(JSON.stringify(question))} type='edit'/>
        </div>
    </div>
  )
}

export default EditQuestion;