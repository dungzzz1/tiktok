import mongoose from "mongoose";
import crypto from "crypto";
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwrod:{
        type:String,
    },
    img:{
        type:String,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribersUsers:{
        type:[String],
    },
    nameid:{
        type: String,
        unique: true,
    },
    nametd:{
        type: String,
        default: "chưa có tiêu đề",
    },
    fromGoogle:{
        type:Boolean,
        default:false
    },
},
{timestamps :true}
);
UserSchema.pre('save', function (next) {
    if (!this.isNew) {
      return next();
    }
    // Tạo giá trị nameid từ title, số tự nhiên duy nhất và kí tự đặc biệt
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const specialChar = crypto.randomBytes(1).toString('hex');
    this.nameid = this.name + specialChar + randomSuffix;
  
    next();
});
export default mongoose.model("User",UserSchema)