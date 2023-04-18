import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from "./3d/MySphere.js";

export class MyPanoram extends CGFobject {
    constructor(scene, CGFtexture) {
        super(scene);
        this.texture = CGFtexture;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
        
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sphere = new MySphere(this.scene, 24 , 24, 200);
    }
    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}