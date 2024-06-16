import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
   userId:{
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    desc: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: false,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    views:{
        type: Number,
        default:0,
    },
},
{timestamps :true}
);

export default mongoose.model("Live",LiveSchema)