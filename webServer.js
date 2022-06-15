 const express = require("express")
 const { config: DEconfig } = require("dotenv")

 DEconfig()

 let app = express()

 app.set("Content-Type", "text/html")

 app.get(
     '/:name',
     ({ query: {name} }, res) => {
         res.send(`Hello ${ name }`)
     }
 )
 app.listen(process.env.PORT, () => console.log("Server`s running"))