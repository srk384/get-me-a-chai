"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '../actions/useractions'
import { fetchUser, fetchPayment, updateProfile } from '../actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation'
import { Bounce } from 'react-toastify'
import { useSession } from "next-auth/react"

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        // Check if session is undefined (still loading)
        if (session === undefined) return;

        // Redirect to login if session is null
        if (!session) {
            router.push("/login");
        }

    }, [session, router])


    useEffect(() => {
        getData(username)

    }, [fetchUser, fetchPayment])

    useEffect(() => {
        document.title = `${username} - Get Me a Chai`


        if (searchParams.get('paymentdone') == "true") {
            toast.success('Thanks for your Contribution', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark    ",
                transition: Bounce,
            });

            router.push(`/${username}`)
        }
    }, [])

    const chnageHandle = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (username) => {
        let user = await fetchUser(username);
        let dbpayments = await fetchPayment(username);
        setcurrentUser(user);
        setPayments(dbpayments);
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": { "address": "Razorpay Corporate Office" },
            "theme": { "color": "#3399cc" }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    if (session === undefined) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }
    if (session) {
        return (
            <>
                <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
                <div className='relative w-full h-56 md:h-96'>
                    <img src={currentUser.coverpic} alt="" className="object-cover w-full h-full" />
                    <img className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg h-28 w-28 object-cover' src={currentUser.profilepic} alt="" />
                </div>
                <div className='text-center mt-16 space-y-2'>
                    <div className='font-semibold text-base md:text-xl'>@{username}</div>
                    <div className='text-slate-400 text-sm md:text-base'>is creating paint swatches, Warhammer tutorials, and more</div>
                    <div className='text-slate-400 text-sm md:text-base'>
                        {payments.length} Contributors . Raised: ₹{payments.reduce((sum, payment) => sum + payment.amount, 0)}
                    </div>
                </div>
                <div className='text-center mt-6'>
                    <span className='bg-pink-600 px-4 py-3 rounded-lg font-semibold text-sm md:text-base'>Become a member</span>
                </div>
                <div className='md:w-4/5 flex min-h-60 gap-2 justify-center mx-auto mt-6 mb-8 pb-6 flex-col-reverse md:flex-row px-2'>
                    <div className='md:w-[35%] bg-slate-800 rounded-lg pb-6'>
                        <div className='text-base md:text-xl font-bold text-center m-4'>Supporter's Contribution</div>
                        <ul className='p-2 px-5 space-y-4'>
                            {payments.slice(0, 5).map((item, index) => (<li key={index} className="flex items-center gap-2 text-sm md:text-base"><img src="/avatar.gif" alt="Avatar" width={30} /><span>{item.name} contributed <span className="font-bold">₹{item.amount}</span> with a message "{item.message}"</span></li>))}
                        </ul>
                    </div>
                    <div className='md:w-[35%] bg-slate-800 rounded-lg'>
                        <div className='text-base md:text-xl font-bold text-center m-4'>Make Contribution</div>
                        {/* enter name message and amount enter custom amount like $10,$5,$15 */}
                        <div className='p-2 px-5 space-y-3 text-sm md:text-base'>
                            <input required onChange={chnageHandle} value={paymentform.name ?? ""} name='name' type="text" placeholder='Name *' className='w-full p-2 rounded-lg bg-slate-700 ' />
                            <input onChange={chnageHandle} value={paymentform.message ?? ""} name='message' type="text" placeholder='Message' className='w-full p-2 rounded-lg bg-slate-700' />
                            <input required onChange={chnageHandle} value={paymentform.amount ?? ""} name='amount' type="text" placeholder='Amount *' className='w-full p-2 rounded-lg bg-slate-700' />
                            <button className='bg-white text-black font-semibold px-4 py-2 rounded-lg mx-1 disabled:bg-slate-700 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed ' onClick={() => pay(100)} disabled={!paymentform.name || paymentform.name.length < 3} >Pay ₹100</button>
                            <button className='bg-white text-black font-semibold px-4 py-2 rounded-lg mx-1 disabled:bg-slate-700 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed ' onClick={() => pay(200)} disabled={!paymentform.name || paymentform.name.length < 3} >Pay ₹200</button>
                            <button className='bg-white text-black font-semibold px-4 py-2 rounded-lg mx-1 disabled:bg-slate-700 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed ' onClick={() => pay(300)} disabled={!paymentform.name || paymentform.name.length < 3} >Pay ₹300</button>
                            <div className='text-center'>
                                <button className='bg-pink-600 px-4 py-2 rounded-lg font-semibold m-4 disabled:bg-slate-700 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed' onClick={() => pay(paymentform.amount)} disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.amount || paymentform.amount <= 0} >Contribute</button>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default PaymentPage