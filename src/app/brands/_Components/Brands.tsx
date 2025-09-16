'use client'
import Loading from '@/app/Loading';
import { Daum, Root } from '@/interface/brands.interface';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Brands() {
    const { data, isLoading, isError, error } = useQuery<Root>({
        queryKey: ['brands'], queryFn: async () => {
            const res = await fetch(`/api/brands`);
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
    console.log(data);
    return (
        <div>
            <h2 className='my-5'>Brands:</h2>
            {data?.data?.map(brand => <BrandDetails key={brand._id} brand={brand}></BrandDetails>)}
        </div>
    )
}
export function BrandDetails({ brand }: { brand: Daum }) {
    return (
        <>
            <Link href={`/brands/${brand._id}`} className='flex justify-center items-center flex-col gap-5'>
                <h2>{brand.name}</h2>
                <Image src={brand.image} alt='brandImage' width={300} height={300} />
            </Link>
        </>
    )
}