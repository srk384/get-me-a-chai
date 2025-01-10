'use client'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const page = () => {

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title = "login - Get Me a Chai"
        if(session){
            router.push("/dashboard")
        }else{
            router.push("/login");
        }
        console.log(session);
        
    }, [session, router]);

    if (!session) {
        return (
            <>
                <div className='text-white min-h-[87.4vh]'>
                    <div className='flex flex-col justify-center items-center h-[45vh] gap-4'>
                        <button onClick={() => { signIn("github") }} className='bg-white hover:bg-slate-200 text-black font-bold py-2 px-4 rounded flex items-center'>
                            <img src='/github.png' alt='GitHub Logo' className='' width={180} />
                        </button>
                    </div>
                </div>
            </>
        )
    }


    // return (
    //     <div className='text-white min-h-[87.4vh]'>
    //         <div className='flex flex-col justify-center items-center h-[45vh] gap-4'>
    //             <button onClick={() => { signIn("github") }} className='bg-white hover:bg-slate-200 text-black font-bold py-2 px-4 rounded flex items-center'>
    //                 <img src='/github.png' alt='GitHub Logo' className='' width={180} />
    //             </button>
    //         </div>
    //     </div>
    // )
    return null
}

export default page