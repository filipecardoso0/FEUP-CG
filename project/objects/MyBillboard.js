import {CGFobject, CGFappearance, CGFshader} from '../../lib/CGF.js';
import {MyPlane} from './2d/MyPlane.js'

export class MyBillboard extends CGFobject {
    constructor(scene, CGFtexture) {
        super(scene);
        this.texture = CGFtexture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/billboardTree.vert", "shaders/billboardTree.frag");

        this.plane = new MyPlane(this.scene, 30);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);

        this.appearance.apply();
        this.scene.translate(0,-50,10);
        this.scene.scale(20,25,25);
        this.scene.rotate(0,0,0,0);
        this.plane.display();

        this.scene.popMatrix();

    }

}