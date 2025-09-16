import { Data } from "@/interface/subCategory.interface";
import Image from "next/image";

export default function SubCategory({ res }: { res: Data }) {
    return (
        <div className='flex justify-center items-center flex-col gap-3'>
            <h2>{res.name}</h2>
            <Image src={res.image} alt='subCategory' width={300} height={300} />
        </div>
    )
}