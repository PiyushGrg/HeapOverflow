import { IAnswer } from '@/interfaces';
import { Button, Modal, ModalContent, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface CommentFormProps {
    type?: 'add' | 'edit';
    answer: IAnswer;
    showCommentForm: boolean;
    setShowCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
    reloadData: () => void;
    initialData?: any;
}

function CommentForm({type='add',answer,showCommentForm,setShowCommentForm,reloadData,initialData=null}: CommentFormProps) {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [text, setText] = useState('');

    const onSave = async() => {
        try {
            setLoading(true);
            if(type === 'add'){
                await axios.post('/api/comments',{text,answer:answer._id,question:answer.question._id});
                toast.success('Comment added successfully');
            }
            else{
                await axios.put(`/api/comments/${initialData._id}`,{text});
                toast.success('Comment updated successfully');
            }
            setShowCommentForm(false);
            reloadData();
        } catch (error:any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if(type === 'edit'){
            setText(initialData.text);
        }
    }, [initialData,type]);

  return (
    <Modal
        isOpen={showCommentForm}
        onOpenChange={()=>setShowCommentForm(false)}
        size='2xl'
    >   
        <ModalContent>
            <div className='p-5'>
                <h1 className='text-primary text-2xl'>
                    {type === 'add' ? 'Add Comment' : 'Edit Comment'}
                </h1>
                
                <Textarea
                    placeholder='Enter comment'
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                />

                <div className='flex justify-end gap-5 mt-5'>
                    <Button onClick={()=>setShowCommentForm(false)}>Cancel</Button>
                    <Button color='primary' isLoading={loading} onClick={onSave}>Submit</Button>
                </div>

            </div>
        </ModalContent>
    </Modal>
  )
}

export default CommentForm;