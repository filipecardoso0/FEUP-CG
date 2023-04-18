import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../objects/MySphere.js';
import { MyFrustum } from '../objects/MyFrustum.js';
import { MyCone } from '../objects/MyCone.js';

export class MyBirdHead extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.beak = new MyCone(scene, 10, 10, [1,1,1]);
        this.neck = new MyFrustum(scene, 20, 10, 1);
        this.head = new MySphere(scene, 20, 10, [1,1,1]);
        this.eye_R = new MySphere(scene, 20, 10, [0.1,0.1,0.1]);
        this.eye_L = new MySphere(scene, 20, 10, [0.1,0.1,0.1]);
    }

    display() {
        //Neck
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4.3, 1,0,0);
        this.scene.scale(0.25, 0.25, 1);
        this.scene.translate(0,0,-1.3);
        this.neck.display();
        this.scene.popMatrix();

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0,0.8,-0.9);
        this.scene.scale(0.3,0.3,0.4);
        this.head.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.15,0.9,-1.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eye_R.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.15,0.9,-1.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eye_R.display();
        this.scene.popMatrix();

        //Beak  
        this.scene.pushMatrix();
        this.scene.translate(0,0.75,-1.25);
        this.scene.scale(0.07,0.05,0.3);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.beak.display();
        this.scene.popMatrix();
    }

}