const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        name:{type: String, required: true}, 
        phone:{type: String, required: true},
        email:{type: String, required: true},
        address:{type: String}
    }
)
const facilitatorSchema = new Schema(
    {
        name:{type: String, required: true},
        phone:{type: String, required: true},
        email:{type: String, required: true},
        workingWithChildren: {type: Boolean, default:false},
        experience: {type: String}
    }
)
const businessSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        businessStructure: {type: String, required: true},
        businessName: { type: String, required: true ,unique: true},
        ABN: { type: String,unique: true,sparse:true},
        TFN: { type: String,unique: true,sparse:true},
        registeredGST: {type: Boolean, default:false},
        professionalIndemnityInsurance: { type: String,unique: true,sparse:true},
        publicLiabilityInsurance:{type: String,unique: true,sparse:true},
        businessAddress: {
            address1: {type: String},
            address2: {type: String},
            city: {type: String},
            state: {type: String},
            postCode: {type: String}
        },
        phone: {type: String, required: true},
        website: {type: String, required: true},
        email: {type: String, required: true},
        logoImage: {type: String},
        decriptionOfBusiness: {type: String, required: true},
        styleOfCourse:{type: String},
        refereeContacts:[contactSchema],
        facilitators:[facilitatorSchema],
        courseHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ]

    },
    {
        timestamps: true, // automatically creates fields for creation and modification time
    }
);

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
