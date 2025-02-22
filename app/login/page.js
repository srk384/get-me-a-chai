'use client'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const page = () => {

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title = "login - Get Me a Chai"
        if (session) {
            router.push(session.user.name??"/")
        } else {
            router.push("/login");
        }
        // console.log(session);

    }, [session, router]);

    if (!session) {
        return (
            <>
                <div className='text-white'>
                    <div className='flex flex-col justify-center items-center py-52 gap-5'>
                        <button onClick={() => { signIn("google") }} className='bg-white hover:bg-slate-200 text-black h-20 w-48 rounded flex items-center justify-center'>
                            <img src='./google.png' alt='Google Logo' className='invert' width={140} />
                        </button>
                        <button onClick={() => { signIn("github") }} className='bg-white hover:bg-slate-200 text-black h-20 w-48 rounded flex items-center justify-center'>
                            <img src='/github.png' alt='GitHub Logo' width={180} />
                        </button>
                        <button onClick={() => { signIn("credentials") }} className='bg-white hover:bg-slate-200 text-black h-20 w-48 rounded flex items-center justify-center gap-1'>
                            <img src='./guest.png' alt='Guest Logo' width={40} />
                            <div className='text-3xl font-bold'>Guest </div>
                        </button>
                    </div>
                </div>
            </>
        )
    }



    return null
}

export default page