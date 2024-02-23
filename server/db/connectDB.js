import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}`).then(()=>console.log("DB CONNECTED!!!"))
    } catch (error) {
        console.log("Database Connection Error : " , error.message);
    }
}

export {connectDB}