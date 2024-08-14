import * as three from "three";
import Board from "Board";

export default class CheapBoard extends Board{
    constructor(scene, length){
        this.scene = scene;
        this.dimensions = [0.625, 5.5, length];

        const loader = new three.TextureLoader();
        const texture = loader.load("/wood-material.jpg", (t)=>{
            t.wrapS = t.wrapT = three.RepeatWrapping;
            t.offset.set(0, 0);
            t.repeat.set(length / 24, 3);
        });
        texture.colorSpace = three.SRGBColorSpace;

        const geometry = new three.BoxGeometry(0.625, 5.5, length);
        const edges = new three.EdgesGeometry(geometry);
        const lineMaterial = new three.LineBasicMaterial({color: 0xffffff});
        const line = new three.LineSegments(edges, lineMaterial);
        const material = new three.MeshBasicMaterial({map: texture});
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
        let toRadians = (n)=>n*(Math.PI/180);

        this.board.rotation.x += toRadians(x);
        this.board.rotation.y += toRadians(y);
        this.board.rotation.z += toRadians(z);
    }

    clone(){
        let newBoard = new CheapBoard(this.scene, this.dimensions[2]);
        this.copyBoardData(newBoard.board);

        return newBoard;
    }

    surfaceArea(){
        let w = this.dimensions[0];
        let l = this.dimensions[1];
        let h = this.dimentsions[2];
        return 2 * ((w * l) + (l * h) + (h * w));
    }
}
