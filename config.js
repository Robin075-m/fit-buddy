const mongoose = require("mongoose")
const dbUrl = process.env.DATABASE_URL;
const connect = mongoose.connect(dbUrl)

connect.then(() => {
    console.log("Database connected! :)")
})
.catch(() => {
    console.log("Database not connected! :(")
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users", LoginSchema)

module.exports = collection;