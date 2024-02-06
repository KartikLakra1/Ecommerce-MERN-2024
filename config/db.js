import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Successfully connected to DB : ${conn.connection.host}`.bgMagenta.white);

    } catch (error) {
        console.log(`Error in connection to DB : ${error}`.bgRed.white)
    }
}

export default connectToDb;