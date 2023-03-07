import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
                  -0.5, -0.5, -0.5,	    //0
                  -0.5, -0.5, 0.5,	    //1
                  -0.5, 0.5, -0.5,	    //2
                  -0.5, 0.5, 0.5, 	    //3
                  0.5, -0.5, -0.5,	    //4
                  0.5, -0.5, 0.5,	    //5
                  0.5, 0.5, -0.5,       //6
                  0.5, 0.5, 0.5,        //7
                  -0.5, -0.5, -0.5,	    //8
                  -0.5, -0.5, 0.5,	    //9
                  -0.5, 0.5, -0.5,	    //10
                  -0.5, 0.5, 0.5, 	    //11
                  0.5, -0.5, -0.5,	    //12
                  0.5, -0.5, 0.5,	    //13
                  0.5, 0.5, -0.5,       //14
                  0.5, 0.5, 0.5,        //15
                  -0.5, -0.5, -0.5,	    //16
                  -0.5, -0.5, 0.5,	    //17
                  -0.5, 0.5, -0.5,	    //18
                  -0.5, 0.5, 0.5, 	    //19
                  0.5, -0.5, -0.5,	    //20
                  0.5, -0.5, 0.5,	    //21
                  0.5, 0.5, -0.5,       //22
                  0.5, 0.5, 0.5,        //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
                  6, 5, 4, // +X Side
                  6, 7, 5,

                  2, 0, 1, // -X Side
                  2, 1, 3,
                  
                  15, 9, 13,
                  15, 11, 9, // +Z Side

                  14, 12, 8,
                  14, 8, 10, // -Z Side

                  23, 22, 18,
                  23, 18, 19, // +Y Side

                  21, 16, 20,
                  21, 17, 16, // +Y Side
		];
        
        // Generating normals
        this.normals = [];
        for (var i = 0; i < 4; i++) {
            this.normals.push(-1, 0, 0);
        }
        for (var i = 0; i < 4; i++) {
            this.normals.push(1, 0, 0);
        }
       
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);

        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);
        
        this.normals.push(0, -1, 0);
        this.normals.push(0, -1, 0);
        this.normals.push(0, 1, 0);
        this.normals.push(0, 1, 0);

        this.normals.push(0, -1, 0);
        this.normals.push(0, -1, 0);
        this.normals.push(0, 1, 0);
        this.normals.push(0, 1, 0); 
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

