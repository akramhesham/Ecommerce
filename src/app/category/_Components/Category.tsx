'use client'
import Loading from '@/app/Loading';
import { Daum, Root } from '@/interface/category.interface';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function Category() {
  const { data, isLoading, isError, error } = useQuery<Root>({
    queryKey: ['category'], queryFn: async () => {
      const res = await fetch(`/api/category`);
      const payload = await res.json();
      return payload;
    }
  })
  console.log(data);
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <div>
      <h2 className='my-3'>Categories:</h2>
      {data?.data?.map(categ => <CategoryDetails key={categ._id} categ={categ}></CategoryDetails>)}
    </div>
  )
}
export function CategoryDetails({ categ }: { categ: Daum }) {
  return (
    <>
      <Link href={`/category/${categ._id}`} className='flex justify-center items-center flex-col gap-5'>
        <h2>{categ.name}</h2>
        <Image width={300} height={300} src={categ.image} alt='imageCateg' />
        <hr />
      </Link>
    </>
  )
}