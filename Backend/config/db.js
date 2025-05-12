import mongoose from "mongoose";
export const connectDB = async () => {
await mongoose.connect('mongodb+srv://fooddelivery:30122378@cluster0.p6m6se0.mongodb.net/food-del').then(() =>console.log("DB connected")); 

}

//mongodb+srv://atlas-sample-dataset-load-67f2674ca5f73d5e43c11674:<db_password>@cluster0.x7u2txk.mongodb.net/food-del

