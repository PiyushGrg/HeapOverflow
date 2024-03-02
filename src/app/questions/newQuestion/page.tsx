import React from 'react'
import QuestionForm from '../_components/QuestionForm';

function NewQuestion() {
  return (
    <div>
        <div className='bg-gray-100 p-3'>
            <h1 className='text-secondary font-semibold text-xl'>New Question</h1>
            <span className='text-gray-600 text-sm'>Write a question that you want to ask from the community.</span>
        </div>
        
        <div className='border p-3 mt-5'>
            <QuestionForm/>
        </div>
    </div>
  )
}

export default NewQuestion;