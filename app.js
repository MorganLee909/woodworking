const express = require("express");

const app = express();
const views = `${__dirname}/views/`;

app.get("/garden-bed", (req, res)=>res.sendFile(`${views}/garden-bed/index.html`));

app.get("/garden-bed.js", (req, res)=>res.sendFile(`${views}/garden-bed/index.js`));

app.get("/three.js", (req, res)=>res.sendFile(`${__dirname}/threejs/three.min.js`));
app.get("/orbit-controls.js", (req, res)=>res.sendFile(`${__dirname}/threejs/orbitControls.min.js`));

app.get("/wood-material.jpg", (req, res)=>res.sendFile(`${views}/dark-wood.jpg`));

app.get("/objects/board.js", (req, res)=>res.sendFile(`${views}/objects/board.js`));

app.listen(8080);
