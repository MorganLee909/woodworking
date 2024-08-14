import * as three from "three";

export default class Board{
    constructor(scene, width, height, length){
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.length = length;
        this.type = `${width}x${height}`;

        const geometry = new three.BoxGeometry(width, height, length);
        const edges = new three.EdgesGeometry(geometry);
        const lineMaterial = new three.LineBasicMaterial({color: 0xffffff});
        const line = new three.LineSegments(edges, lineMaterial);
        const material = new three.MeshBasicMaterial({color: 0x7a4300});
        const board = new three.Mesh(geometry, material);

        this.board = new three.Group();
        this.board.add(board);
        this.board.add(line);

        scene.add(this.board);
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
}
