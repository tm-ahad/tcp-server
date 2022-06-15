const net = require("net")
const bcrypt = require("bcrypt")

const { config: DEconfig } = require("dotenv")
const coll = require("./schema");
const mod = require("./schema");
DEconfig()

let serve = net.createServer()
// noinspection JSVoidFunctionReturnValueUsed
let connectedClients = new mod({  })

serve.listen({
    host: "localhost",
    port: process.env.PORT
}, () => console.log(`Server listening at port 8080 ${serve.address()}`))

let connectionPromise = async () => {
    return serve.on("connection", (socket) => {
        let remoteAddress = `${socket.remotePort}:${socket.remoteAddress}`
        console.log(`client connected from ${remoteAddress}`)
        socket.write("Welcome to my server")
        connectedClients[remoteAddress] = socket

        socket.on("data", async data => {

            let dataOBJECT = JSON.parse(data.toString())
            let MD = {
                request: "data",
                requestype: dataOBJECT.requestype,
                data: dataOBJECT.d,
                id: dataOBJECT.__id,
                From: remoteAddress,
                To: dataOBJECT.To,
                password: bcrypt.hash(dataOBJECT.password, process.env.SALT, process.env.H_CB)
            }

            console.log(MD);

            if ( MD.requestype === "register" )
            {
                connectedClients.create({ id: MD.id, password: Md.password })
            } if ( MD.requestype === "send" )
            {
                let sendingString = JSON.stringify(MD.data) || MD.data.toString() || String(MD.data)
                await  connectedClients.findOne({ id: MD.id }).send(sendingString)

            } if ( MD.requestype === "delete" )
            {
                await connectedClients.deleteOne({ id: MD.id })
            }

        })
        socket.once("close", () => {
            console.log(`Connection closed at ${remoteAddress}`)
        })

        socket.on("error", ({ message }) => {
            console.log(`Connection error '${ message }' occurred at ${remoteAddress}`)
        })
    });
}


connectionPromise()
                .then(() => {
                    let date = new Date()
                    let time = `
                        ${date.getFullYear()}.
                        ${date.getMonth()}.
                        ${date.getDay()}.
                        ${date.getHours()}.
                        ${date.getMinutes()}.
                        ${date.getSeconds()}
                    `
                    console.log(`Client connected at ${time}`)
                })