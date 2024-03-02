"use client";
import { Chip, Input } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

function Filter() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState('');
  const tag = searchParams.get('tag');

  useEffect(() => {
    if(!tag){
      setTimeout(()=>{
        router.push(`/?search=${search}`);
      },300);
    }
  }, [search]);


  return (
    <div className='mt-5'>
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for questions'
            size='lg'
        />

        <div className='mt-5'>
          {tag && (
           <h1>Showing results for tag: <Chip color='primary' onClose={()=>router.push("/")}>{tag}</Chip></h1> 
          )}
        </div>
    </div>
  )
}

export default Filter;