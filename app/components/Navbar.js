"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [showDropdown, setshowDropdown] = useState(false)
    const { data: session } = useSession()

    return (
        <div className='flex justify-between items-center h-12 md:h-16 bg-slate-800 text-white p-4'>
            <div className="logo">
                <Link href="/">
                    <div className='font-bold md:text-xl text-base'>GetMeAChai</div>
                </Link>
            </div>
            {!session && <div>
                <Link href="/login">
                    <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center me-2 mb-2">Login</button>
                </Link>
            </div>}


            {session && <><button onClick={() => setshowDropdown(!showDropdown)} onBlur={() => { setTimeout(() => { setshowDropdown(false) }, 300) }} id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 md:w-12 md:h-12 rounded-full" src={session.user.image} alt="user photo" />
            </button>

                {/* <!-- Dropdown menu --> */}
                <div id="dropdownAvatar" className={`z-10  bg-white divide-y divide-gray-100 rounded-lg shadow min-w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-16 right-1 ${showDropdown ? "block" : "hidden"}`} aria-labelledby="dropdownUserAvatarButton">
                    <div className="px-4 py-3 text-xs md:text-sm text-gray-900 dark:text-white ">
                        <div>{session.user.name}</div>
                        <div className="font-medium truncate">{session.user.email}</div>
                    </div>
                    <ul className="py-2 text-xs md:text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                        <li>
                            <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                        </li>
                        <li>
                            <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                        </li>

                    </ul>
                    <div className="py-2">
                        <Link onClick={() => signOut()} href="#" className="block px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                    </div>
                </div>

            </>}
        </div>
    )
}

export default Navbar