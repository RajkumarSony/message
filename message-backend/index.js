// express server
const path = require("path");
const express = require('express');
const app = express();


const port = 5000;
app.use(express.static(path.join(__dirname, "..", "/message-backend/public")));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "/message-backend/public", "index.html"));
});

app.listen(port, () => {
    console.log(`App listening on http://127.0.0.1:${port} !`)
  
});
