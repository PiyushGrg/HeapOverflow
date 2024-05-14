"use client";
import { Button, Modal, ModalContent, Switch, Textarea } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AnswerFormProps {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    type?: 'edit' | 'add';
    questionId: string;
    initialData?: any;
}

function AnswerForm({showForm,setShowForm,type='add',questionId,initialData}: AnswerFormProps) {

    const router = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [showCode, setShowCode] = React.useState(false);
    const [answer,setAnswer] = React.useState<any>({
        description: '',
        code: ''
    });

    const onSave = async() => {
        try {
            setLoading(true);
            answer.question = questionId;
            if(!showCode){
                answer.code = '';
            }
            
            if(type === 'add'){
                await axios.post('/api/answers',answer);
                toast.success('Answer added successfully');
            }
            else{
                await axios.put(`/api/answers/${initialData._id}`,answer);
                toast.success('Answer updated successfully');
            }
            setShowForm(false);
            router.refresh();
        } catch (error:any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(type === 'edit'){
            setAnswer(initialData);
            if(initialData.code){
                setShowCode(true);
            }
        }
    },[initialData,type]);

  return (
    <Modal isOpen={showForm} onOpenChange={()=>setShowForm(false)} size='4xl' placement='center' scrollBehavior='inside' backdrop='blur'>
        <ModalContent className="overflow-y-auto h-[300px]">
            <div className='p-5 flex flex-col gap-5'>
                {type === 'add' ? <h1 className='text-primary dark:text-dark-primary text-xl'>Write an answer</h1> : <h1 className='text-primary dark:text-dark-primary text-xl'>Edit answer</h1>}

                <Textarea placeholder='Description' 
                    value={answer.description} 
                    onChange={(e)=>setAnswer({...answer,description:e.target.value})} 
                    label='Description'
                    labelPlacement='outside'
                />

                <Switch
                    defaultChecked={showCode}
                    onChange={(e)=> setShowCode(!showCode)}
                    isSelected={showCode}
                >
                    <span className='text-gray-600'>Do you want to add code?</span>
                </Switch>

                {showCode && (
                    <CodeMirror 
                        value={answer.code}
                        theme="dark"
                        extensions={[javascript({jsx:true})]}
                        onChange={(value) => setAnswer({...answer,code:value})}
                        defaultValue={answer.code}
                    />
                )}

                <div className='flex justify-end gap-5'>
                    <Button onClick={()=>setShowForm(false)} className='dark:bg-gray-500'>Cancel</Button>
                    <Button color='primary' isLoading={loading} onClick={onSave} className='dark:bg-dark-primary'>Submit</Button>
                </div>

            </div>
        </ModalContent>
    </Modal>
  )
}

export default AnswerForm;