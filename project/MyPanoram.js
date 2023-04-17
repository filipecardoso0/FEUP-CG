import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from "./objects/3d/MySphere.js";

export class MyPanoram extends CGFobject {
    constructor(scene, CGFtexture) {
        super(scene);
        this.texture = CGFtexture;
        this.appearancePan = new CGFappearance(this.scene);
        this.appearancePan.setTexture(this.texture);
        this.appearancePan.setTextureWrap('REPEAT', 'REPEAT');

        this.sphere = new MySphere(this.scene, 24 , 24, 200);
    }
    display() {
        this.scene.pushMatrix();
        this.appearancePan.apply();
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.sphere.display();
        this.scene.popMatrix();
    }
}