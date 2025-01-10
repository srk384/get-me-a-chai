"use server"
import Razorpay from "razorpay"
import User from "../models/User"
import Payment from "../models/Payment"
import connectDb from "../db/connectdb"

export const initiate = async (amount, username, Paymentform) => {
    await connectDb();
    let user = await User.findOne({ username: username }).lean();

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: user.razorpaysecret })

    let options = {
        amount: amount * 100,
        currency: "INR",
    };
    let x = await instance.orders.create(options);

    await Payment.create({ oid: x.id, name: Paymentform.name, to_user: username, message: Paymentform.message, amount: amount });
    return x;

}
export const fetchUser = async (username) => {
    await connectDb();
    let user = await User.findOne({ username }).lean();

    // console.log(user)
    return user;
}
export const fetchPayment = async (username) => {
    await connectDb();
    let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    // console.log(payment)
    return payments;
}
export const updateProfile = async (oldusername, form) => {
    await connectDb();
    // console.log(form);
    let nform = Object.fromEntries(form)
    // console.log(nform);
    let user = await User.findOne({ username: nform.username });
    // console.log("findone:" + user);
    if (user && user.username == oldusername ) {
        return { error: "Username already exists" }
    }
    let updatedUser = await User.updateOne({ email: nform.email }, nform);
    let updatedPayments = await Payment.updateMany({ to_user: oldusername }, { to_user: nform.username });
    return updatedUser, updatedPayments;
}