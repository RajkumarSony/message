// express server
const path = require("path");
const express = require('express');
const app = express();
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = {};
const port = 5000;
app.use(express.static(path.join(__dirname, "..", "/message-backend/public")));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "/message-backend/public", "index.html"));
});
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
// console.log(results)
// console.log(nets)
app.listen(port, () => {
    console.log(`App listening on http://127.0.0.1:${port} !`)
    console.log(`App listening on http://${results["Local Area Connection* 4"][0]}:${port} !`)
});
