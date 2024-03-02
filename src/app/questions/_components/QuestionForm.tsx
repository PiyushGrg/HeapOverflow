"use client";
import { Button, Chip, Input, Switch, Textarea } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface QuestionFormProps {
    initialData?: any;
    type?: 'edit' | 'add';
}

function QuestionForm({initialData=null, type='add'}: QuestionFormProps) {

    const [loading, setLoading] = React.useState(false);
    const [showCode, setShowCode] = React.useState(false);
    const [newTag, setNewTag] = React.useState('');
    const [question, setQuestion] = React.useState<any>({
        title: '',
        description: '',
        code: '',
        tags: [],
    });

    const router = useRouter();

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            if(!showCode){
                question.code = '';
            }
            
            if(type==='add') {
                await axios.post('/api/questions', question);
                toast.success('Question created successfully');
            }
            else {
                await axios.put(`/api/questions/${initialData._id}`, question);
                toast.success('Question updated successfully');
            }
            router.back();
            router.refresh();
        } catch (error:any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(type==='edit' && initialData) {
            setQuestion(initialData);
            if(initialData.code) {
                setShowCode(true);
            }
        }
    }, [initialData,type]);


  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <Input placeholder='Title' isRequired required label="Title" labelPlacement='outside'
            value={question.title} onChange={(e)=> setQuestion({...question,title:e.target.value})} />

        <Textarea placeholder='Description' isRequired required label="Description" labelPlacement='outside'
            value={question.description} onChange={(e)=> setQuestion({...question,description:e.target.value})} />


        <div className='flex gap-5 items-end md:w-1/2'>
            <Input placeholder='Enter new tag' label="Tags" labelPlacement='outside'
                value={newTag} onChange={(e)=> setNewTag(e.target.value)}     
            />

            <Button size='sm' onClick={()=> {
                if(question.tags.includes(newTag)) {
                    toast.error('Tag already exists');
                }
                else {
                    setQuestion({...question,tags:[...question.tags,newTag]});
                    setNewTag('');
                }
            }}>Add Tag</Button>
        </div>

        <div className='flex gap-5'>
            {question.tags.map((tag:string, index:number) => (
                <Chip key={index} color='primary' onClose={()=> {
                    setQuestion({...question,tags:question.tags.filter((t:any)=> t!==tag)});
                }}>{tag}</Chip>
            ))}
        </div>

        <Switch
            defaultChecked={showCode}
            onChange={(e)=> setShowCode(!showCode)}
            isSelected={showCode}
        >
            <span className='text-gray-600'>Do you want to add code?</span>
        </Switch>

        {showCode && (
            <CodeMirror 
                value={question.code}
                theme="dark"
                extensions={[javascript({jsx:true})]}
                onChange={(value) => setQuestion({...question,code:value})}
                defaultValue={question.code}
            />
        )}


        <div className='flex justify-end gap-5'>
            <Button onClick={()=>router.back()}>Cancel</Button>
            <Button type='submit' color='primary' isLoading={loading}>Save</Button>
        </div>
    </form>
  )
}

export default QuestionForm;