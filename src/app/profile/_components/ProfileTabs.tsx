"use client";
import React from 'react'
import { Tabs,Tab, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { IQuestion } from '@/interfaces';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ProfileTabsProps {
  askedQ: IQuestion[];
  answeredQ: IQuestion[];
  savedQ: IQuestion[];
  commentedQ: IQuestion[];
  mongoId: string;
}

function ProfileTabs({askedQ, answeredQ, savedQ,commentedQ,mongoId}: ProfileTabsProps) {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [selectedQuestionToDelete, setSelectedQuestionToDelete] = React.useState<string | null>(null);

    const deleteQuestion = async (id: string) => {
      try {
        setLoading(true);
        await axios.delete(`/api/questions/${id}`);
        toast.success('Question deleted successfully');
        router.refresh();
      } catch (error:any) {
        toast.error(error.response.data.message || error.message);
      } finally {
        setLoading(false);
      }
    };


    const getQuestion = (question: IQuestion) => (
      <div className='border p-3 flex flex-col gap-2 bg-gray-50 cursor-pointer hover:border-gray-700'>
        <h1>{question.title}</h1>
        <span className='text-gray-500 text-sm line-clamp-2'>{question.description}</span>

        <div className='flex justify-end gap-5 mt-5'>

          <Button size='sm' variant='flat' 
            onClick={()=> router.push(`/questions/viewQuestion/${question._id}`)}>View</Button>


          {question.user._id === mongoId && 
            <>
            
              <Button size='sm' color='secondary' variant='flat' isLoading={loading && selectedQuestionToDelete === question._id}
                onClick={()=>{
                  setSelectedQuestionToDelete(question._id);
                  deleteQuestion(question._id);
                }}>
                  Delete
              </Button>
              <Button size='sm' color='primary' variant='flat' 
                onClick={()=> router.push(`/questions/editQuestion/${question._id}`)}>Edit</Button>

            </>
          }
        </div>
      </div>
    );

    const getEmptyMessage = () => (
      <div>
        <h1 className='text-sm'>No questions found</h1>
      </div>
    );

  return (
    <Tabs color='primary' onSelectionChange={(key)=>router.push(`/profile?tab=${key}`)}>
        <Tab title="Questions Asked" key="asked">
          <div className='flex flex-col gap-5'>
            {askedQ.map((question) => (
              <div key={question._id}>
                {getQuestion(question)}
              </div>
            ))}

            {askedQ.length === 0 && getEmptyMessage()}
          </div>
        </Tab>

        <Tab title="Questions Answered" key="answered">
          <div className='flex flex-col gap-5'>
            {answeredQ.map((question) => (
              <div key={question._id}>
                {getQuestion(question)}
              </div>
            ))}

            {answeredQ.length === 0 && getEmptyMessage()}
          </div>
        </Tab>

        <Tab title="Questions Saved" key="saved">
          <div className='flex flex-col gap-5'>
            {savedQ.map((question) => (
              <div key={question._id}>
                {getQuestion(question)}
              </div>
            ))}

            {savedQ.length === 0 && getEmptyMessage()}
          </div>
        </Tab>

        <Tab title="Questions Commented" key="commented">
          <div className='flex flex-col gap-5'>
            {commentedQ.map((question) => (
              <div key={question._id}>
                {getQuestion(question)}
              </div>
            ))}

            {commentedQ.length === 0 && getEmptyMessage()}
          </div>
        </Tab>
    </Tabs>
  )
}

export default ProfileTabs;