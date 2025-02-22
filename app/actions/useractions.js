"use server"
import Razorpay from "razorpay"
import User from "../models/User"
import Payment from "../models/Payment"
import connectDb from "../db/connectdb"

export const initiate = async (amount, username, Paymentform) => {
    await connectDb();
    let user = await User.findOne({ username: username }).lean();

    var instance = new Razorpay({ key_id: user.razorpayid ?? process.env.NEXT_PUBLIC_KEY_ID, key_secret: user.razorpaysecret ?? process.env.KEY_SECRET  })

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
    return JSON.parse(JSON.stringify(user));
}
export const fetchPayment = async (username) => {
    await connectDb();
    let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    // console.log(payment)
    return JSON.parse(JSON.stringify(payments));
}
export const updateProfile = async (oldusername, form) => {
    await connectDb();

    let nform = Object.fromEntries(form);

    let existingUser = await User.findOne({ email: nform.email });

    if (!existingUser) {
        return { error: "User not found" };
    }

    if (nform.username && nform.username !== oldusername) {
        let usernameExists = await User.findOne({ username: nform.username });

        if (usernameExists) {
            return { error: "Username already exists" };
        }
    }

    let updatedUser = await User.updateOne({ email: nform.email }, nform);

    if (nform.username && nform.username !== oldusername) {
        await Payment.updateMany({ to_user: oldusername }, { to_user: nform.username });
    }

    return JSON.parse(JSON.stringify(updatedUser));
};
