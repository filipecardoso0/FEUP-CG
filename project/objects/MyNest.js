import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyHollowInsideHalfSphere } from "./3d/MyHollowInsideHalfSphere.js";
import { MyHollowOutsideHalfSphere } from "./3d/MyHollowOutsideHalfSphere.js"

export class MyNest extends CGFobject {
    constructor(scene, CGFtexture, x, y, z) {
        super(scene);
        this.texture = CGFtexture;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
        
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.x = x; 
        this.y = y; 
        this.z = z; 

        //Eggs inside the nest 
        this.birdeggs = []; 

        //Nest Radius
        this.radius = 15; 

        this.insidesphere = new MyHollowInsideHalfSphere(this.scene, 10 , 5, this.radius);
        this.outsidesphere = new MyHollowOutsideHalfSphere (this.scene, 10 , 5, this.radius);
    }

    updatePredefinedNestPositions(){
        for(let i=0; i<this.birdeggs.length; i++){
            if (i == 0){
                this.birdeggs[i].x = -47; 
                this.birdeggs[i].z = -35; 
            }
            else if (i == 1){
                this.birdeggs[i].x = -50;
                this.birdeggs[i].z = -30; 
            }
            else if (i == 2){
                this.birdeggs[i].x = -50; 
                this.birdeggs[i].z = -25; 
            }
            else{
                this.birdeggs[i].x = -45; 
                this.birdeggs[i].z = -25; 
            }
        }
    }


    displayNestEggs(){
        this.updatePredefinedNestPositions(); 
        
        for(let i=0; i<this.birdeggs.length; i++){
            this.birdeggs[i].display(); 
        }
    }


    display() {
        this.displayNestEggs(); 

        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(this.x, this.y+(this.insidesphere.radius), this.z); 
        this.outsidesphere.display();
        this.insidesphere.display();
        this.scene.popMatrix();
    }

    getX(){
        return this.x; 
    }

    getY(){
        return this.y; 
    }

    getZ(){
        return this.z; 
    }
}