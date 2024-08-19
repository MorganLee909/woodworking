const express = require("express");
const compression = require("compression");

const app = express();
app.use(compression());
const views = `${__dirname}/views/`;

app.get("/", (req, res)=>res.sendFile(`${views}/index.html`));

app.get("/workbench", (req, res)=>res.sendFile(`${views}/workbench/index.html`));
app.get("/workbench.js", (req, res)=>res.sendFile(`${views}/workbench/workbench.js`));

app.get("/patio-table", (req, res)=>res.sendFile(`${views}/patioTable/patioTable.html`));
app.get("/patio-table.js", (req, res)=>res.sendFile(`${views}/patioTable/patioTable2.js`))

app.get("/three.js", (req, res)=>res.sendFile(`${__dirname}/threejs/three.min.js`));
app.get("/orbit-controls.js", (req, res)=>res.sendFile(`${__dirname}/threejs/orbitControls.min.js`));
app.get("/css-2d-renderer.js", (req, res)=>res.sendFile(`${__dirname}/threejs/CSS2DRenderer.min.js`));

app.get("/image/workbench.webp", (req, res)=>res.sendFile(`${views}/image/workbench.webp`));

app.get("/objects/board.js", (req, res)=>res.sendFile(`${views}/objects/board.js`));
app.get("/objects/setup.js", (req, res)=>res.sendFile(`${views}/objects/setup.js`));

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}
