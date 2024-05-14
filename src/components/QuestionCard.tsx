"use client";
import { dateTimeFormat } from '@/helpers/DateTimeFormat';
import { IQuestion } from '@/interfaces';
import { useRouter } from 'next/navigation';
import React from 'react'

function QuestionCard({question}: {question: IQuestion}) {

    const router = useRouter();

  return (
    <div className='p-3 flex flex-col gap-3 border bg-gray-50 hover:border-gray-700 cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-300'
        onClick={()=>router.push(`/questions/viewQuestion/${question._id}`)}
    >
        <h1 className='dark:text-gray-100'>{question.title}</h1>
        <p className='text-gray-500 line-clamp-2 text-sm dark:text-gray-300'>{question.description}</p>

        <div className='flex flex-col md:flex-row md:justify-between mt-5 md:items-center'>
            <div>
                <span className='text-secondary dark:text-dark-secondary text-xs'>
                    {question.totalAnswers>0 ? question.totalAnswers : "No"} answers
                </span>
            </div>

            <div className='flex gap-10 text-xs flex-wrap'>
                <span className='dark:text-gray-400'>
                    Asked On <span className='text-primary dark:text-dark-primary'>{dateTimeFormat(question.createdAt)}</span>
                </span>

                <span className='dark:text-gray-400'>
                    By <span className='text-secondary dark:text-dark-secondary'>{question.user.name}</span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default QuestionCard;