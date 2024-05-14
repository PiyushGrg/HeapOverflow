"use client";
import { Chip, Input } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

function Filter() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState('');
  const tag = searchParams.get('tag');
  const {theme} = useTheme();

  const isDarkMode = theme === 'dark';
  const colorChip = isDarkMode ? 'secondary' : 'primary';

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (!tag) {
        router.push(`/?search=${search}`);
      }
    }, 300);

    return () => {
      clearTimeout(redirectTimeout); // Cleanup function to clear the timeout when component unmounts or dependency changes
    };
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
            <h1>Showing results for tag: <Chip color={colorChip} onClose={()=>router.push("/")}>{tag}</Chip></h1> 
          )}
        </div>
    </div>
  )
}

export default Filter;
