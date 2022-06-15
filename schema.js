const { Schema, model } = require("mongoose")

let sChem = new Schema({
    id: String,
    password: String,
    confirmPassword: String
})

let mod = model("mod", sChem)

export default mod