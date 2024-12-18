console.log( "Server is running....");
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from "./app";

dotenv.config();

mongoose
       .connect(process.env.MONGO_URL as string, {})
       .then((data) => {
        console.log("MongoDB Connection Succeed")
        const PORT = process.env.PORT ?? 3002;
        app.listen(PORT, function() {
          console.log(`The Server is Running Succesfully on: ${PORT}`)
        })
       })
       .catch((err)=> console.log('Error on MongoDB Connection', err))