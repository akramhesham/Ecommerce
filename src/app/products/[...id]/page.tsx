import getSingleProduct from '@/apis/singleProduct.api';
import { ProductInterface } from '@/interface/products.interaface';
import Image from 'next/image';
import React from 'react'
import GetProductBtn from '../_components/GetProductBtn';
import productCategory from '@/apis/productCategory.api';
import ProdItem from '../_components/ProdItem';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } =await params;
    const data: ProductInterface = await getSingleProduct(id[0]);
    let cartId: ProductInterface[] = [];
    if(id[1]){
        cartId=await productCategory(id[1])        
    }
    if (!data || !cartId) {
        return <div className="flex justify-center">Page not found</div>
    }
    return (
        <>
            <div className='flex flex-wrap items-center'>
                <div className='w-full md:w-1/3'>
                    <Image src={data.imageCover} className='w-full object-cover' alt='productDetails' width={300} height={300} />
                </div>
                <div className='w-full md:w-2/3 p-5'>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <span>{data.category.name}</span>
                    <div className='flex justify-between my-3'>
                        <span>{data.price}EGP</span>
                        <span><i className='fa-solid fa-star text-rating'></i>{data.ratingsAverage}</span>
                    </div>
                    <GetProductBtn id={data._id}></GetProductBtn>
                </div>
            </div>
            <h2>Related Products</h2>
            <div className='flex flex-wrap'>
                {cartId.map((prod:ProductInterface)=><ProdItem key={prod._id} prod={prod}></ProdItem>)}
            </div>
        </>
    )
}
