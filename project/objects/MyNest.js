import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyHollowInsideHalfSphere } from "./3d/MyHollowInsideHalfSphere.js";
import { MyHollowOutsideHalfSphere } from "./3d/MyHollowOutsideHalfSphere.js"

export class MyNest extends CGFobject {
    constructor(scene, CGFtexture) {
        super(scene);
        this.texture = CGFtexture;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
        
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.insidesphere = new MyHollowInsideHalfSphere(this.scene, 10 , 5, 5);
        this.outsidesphere = new MyHollowOutsideHalfSphere (this.scene, 10 , 5, 5);
    }

    display(x, y, z) {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(x, y+(this.insidesphere.radius), z); 
        this.outsidesphere.display();
        this.insidesphere.display();
        this.scene.popMatrix();

    }
}