const express = require("express");
const compression = require("compression");

const app = express();
app.use(compression());
const views = `${__dirname}/views/`;

app.get("/workbench", (req, res)=>res.sendFile(`${views}/workbench/index.html`));

app.get("/workbench.js", (req, res)=>res.sendFile(`${views}/workbench/index.js`));

app.get("/three.js", (req, res)=>res.sendFile(`${__dirname}/threejs/three.min.js`));
app.get("/orbit-controls.js", (req, res)=>res.sendFile(`${__dirname}/threejs/orbitControls.min.js`));

app.get("/wood-material.jpg", (req, res)=>res.sendFile(`${views}/dark-wood.jpg`));

app.get("/objects/board.js", (req, res)=>res.sendFile(`${views}/objects/board.js`));

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}
