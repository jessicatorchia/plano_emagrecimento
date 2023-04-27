import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'


export async function createServer() {
    const site = express()                      
    site.use(bodyParser.json())    
    const port = 3000  

    

        
   



    const server = site.listen(port, () =>{
        console.log(`Example app listening on port ${port}`)
    })

    return { site, server }
}