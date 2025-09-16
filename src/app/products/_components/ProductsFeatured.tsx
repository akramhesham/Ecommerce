import { ProductInterface } from '@/interface/products.interaface';
import React from 'react'
import ProdItem from './ProdItem';
import getProducts from '@/apis/allProducts.api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ProductsFeatured() {
  const data:ProductInterface[]=await getProducts();
  return (
    <>
    <div className='flex items-center justify-center my-5'>
    <Button className='bg-main cursor-pointer hover:bg-green-500 mr-auto my-5 block mb-5'><Link href={'/category'}>View All Categories</Link></Button>
    <Button className='bg-main cursor-pointer hover:bg-green-500 mr-auto my-5 block mb-5'><Link href={'/brands'}>View All Brands</Link></Button>
    </div>
    <div className='flex flex-wrap'>
      {data.map((prod:ProductInterface)=><ProdItem key={prod._id} prod={prod}></ProdItem>)}
    </div>
    </>
  )
}

