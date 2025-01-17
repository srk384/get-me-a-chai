import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "../../models/Payment";
import connectDb from "../../db/connectdb";

export const POST = async (req, res) => {
    await connectDb();
    let body = await req.formData()
    body = Object.fromEntries(body)
    // console.log(body);

    // check if razorpayOrderId is present on our server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({success:false, message: "Order ID not found" })
    }
    //verify the payment
    let verified = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.KEY_SECRET);
    if (verified) {
        // update the payment status to success
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }else{
        return NextResponse.json({success:false, message: "Payment verification failed" })
    }
}
