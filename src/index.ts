import express from 'express'
import { WebSocket, WebSocketServer } from 'ws';
const app=express();
const server=app.listen(process.env.PORT||8000)
const wss=new WebSocketServer({server})
wss.on('connection',(ws)=>{
    ws.on('error',err=>console.log(err.message))
    
    ws.on('message',(data ,isBinary)=>{
        wss.clients.forEach((client)=>{
            if(client.readyState==WebSocket.OPEN)client.send(data,{binary:isBinary});
        })
    })
})
