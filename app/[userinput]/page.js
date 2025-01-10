import React from 'react'
import PaymentPage from '../components/PaymentPage'
import connectDb from '../db/connectdb'
import User from '../models/User'
import { notFound } from 'next/navigation'

const userinput = async ({ params }) => {

    if (params.userinput) {
        await connectDb()
        let user = await User.findOne({ username: params.userinput })
        if (!user) {
            notFound()
        }
    }

    return (
        <>
            <PaymentPage username={await params.userinput} />
        </>
    )
}

export default userinput