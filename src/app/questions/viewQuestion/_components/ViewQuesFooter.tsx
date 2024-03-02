"use client";
import { IQuestion } from '@/interfaces';
import { Button } from '@nextui-org/react';
import React from 'react'
import AnswerForm from './AnswerForm';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function ViewQuesFooter({question,mongoId}:{question:IQuestion,mongoId:string}) {

    const router = useRouter();

    const [showAnswerModal, setShowAnswerModal] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSave = async() => {
        try {
            setLoading(true);
            const payload:IQuestion = question;
            payload.savedBy.push(mongoId);
            await axios.put(`/api/questions/${question._id}`,payload);
            toast.success('Question Saved');
            router.refresh();
        } catch (error: any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    const removeFromSave = async() => {
        try {
            setLoading(true);
            const payload:IQuestion = question;
            payload.savedBy = payload.savedBy.filter((id:string) => id!==mongoId);
            await axios.put(`/api/questions/${question._id}`,payload);
            toast.success('Question Discarded');
            router.refresh();
        } catch (error: any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <div className='flex justify-between items-center'>
            <span className='text-sm'>
                {question.totalAnswers>0 ? `${question.totalAnswers} Answers` : 'No Answers'}
            </span>

            <div className='flex gap-5'>

                {question.savedBy.includes(mongoId) && (
                    <Button size='sm' color='primary' onClick={()=>removeFromSave()}
                        isLoading={loading}
                    >
                        Discard
                    </Button>
                )}

                {!question.savedBy.includes(mongoId) && (
                    <Button size='sm' color='primary' onClick={()=>onSave()}
                        isLoading={loading}
                    >
                        Save
                    </Button>
                )}

                <Button size='sm' color='secondary' onClick={()=>setShowAnswerModal(true)}
                    isDisabled={mongoId===question.user._id}
                >
                    Write an Answer
                </Button>

            </div>
        </div>

        {showAnswerModal && (
            <AnswerForm showForm={showAnswerModal} setShowForm={setShowAnswerModal} questionId={question._id.toString()}/>
        )}

    </div>
  )
}

export default ViewQuesFooter;