const net = require("net")

const { config: DEconfig } = require("dotenv")
DEconfig()

let db = net.createConnection({
    port: process.env.PORT
})

db.on("data", data => {
    console.log(`Message received from server : ${data}`)
})
