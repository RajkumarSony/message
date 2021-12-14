// express server
const path = require("path");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "/message-frontend/build")));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "/message-frontend/build", "index.html"));
});
io.on('connection',(socket)=>{
    socket.on("SendMesaage",(msg)=>{
         const {message}=msg
        console.log("Message: ",message)
    });
    console.log("connected")

    socket.on('disconnect', () => {
        console.log('user disconnected');})
})

httpServer.listen(port, () => {
    console.log(`App listening on http://127.0.0.1:${port} !`)
  
});
