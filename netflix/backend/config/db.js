import mongoose from "mongoose";

export async function connectToDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb Connected: ", conn.connection.host)
    } catch (error) {
        console.log("Error connecting to MongoDbB: ", error.message)
        process.exit(1);
    }
}