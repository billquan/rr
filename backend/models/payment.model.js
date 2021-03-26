const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        cost: { type: Number, required: true },
        payerId:{ type: String, required: true },
        orderId:{ type: String, unique: true, required: true },

    },
    {
        timestamps: true, // automatically creates fields for creation and modification time
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
