const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const enrolledMemberSchema = new Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username:{type: String, required: true},
        email:{type: String, required: true}
    }
)

const courseSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        facilitator: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        startTime: {type: Date, required: true },
        endTime:{ type: Date, required: true },
        repeatDay: [{type:String}],
        frequency: { type: String, required: true },
        location: {
            address1: {type: String},
            address2: {type: String},
            city: {type: String},
            state: {type: String},
            postCode: {type: String}
        },
        maxMembers: { type: Number, required: true },
        minMembers: { type: Number, required: true },
        cost: { type: Number, required: true },
        count: { type: Number, required: true, default:0},
        promoImage: {type: String, required: true},
        prerequisites: {type: String},
        additionalInformation: {type: String},
        category: {type: String, required: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        passed: {type: Boolean, default:false},
        enrolledMembers: [enrolledMemberSchema],
        business:{
            businessName:{type: String, required: true},
            ABN: { type: String, required: true},
            phone:{type: String, required: true},
            email:{type: String, required: true},
            address:{type: String},
            decriptionOfBusiness:{type: String, required: true},
            businessId:{type: mongoose.Schema.Types.ObjectId, ref: "Business"}
        }
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
