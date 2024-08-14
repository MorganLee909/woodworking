import * as three from "three";

export default class TwoByFour {
    constructor(scene, length){
        this.scene = scene;
        this.dimensions = [2, 4, length];

        const loader = new three.TextureLoader();
        const texture = loader.load("/wood-material.jpg", (t)=>{
            t.wrapS = t.wrapT = three.RepeatWrapping;
            t.offset.set(0, 0);
            t.repeat.set(length / 24, 3);
        });
        texture.colorSpace = three.SRGBColorSpace;

        const geometry = new three.BoxGeometry(2, 4, length);
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
        let newBoard = new TwoByFour(this.scene, this.dimensions[2]);

        newBoard.board.position.x = this.board.position.x;
        newBoard.board.position.y = this.board.position.y;
        newBoard.board.position.z = this.board.position.z;

        newBoard.board.rotation.x = this.board.rotation.x;
        newBoard.board.rotation.y = this.board.rotation.y;
        newBoard.board.rotation.z = this.board.rotation.z;

        return newBoard;
    }

    surfaceArea(){
        let w = this.dimensions[0];
        let l = this.dimensions[1];
        let h = this.dimentsions[2];
        return 2 * ((w * l) + (l * h) + (h * w));
    }
}
