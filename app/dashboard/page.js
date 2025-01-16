"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateProfile } from '../actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'

const dashboard = () => {
    const [form, setform] = useState({})
    const { data: session, update } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title = "Dashboard - Get Me a Chai"
        if (session) {
            router.push("/dashboard")
            getData()
        } else {
            router.push("/login");
        }
    }, [session, router]);

    useEffect(() => {
        if (localStorage.getItem("showToast") === "true") {
            toast.success("Profile Updated!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setTimeout(() => {
                localStorage.removeItem("showToast");
            }, 3 * 1000);
        }
    }, []);

    const getData = async () => {
        let user = await fetchUser(session.user.name);
        setform(user);
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (form) => {
        const result = await updateProfile(session.user.name, form);
        console.log(session)
        if (result && result.acknowledged) {
            localStorage.setItem("showToast", "true");
            window.location.reload();
        } else {
            toast.error(`${result.error}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }


    if (session) {
        return (
            <div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-center p-10">Welcome to your Dashboard</h2>
                    {/* input for name, urname, email, profile pic, cover pic ,razorpay id, razorpay secret and a save button */}
                    <form action={handleSubmit} className="flex flex-col gap-1 items-center text-sm md:text-base">
                        <div>
                            <div htmlFor="name" className="text-gray-200">Name</div>
                            <input onChange={handleChange} value={form.name} type="text" name="name" id="name" placeholder="Your Name" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <div htmlFor="username" className="text-gray-200">Username</div>
                            <input onChange={handleChange} value={form.username ? form.username : ""} type="text" name="username" id="username" placeholder="Your Username" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <div htmlFor="email" className="text-gray-200">Email</div>
                            <input readOnly value={form.email ? form.email : ""} type="email" name="email" id="email" placeholder="Your Email" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <div htmlFor="profilepic" className="text-gray-200">Profile Picture</div>
                            <input onChange={handleChange} value={form.profilepic ? form.profilepic : ""} type="text" name="profilepic" id="profilepic" placeholder="Your Profile Picture" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <div htmlFor="coverpic" className="text-gray-200">Cover Picture</div>
                            <input onChange={handleChange} value={form.coverpic ? form.coverpic : ""} type="text" name="coverpic" id="coverpic" placeholder="Your Cover Picture" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <div htmlFor="razorpayid" className="text-gray-200">Razorpay Id</div>
                            <input onChange={handleChange} value={form.razorpayid ? form.razorpayid : ""} type="text" name="razorpayid" id="razorpayid" placeholder="Your Razorpay Id" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <div htmlFor="razorpaysecret" className="text-gray-200">Razorpay Secret</div>
                            <input onChange={handleChange} value={form.razorpaysecret ? form.razorpaysecret : ""} type="password" name="razorpaysecret" id="razorpaysecret" placeholder="Your Razorpay Secret" className="border p-2 rounded w-80 md:w-96 bg-slate-700 border-none" />
                        </div>
                        <div>
                            <button type="submit" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return null
}

export default dashboard