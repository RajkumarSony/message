// express server
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const admin = require("firebase-admin");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {getAuth}= require("firebase-admin/auth")
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 5000;
const serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "client_email": process.env.client_email,
 "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url,
  "private_key":process.env.private_key.replace(/\\n/g, '\n')
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://any-time-message-default-rtdb.asia-southeast1.firebasedatabase.app",
});
app.use(express.json())

io.on("connection", (socket) => {
  const token=socket.handshake.headers.token;
  console.log("connected:",socket.id)
  socket.on("SendMesaage", (msg) => {
      getAuth()
      .verifyIdToken(token)
        .then((decodeToken)=>{
          console.log(decodeToken)
            
          
        })
    .catch((error) => {
        console.log("error")
    })

    console.log({ ...msg });
  });
  socket.emit("Sm",{message:"hello",socketId:socket.id})
  // console.log("connected");

  socket.on("disconnect", () => {
    console.log("Dissconect",socket.id)
    // console.log("user disconnected");
  });
});

app.post("/send", (req, res) => {
  const {message}=req.body
  // console.log(message)
  socket.emit("Sm",{message:message});
  res.send("dome")
  
})
app.use(express.static(path.join(__dirname, "/message-frontend/build")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/message-frontend/build", "index.html"));
});
httpServer.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port} !`);
});
