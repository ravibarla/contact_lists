import express from "express"
import path from "path"
const app = express()
const __dirname = path.resolve()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
const port = 3100
var contactList = [
    {
        "name": "ravi",
        "phone": 112233
    },
    {
        "name": "akash",
        "phone": 223344
    }
]
app.get("/", (req, res) => {

    return res.render("home", { title: "my contact lists", contact_lists: contactList })
})
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("app is successfully running in port :", port)
})