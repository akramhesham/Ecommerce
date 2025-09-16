import getSubCategory from '@/apis/subCategory.api';
import { Data } from '@/interface/subCategory.interface';
import React from 'react'
import SubCategory from '../_Components/SubCategory';

export default async function page({ params }: { params: Promise<{id:string}>}) {
    const { id } =await params;
    const res: Data = await getSubCategory(id);
    return (
            <SubCategory res={res}></SubCategory>
    )
}
