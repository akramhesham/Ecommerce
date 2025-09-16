'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '../../assets/images/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { CartResp } from '../cart/typescript/cart.interface'

export default function Navbar() {
    const { data } = useQuery<CartResp>({
        queryKey: ['cart'], queryFn: async () => {
            const res = await fetch(`/api/cart`);
            const payload = await res.json();
            return payload;
        }
    })
    const [isOpen, setOpen] = useState(true);
    const { data: session, status } = useSession()
    const links = [
        { path: '/products', element: 'products' }
    ]
    const auths = [
        { path: '/auth/register', element: 'register' },
        { path: '/auth/login', element: 'login' }
    ]
    function handleLogOut() {
        signOut({ callbackUrl: '/' })
    }
    return (
        <div>
            <nav className="bg-light text-gray-500 border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap gap-5 items-center justify-between mx-auto p-4">
                    <Link href={'/'}>
                        <Image src={Logo} alt='FreshCartLogo' />
                    </Link>
                    <button onClick={() => setOpen(!isOpen)} data-collapse-toggle="navbar-default" type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isOpen && 'hidden'} w-full md:flex justify-between gap-5 md:w-full`} id="navbar-default">
                        <ul className="font-medium flex flex-col gap-5 p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {links.map(link => <li key={link.path}>
                                <Link href={link.path} className="block py-2 px-3  rounded-sm md:bg-transparent md:p-0 dark:text-white" aria-current="page">{link.element.toUpperCase()}</Link>
                            </li>
                            )}
                        </ul>
                        <ul className="font-medium flex flex-col gap-5 p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li><i className='fa-brands fa-instagram'></i></li>
                            <li><i className='fa-brands fa-facebook'></i></li>
                            <li><i className='fa-brands fa-tiktok'></i></li>
                            <li><i className='fa-brands fa-twitter'></i></li>
                            <li><i className='fa-brands fa-linkedin'></i></li>
                            <li><i className='fa-brands fa-youtube'></i></li>
                            {status == 'unauthenticated' ?
                                <>  {auths.map(auth => <li key={auth.path}>
                                    <Link href={auth.path} className="block py-2 px-3  rounded-sm md:bg-transparent md:p-0 dark:text-white" aria-current="page">{auth.element.toUpperCase()}</Link>
                                </li>
                                )}</> : <>
                                    <li className='cursor-pointer' onClick={handleLogOut}>Signout</li>
                                    <li className='flex items-center gap-2'>
                                        <Link href={'/cart'} className='relative'>
                                            <span className='absolute -top-7 -right-9 text-white bg-black rounded-full text-xs font-bold p-1'>
                                                {data?.numOfCartItems}
                                            </span>
                                        </Link>
                                        <i className='fa-solid fa-cart-shopping'></i>
                                    </li>
                                    <li>HI {session?.user?.name}</li>
                                    {session?.user.image && <li><Image src={session?.user.image} alt='' className='size-[25px] rounded-full' /></li>}
                                </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
