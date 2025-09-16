import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../typescript/cart.interface";
import { deleteProduct } from "../_actions/deleteProduct.actions";
import { toast } from "react-toastify";
import { updateCount } from "../_actions/updateCount.actions";
import Image from "next/image";

export function ProductDetails({ prod }: { prod: Product }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast.error('Login First')
    }
  })
  const {mutate:updateMutate,isPending:updatePending}=useMutation({
    mutationFn:updateCount,
    onSuccess: (data)=>{
      toast.success(data?.message);
      queryClient.invalidateQueries({queryKey:['cart']})
    },
    onError:()=>{
      toast.error('Login First');
    }
  })
  function updateHandler(){
    prod.count<prod.product.quantity?updateMutate({productId:prod.product._id,count:prod.count+1}):"Not available"
  }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <Image src={prod.product.imageCover} alt='' width={150} height={150} />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prod.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button onClick={()=>updateMutate({productId:prod.product._id,count:prod.count-1})} className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>
          <div>
            <span id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{updatePending?<i className='fa-solid fa-spin fa-spinner'></i>:prod.count}</span>
          </div>
          <button onClick={updateHandler} className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prod.price}
      </td>
      <td className="px-6 py-4">
        <span onClick={() => mutate(prod.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
          {isPending ? <i className='fa-solid fa-spin fa-spinner'></i> : <i className='cursor-pointer fa-solid fa-trash text-red-600'></i>}
        </span>
      </td>
    </tr>
  )
}