import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyBirdWing extends CGFobject{
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;
        this.initBuffers();

    }

    initBuffers() {
		this.vertices = [
			1, 1, 1,	    //0
			1, 1, 2.4,	    //1
			2, 1.5, 1.5,    //2
			2, 1.5, 2.5,    //3
            3 ,1.2, 3,      //4
            2, 1.5, 1.5,    //5
			2, 1.5, 2.5,    //6
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
            5, 6, 4,
            2, 1, 0,
            2, 3, 1,
            4, 6, 5,
		];

        this.normals = [
            -0.445, 0.89522, 0.0,
            -0.445, 0.89522, 0.0,
            -0.445, 0.89522, 0.0,
            -0.445, 0.89522, 0.0,
            0.28734, 0.95782, 0.0,
            0.28734, 0.95782, 0.0,
            0.28734, 0.95782, 0.0,
        ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

} 