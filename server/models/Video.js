import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
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
    description: {
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
    tags:{
        type: [String],
        default:[]
    },
    likes:{
        type: [String],
        default:[]
    },
    favourite:{
        type: [String],
        default:[]
    },
    link: {
        type: String,
        required: false,
    },
    shares:{
        type: [String],
        default:[],
    }
},
{timestamps :true}
);

export default mongoose.model("Video",VideoSchema)