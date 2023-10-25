import mongoose from "mongoose"



mongoose.connect("mongodb://localhost/contact_list_db")

export const db = mongoose.connection

db.on("error", console.error.bind(console, "error connecting to db"))
db.once("open",()=>{
    console.log("successfully connected to db")
})