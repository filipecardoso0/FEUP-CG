import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	// 0
			2, 0, 0,	// 1
			1, 1, 0,	// 2
			3, 1, 0,	// 3

			0, 0, 0,	// 4
			2, 0, 0,	// 5
			1, 1, 0,	// 6
			3, 1, 0		// 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // front side
			0, 1, 2,
			3, 2, 1,
            // back side
            6, 5, 4,
			5, 6, 7
		];

		this.normals = [];

		for (var i = 0; i < 4; i++) 
			this.normals.push(0, 0, 1);
		for (var i = 0; i < 4; i++)
			this.normals.push(0, 0, -1);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

