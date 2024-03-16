import {Schema , model} from "mongoose";


const messageSchema = new Schema({
    senderId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    receiverId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    message : {
        type : String,
        require : [true , "message can not be empty string"]
    }
},{timestamps:true})

const Message = model("Message",messageSchema)
export default Message