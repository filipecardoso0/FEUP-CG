import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyBirdBody } from './MyBirdBody.js';
import { MyBirdHead } from './MyBirdHead.js';
import { MyBirdTail } from './MyBirdTail.js';
import { MyBirdWings } from './MyBirdWings.js';

export class MyBird extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        //Initialize Objects
        this.body = new MyBirdBody(scene, 1);
        this.head = new MyBirdHead(scene, 1);
        this.tail = new MyBirdTail(scene, 1);
        this.wings = new MyBirdWings(scene, 1);

        //Initialize  Materials
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);

        this.speed = 1;
        this.animVal = 0;
    }

    update(t){
        //this.animVal = 0.5 * Math.sin(t/1000 * Math.PI * this.scene.birdSpeed);
        this.wings.update(t);
    }

    display() {
        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, this.animVal, 0);
        this.body.display();
        this.head.display();
        this.tail.display();
        this.wings.display();
        this.scene.popMatrix();
    }
}