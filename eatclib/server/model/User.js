const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const user_schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter Valid Mail"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [6, "Please keep Strong Password"]
    },
    age: {
        type: Number,
        required: true,
    },
    marital_status: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        maxlength: [10, "Please Enter Valid Password"],
        default: "",
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    income: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        default: "",
    },
    habbits: [
        {type: String,}
    ],
    hobbies: [{type: String,}],
    createdOn: {
        type: Date,
        trim: true,
    },
    dob:{
        type:String,
        default:"",
        trim:true
    },
    bio:{
        type:String,
        default:"",
        trim:true
    },
    like:{
        type:Schema.Types.ObjectId,
        ref:"Like",
        default:null
    },
    match:{
        type:Schema.Types.ObjectId,
        ref:"Match",
        default:null
    },
    images: [
        {
            type:String
        }
    ],
});

user_schema.pre('save', async function (next) {
    const hash_password = await bcryptjs.hash(this.password, 8);
    this.password = hash_password;
    this.createdOn = new Date();
    next();
});

user_schema.pre(['updateOne', 'updateMany', 'findAndUpdate'], async function (next) {
    const update = this.getUpdate();

    delete this._id;

    next;
});

const User = model("User", user_schema);

module.exports = User;