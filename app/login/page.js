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
            router.push("/")
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
                        <button onClick={() => { signIn("google") }} className='bg-white hover:bg-slate-200 text-black font-bold py-3 px-4 rounded flex items-center'>
                            <img src='./google.png' alt='Google Logo' className='invert' width={180} />
                        </button>
                        <button onClick={() => { signIn("github") }} className='bg-white hover:bg-slate-200 text-black font-bold py-2 px-4 rounded flex items-center'>
                            <img src='/github.png' alt='GitHub Logo' width={180} />
                        </button>

                        <button onClick={() => { alert("Payment option is not available for the guest"); signIn("credentials") }} className='bg-white hover:bg-slate-200 text-black py-4 px-9 rounded flex items-center gap-2'>
                            <img src='./guest.png' alt='Guest Logo' width={50} />
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