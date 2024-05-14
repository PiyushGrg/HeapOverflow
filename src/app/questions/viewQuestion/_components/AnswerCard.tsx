"use client";
import ViewCode from '@/components/ViewCode';
import { dateTimeFormat } from '@/helpers/DateTimeFormat';
import { IAnswer } from '@/interfaces';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react'
import CommentForm from './CommentForm';
import axios from 'axios';
import AnswerForm from './AnswerForm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


function AnswerCard({answer,mongoId}:{answer:IAnswer,mongoId:string}) {

  const router = useRouter();

  const [selectedAnser, setSelectedAnswer] = useState<any>(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [commentDeleteLoading, setCommentDeleteLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [commentType, setCommentType] = useState<'add'|'edit'>('add');

  const getComments = async() => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/comments?answer=${answer._id}`);
      setComments(res.data.data);
    } catch (error:any) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnswer = async() => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/answers/${answer._id}?question=${answer.question._id}`);
      toast.success('Answer deleted successfully');
      router.refresh();
    } catch (error:any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };


  const deleteComment = async(id:string) => {
    try {
      setCommentDeleteLoading(true);
      await axios.delete(`/api/comments/${id}`);
      toast.success('Comment deleted successfully');
      getComments();
    } catch (error:any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setCommentDeleteLoading(false);
    }
  };

  return (
    <div className='border bg-gray-100 p-3 flex flex-col gap-2 border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-400'>
        <div className='flex gap-10 text-xs'>
            <span>Answered On <span className='text-primary dark:text-dark-primary'>{dateTimeFormat(answer.updatedAt)}</span> </span>
            <span>By <span className='text-secondary dark:text-dark-secondary'>{answer.user.name}</span> </span>
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-300'>{answer.description}</p>

        {answer.code && <ViewCode code={answer.code} />}

        <div className='flex justify-between items-center mt-5'>
          
          {!showComments ?
            <Button color='primary' variant='light' size='sm' className='dark:hover:bg-dark-primary/50 dark:text-dark-primary' isLoading={loading} onClick={()=>{
              setShowComments(true);
              getComments();
            }}>See Comments</Button>  : 
             
            <Button color='primary' variant='light' size='sm' className='dark:hover:bg-dark-primary/50 dark:text-dark-primary' isLoading={loading} onClick={()=>setShowComments(false)}>Hide Comments</Button>
          }

          <div className='flex sm:gap-5'>
            {answer.user._id === mongoId && 
              <>

                <Button size='sm' onClick={()=>{
                  deleteAnswer();
                }} color='danger' variant='light' isLoading={deleteLoading}>Delete</Button>

                <Button size='sm' onClick={()=>{
                  setSelectedAnswer(answer);
                  setShowAnswerForm(true);
                }} color='warning' variant='light'>Edit</Button>

              </>
            }
            <Button size='sm' onClick={()=>{
              setShowCommentForm(true);
              setCommentType('add');
            }} color='secondary' variant='light' className='dark:hover:bg-dark-secondary/50 dark:text-dark-secondary'>Add Comment</Button>
          </div>
        </div>

        {showComments && comments.length>0 && (
          <div className='flex flex-col gap-2 ml-5 mt-5'>
            {comments.map((comment:any)=>(
              <div key={comment._id} className='border bg-gray-200 p-2 flex flex-col gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600'>

                <p className='text-sm text-gray-600 dark:text-gray-300'>{comment.text}</p>
                <div className='flex justify-between mt-5 items-center flex-wrap gap-5'>
                  <div className='flex gap-5 flex-wrap'>
                    {comment.user._id === mongoId && (
                      <>

                        <Button size='sm' onClick={()=>{
                          setSelectedComment(comment);
                          deleteComment(comment._id);
                        }} color='danger' variant='light' isLoading={commentDeleteLoading && selectedComment?._id === comment._id}>Delete</Button>

                        <Button size='sm' onClick={()=>{
                          setCommentType('edit');
                          setSelectedComment(comment);
                          setShowCommentForm(true);
                        }} color='warning' variant='light'>Edit</Button>

                      </>
                    )}
                  </div>
                  <div className='flex gap-5 text-xs dark:text-gray-400'>
                    <span>Commented On <span className='text-primary dark:text-dark-primary'>{dateTimeFormat(comment.updatedAt)}</span> </span>
                    <span>By <span className='text-secondary dark:text-dark-secondary'>{comment.user.name}</span> </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {showCommentForm && <CommentForm answer={answer}showCommentForm={showCommentForm} setShowCommentForm={setShowCommentForm} reloadData={getComments} 
            initialData={selectedComment} type={commentType}
        /> }


        {showAnswerForm && (
            <AnswerForm 
              showForm={showAnswerForm} 
              setShowForm={setShowAnswerForm} 
              questionId={answer.question._id} 
              initialData={selectedAnser}
              type="edit"
            />
        )}
    </div>
  )
}

export default AnswerCard;