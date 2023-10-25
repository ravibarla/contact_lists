import express from "express"
import path from "path"
import { db } from "./views/config/mongoose.js"
import { Contact } from "./views/config/contact.js"
const app = express()

const __dirname = path.resolve()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
const port = 3100
app.use(express.static("assets"))
app.use(express.urlencoded())

// var contactList = [
//     {
//         "name": "ravi",
//         "phone": 112233
//     },
//     {
//         "name": "akash",
//         "phone": 223344
//     }
// ]
app.get("/", (req, res) => {
    Contact.find({}).then(contacts => {
        return res.render("home", { title: "my contact lists", contact_lists: contacts })
    }).catch(err => console.log("Error in fetching contacts"))
})
app.get("/practice", (req, res) => {

    return res.render("practice", { title: "lets play with ejs" })
})
app.post("/create-contact", (req, res) => {
    // contactList.push(req.body)
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then(newContact => console.log("*******", newContact)).catch(err => console.log(err))

    return res.redirect("/")
})
app.get("/delete-contact/", (req, res) => {
    //get the id from the url

    let id = req.query.id
    //find the contact in the database  using id and delete
    Contact.findByIdAndDelete(id)
        .then(success => res.redirect("back"))
        .catch(err => { console.log("not able to delete from db"); return })

    // return res.redirect("back")
})
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("app is successfully running in port :", port)
})