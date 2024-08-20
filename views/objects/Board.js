import * as three from "three";
import {CSS2DObject} from "2dRenderer";

/*
 * angleData = [
 *      side ("width" or "height")
 *      angle in degrees
 *      bothSides (boolean)
 * ]
 */
export default class Board{
    constructor(scene, width, height, length, boardList, angleData){
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.length = length;
        this.type = `${width}x${height}`;
        this.board = new three.Group();

        const vertices = this.vertices(width/2, height/2, length/2, angleData);
        const faces = new Float32Array(this.faces(vertices));
        const geometry = new three.BufferGeometry();
        geometry.setDrawRange(0, Infinity);
        geometry.setAttribute("position", new three.BufferAttribute(faces, 3));
        const material = new three.MeshBasicMaterial({color: 0x7a4300});
        material.side = three.DoubleSide;
        this.drawEdges(vertices, this.edges(), this.board);
        this.createLabel();

        this.board.add(new three.Mesh(geometry, material));

        scene.add(this.board);
        boardList.push(this.board);
    }

    translate(x, y, z){
        this.board.position.x += x;
        this.board.position.y += y;
        this.board.position.z += z;
    }

    rotate(x, y, z){
        this.board.rotation.x += this.toRadians(x);
        this.board.rotation.y += this.toRadians(y);
        this.board.rotation.z += this.toRadians(z);
    }

    surfaceArea(){
        let w = this.width;
        let l = this.length;
        let h = this.height;
        return 2*((w*l)+(l*h)+(h*w));
    }

    toRadians(n){
        return n*(Math.PI/180);
    }

    createLabel(){
        const labelElem = document.createElement("div");
        labelElem.classList.add("label");
        labelElem.textContent = `${this.type}x${this.length} in.`;
        labelElem.style.backgroundColor = "transparent";

        const label = new CSS2DObject(labelElem);
        label.position.set(0, 0, 0);
        label.center.set(0, 1);
        label.layers.set(0);
        this.board.add(label);
        return label;
    }

    vertices(w, h, l, a){
        if(a && a.length === 3){
            if(a[0] === "width"){
                const shortened = (w * 2) / (Math.tan((a[1] * Math.PI) / 180));
                const l1 = l - shortened;
                const l2 = a[2] ? l - shortened : l;
                return [
                    [w, h, l1],
                    [w, -h, l1],
                    [-w, -h, l],
                    [-w, h, l],
                    [w, h, -l2],
                    [w, -h, -l2],
                    [-w, -h, -l],
                    [-w, h, -l],
                ];
            }else if(a[0] === "height"){
                const shortened = (h * 2) / (Math.tan((a[1] * Math.PI) / 180));
                const l1 = l - shortened;
                const l2 = l - a[2] ? l - shortened : l;
                return [
                    [w, h, l1],
                    [w, -h, l],
                    [-w, -h, l],
                    [-w, h, l1],
                    [w, h, -l2],
                    [w, -h, -l],
                    [-w, -h, -l],
                    [-w, h, -l2],
                ];
            }
        }

        return [
            [w, h, l1],
            [w, -h, l1],
            [-w, -h, l],
            [-w, h, l3],
            [w, h, -l2],
            [w, -h, -l2],
            [-w, -h, -l],
            [-w, h, -l3],
        ];
    }

    edges(){
        return [
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7],
            [0, 1],
            [3, 2],
            [4, 5],
            [7, 6],
            [0, 3],
            [1, 2],
            [4, 7],
            [5, 6]
        ];
    }

    faces(v){
            //Ends
        return v[0].concat(v[1]).concat(v[2])
            .concat(v[2]).concat(v[3]).concat(v[0])
            .concat(v[4]).concat(v[5]).concat(v[6])
            .concat(v[6]).concat(v[7]).concat(v[4])
            //Sides
            .concat(v[0]).concat(v[3]).concat(v[4])
            .concat(v[3]).concat(v[7]).concat(v[4])
            .concat(v[1]).concat(v[2]).concat(v[5])
            .concat(v[2]).concat(v[6]).concat(v[5])
            //Largest side
            .concat(v[0]).concat(v[1]).concat(v[5])
            .concat(v[0]).concat(v[4]).concat(v[5])
            .concat(v[2]).concat(v[3]).concat(v[7])
            .concat(v[2]).concat(v[6]).concat(v[7]);
    }

    drawEdges(v, e, b){
        for(let i = 0; i < e.length; i++){
            let coords = new Float32Array(v[e[i][0]].concat(v[e[i][1]]));
            const geometry = new three.BufferGeometry();
            geometry.setAttribute("position", new three.BufferAttribute(coords, 3));
            const wireframe = new three.WireframeGeometry(geometry);
            const line = new three.LineSegments(wireframe);
            line.material.depthTest = true;
            line.material.opacity = 0.5;
            line.material.transparent = true;
            b.add(line);
        }
        const geometry = new three.BufferGeometry();
        geometry.setAttribute("position", new three.BufferAttribute())
    }
}
