'use client'
import { addWishList } from '@/apis/addWishList.api';
import { removeWishList } from '@/apis/removeWishList.api';
import { Daum, Root } from '@/interface/wishList.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function HeartItem({ productId }: { productId: string }) {
  const [heart, setHeart] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => addWishList(id),
    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      setHeart(true);
    },
    onError: () => {
      toast.error('login First')
    }
  })
  const { mutate: removeMutate } = useMutation({
    mutationFn: (id: string) => removeWishList(id),
    onSuccess: (removeData) => {
      toast.success(removeData?.message)
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      setHeart(false);
    },
    onError: () => {
      toast.error('login First')
    }
  })

  const { data: wishlistGet = [] } = useQuery<Daum[]>({
    queryKey: ['wishlist'], queryFn: async () => {
      const res = await fetch(`/api/wishList`);
      const payload: Partial<Root> & { message?: string } = await res.json();
      if (Array.isArray(payload?.data)) {
        return payload.data;
      }
      return [];
    }
  })
useEffect(() => {
  if (!Array.isArray(wishlistGet)) {
    setHeart(false);
    return;
  }

  const isInWishlist = wishlistGet.some((item) => item._id === productId);
  setHeart(isInWishlist);
}, [wishlistGet, productId]);

//   useEffect(() => {
//     if(process.env.NODE_ENV==='development'&&!Array.isArray(wishlistGet)){
//       console.error('wishlistGet is not an array:', wishlistGet);

//     }
//    if (!Array.isArray(wishlistGet)) {
//     setHeart(false);
//     return;
//   }
//   if (!wishlistGet.length) {
//     setHeart(false);
//     return;
//   }  
//   const theWishListState = wishlistGet.some((item) => item._id === productId);
//   setHeart(theWishListState);
// }, [wishlistGet, productId]);
  return (
    <i className={`fa-solid cursor-pointer ${heart ? 'fa-heart text-red-600' : 'fa-heart-broken'}`} onClick={() => {
      heart ? removeMutate(productId) : mutate(productId)
    }}></i>

  )
}
