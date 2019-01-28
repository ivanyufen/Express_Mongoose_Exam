//DEFINE PACKAGE NEEDED
const express = require("express");
const app = express();
const routeDataCPU = require("./route/routeDataCPU"); //EXPRESS ROUTER DIPANGGIL


app.use(routeDataCPU); //EXPRESS ROUTER DIPAKAI


app.get("/", (req, res) => {
    res.send({ "status": "Server active" });
});


// RUN A SERVER ON PORT 4000
app.listen(4000, () => {
    console.log("Server running on port 4000!");
});