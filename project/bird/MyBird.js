import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from '../objects/MyCylinder.js';
import { MySphere } from '../objects/MySphere.js';
import { MyCone } from '../objects/MyCone.js';
import { MyFrustum } from '../objects/MyFrustum.js';
import { MyPrism } from '../objects/MyPrism.js';
import { MyPlane } from '../objects/MyPlane.js';

export class BirdBody extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        //Initialize Objects
        this.body_frustum = new MyFrustum(scene, 20, 20, -0.4);
        this.body_sphere = new MySphere(scene, 20, 10, [1,1,1]);
        this.neck = new MyFrustum(scene, 20, 10, 1);
        this.head = new MySphere(scene, 20, 10, [1,1,1]);
        this.beak = new MyCone(scene, 10, 10, [1,1,1]);
        this.tail_sphere = new MySphere(scene, 20, 10, [1,1,1]);
        this.tail_prism = new MyFrustum(scene, 4, 10, 1.7);
        this.tail_plane = new MyPlane(scene,10)

        //Initialize  Materials
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);
    }

    display() {
        this.appearance.apply();

        //Body
        this.scene.pushMatrix();
        this.scene.scale(0.6,0.6,1.8);
        this.body_frustum.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.59,0.59,0.59);
        this.body_sphere.display();
        this.scene.popMatrix();

        //Neck
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4.3, 1,0,0);
        this.scene.scale(0.25, 0.25, 1)
        this.scene.translate(0,0,-1.3);
        this.neck.display();
        this.scene.popMatrix();

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0,0.8,-0.9);
        this.scene.scale(0.3,0.3,0.4);
        this.head.display();
        this.scene.popMatrix();

        //Beak  
        this.scene.pushMatrix();
        this.scene.translate(0,0.75,-1.25);
        this.scene.scale(0.07,0.05,0.3);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.beak.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.translate(0,0,1.7);
        this.scene.scale(0.365,0.365,0.365);
        this.tail_sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.1,1.9);
        this.scene.rotate(-Math.PI/6, 1,0,0);
        this.scene.scale(0.3,0.05,0.7);
        this.tail_prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.scene.rotate(-Math.PI/6, 1,0,0);
        this.scene.translate(0,0,2.9);
        this.scene.scale(4,4,4);
        this.scene.scale(0.3,0.05,0.7);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.tail_plane.display();
        this.scene.popMatrix();

    }
}