import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyHollowOutsideHalfSphere } from "./3d/MyHollowOutsideHalfSphere.js";
import { MyHollowOutsideHalfSphereTop } from './3d/MyHollowOutsideHalfSphereTop.js';

export class MyBirdEgg extends CGFobject {
    constructor(scene, CGFtexture) {
        super(scene);
        this.texture = CGFtexture;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
        
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.topsphere = new MyHollowOutsideHalfSphereTop(this.scene, 10, 5, 5); 
        this.bottomsphere = new MyHollowOutsideHalfSphereTop(this.scene, 10, 5, 5);
    }

    display(x, y, z) {
        //Top Part of the Egg
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(x, y+this.topsphere.radius, z); 
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(1, 1.5, 1); 
        this.topsphere.display(); 
        this.scene.popMatrix();

        //Bottom Part of the Egg
        this.scene.pushMatrix(); 
        this.appearance.apply();
        this.scene.translate(x, y+this.topsphere.radius, z); 
        this.bottomsphere.display(); 
        this.scene.popMatrix(); 
    }
}