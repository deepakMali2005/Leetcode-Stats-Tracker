import React from 'react'
import { ArrowLeft } from 'lucide-react';
import Logo from './logo'
import { Button } from './ui/button'
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='w-full h-[50px] flex justify-between items-center px-10'>
        <Link href={"/"} className='flex justify-center items-center'>
            <Logo width='w-15' height='h-10' /> <h1 className='text-3xl font-extrabold'>AlgoBoard</h1>
        </Link>

        <Link href={"/"}>
            <Button className='cursor-pointer'>
                <ArrowLeft/>
                <p>
                    Go Back to Home
                </p>
            </Button>
        </Link>

    </div>
  )
}

export default Navbar