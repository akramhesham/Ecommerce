import { ProductInterface } from '@/interface/products.interaface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GetProductBtn from './GetProductBtn'
import HeartItem from '@/app/_component/HeartItem'

export default function ProdItem({ prod }: { prod: ProductInterface }) {
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
      <div className='p-5'>
        <HeartItem productId={prod._id}></HeartItem>
        <Link href={`/products/${prod._id}/${prod.category._id}`}>
          <Image width={300} height={300} src={prod.imageCover} alt='imageCover' className='w-full' />
          <span className='text-main'>{prod.category.name}</span>
          <p className='line-clamp-1'>{prod.title}</p>
          <div className='flex justify-between my-3'>
            <div>
            <div className={prod.priceAfterDiscount ? 'line-through':''}>{prod.price}EGP</div>
            {prod.priceAfterDiscount && <div>{prod.priceAfterDiscount} EGP</div>}
            </div>
            <span><i className='fa-solid fa-star text-rating'></i>{prod.ratingsAverage}</span>
          </div>
        </Link>
        <GetProductBtn id={prod._id}></GetProductBtn>
      </div>
    </div>
  )
}
