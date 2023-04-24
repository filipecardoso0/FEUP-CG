import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyBirdWing extends CGFobject{
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.wingA = new MyBirdWingA(scene, 1);
        this.wingB = new MyBirdWingB(scene, 1);
    }

    update(t){
        
    }

    display() {
        this.scene.pushMatrix();
        this.wingA.display();
        this.wingB.display();
        this.scene.popMatrix();
	}

} 

export class MyBirdWingA extends CGFobject{
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
        ];  
        
        this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 1, 0,
            2, 3, 1,
        ];

        this.normals = [
            -0.445, 0.89522, 0.0,
            -0.445, 0.89522, 0.0,
            -0.445, 0.89522, 0.0,
            -0.445, 0.89522, 0.0,
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

export class MyBirdWingB extends CGFobject{
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            3 ,1.2, 3,      //4 0 
            2, 1.5, 1.5,    //5 1
			2, 1.5, 2.5,    //6 2
        ];  
        
        this.indices = [
            1, 2, 0,
            0, 2, 1,
        ];

        this.normals = [
            0.28734, 0.95782, 0.0,
            0.28734, 0.95782, 0.0,
            0.28734, 0.95782, 0.0,
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

