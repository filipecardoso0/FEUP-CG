import {CGFobject, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyPlane} from './MyPlane.js'

export class MyBillboard extends CGFobject {
    constructor(scene, CGFtexture, windVector) {
        super(scene);
        this.texture = CGFtexture;
        this.windVector = windVector;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/billboardTree.vert", "shaders/billboardTree.frag");

        this.plane = new MyPlane(this.scene, 30);
    }
    followCamera(x, z) {
        let vector1 = vec2.fromValues(this.scene.camera.position[0] - x, this.scene.camera.position[2] - z);
        let vector2 = vec2.fromValues(0, 1);

        vec2.normalize(vector1, vector1);
        
        let angle = 0;

        if(vector1[0] < 0)
            angle = - Math.acos(vec2.dot(vector1, vector2));
        else 
            angle = Math.acos(vec2.dot(vector1, vector2));

        this.scene.rotate(angle,0.0,1.0,0.0);     
    }    
    display(x, y, z) {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.appearance.apply();

        this.scene.translate(x,y,z);

        this.scene.scale(20,25,25);

        this.followCamera(x, z);

        this.plane.display();

        this.scene.popMatrix();
    }

}