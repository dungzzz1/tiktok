import mongoose from "mongoose";

const CommnetSchema = new mongoose.Schema({
   userId:{
        type: String,
        required:true,
    },
    videoId:{
        type: String,
        required:true,
    },
    desc:{
        type: String,
        required:true,
    },
},
{timestamps :true}
);

export default mongoose.model("Commnet",CommnetSchema)