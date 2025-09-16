import getSubBrand from '@/apis/getSubBrand.api';
import { Data } from '@/interface/subBrands.interface';
import React from 'react'
import SubBrand from '../_Components/SubBrand';

export default async function page({ params }: { params: Promise<{id:string}>}) {
    const { id } =await params;
    const res: Data = await getSubBrand(id);
    return (
            <SubBrand res={res}></SubBrand>
    )
}
