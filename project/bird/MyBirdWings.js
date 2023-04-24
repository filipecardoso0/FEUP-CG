import { CGFobject } from '../../lib/CGF.js';
import { MyBirdWing } from './MyBirdWing.js';

export class MyBirdWings extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.wing_R = new MyBirdWing(scene, 1);
        this.wing_L = new MyBirdWing(scene, 1);
    }

    update(t){
        this.wing_R.update(t);
        this.wing_L.update(t);
    }

    display() {
        //Wings
        // this.wing_L.enableNormalViz();
        // this.wing_R.enableNormalViz();
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -0.8, -1);
        this.wing_R.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(-1,1,1);
        this.scene.translate(-0.8, -0.8, -1);
        this.wing_L.display();
        this.scene.popMatrix();
    }

}