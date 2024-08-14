import * as three from "three";

class Board{
    constructor(scene, height, width, length){
        this.scene = scene;
        this.height = height;
        this.width = width;
        this.length = length;

        const geometry = new three.BoxGeometry(height, width, length);
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

    copyBoardData(board){
        board.position.x = this.board.position.x;
        board.position.y = this.board.position.y;
        board.position.z = this.board.position.z;

        board.rotation.x = this.board.rotation.x;
        board.rotation.y = this.board.rotation.y;
        board.rotation.z = this.board.rotation.z;
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

export class CheapBoard extends Board{
    constructor(scene, length){
        super(scene, 0.625, 5.5, length);
    }

    clone(){
        let newBoard = new CheapBoard(this.scene, this.length);
        this.copyBoardData(newBoard.board);
        return newBoard;
    }
}

export class TwoByFour extends Board{
    constructor(scene, length){
        super(scene, 2, 4, length);
    }

    clone(){
        let newBoard = new TwoByFour(this.scene, this.length);
        this.copyBoardData(newBoard.board);
        return newBoard;
    }
}

export class FourByFour extends Board{
    constructor(scene, length){
        super(scene, 4, 4, length);
    }

    clone(){
        let newBoard = new TwoByFour(this.scene, this.length);
        this.copyBoardData(newBoard.board);
        return newBoard;
    }
}
