import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyBirdBody } from './MyBirdBody.js';
import { MyBirdHead } from './MyBirdHead.js';
import { MyBirdTail } from './MyBirdTail.js';
import { MyBirdWings } from './MyBirdWings.js';

export class MyBird extends CGFobject {
    constructor(scene,  scale, birdeggs, birdnest) {
        super(scene);
        this.scale = scale;

        //Initialize Objects
        this.body = new MyBirdBody(scene, 1);
        this.head = new MyBirdHead(scene, 1);
        this.tail = new MyBirdTail(scene, 1);
        this.wings = new MyBirdWings(scene, 1);

        //Eggs
        this.birdeggs = birdeggs; 
        this.tolerance = 10; 
        this.transportegg = null; 

        //Nest 
        this.birdnest = birdnest; 

        //Initialize  Materials
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);

        this.angle = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        
        this.animVal = 0;

        //Bird Dive Variables
        this.state = null; 
        this.sequencestart = 0
        this.delay = 2
        this.groundlimit = 96; 
        this.boundlimit = 115; 

        //BirdFeet Offset
        this.birdfeetxoffset = -0; 
        this.birdfeetyoffset = -15; 
        this.birdfeetzoffset = 0; 
    }

    update(t, speed){
        console.log("Estado do passaro : " + this.state)
        
        this.animVal = 0.3 * Math.cos(t/1000 * Math.PI * this.speed * 5);
        this.wings.update(t, this.speed);

        this.x =  this.x + this.speed * Math.sin(this.angle);
        this.z = this.z + this.speed * Math.cos(this.angle);
        console.log(this.animVal);

        if (this.state === "dive"){
            this.dive(); 
            const currtime = Math.floor(Date.now()/1000)

            if(currtime-this.sequencestart <= this.delay/2){
                this.state = "dive"
            }
            else{
                this.state = "fly"
            }
        }

        if (this.state === "fly"){
            this.fly(); 
            const currtime = Math.floor(Date.now()/1000)

            if(currtime-this.sequencestart <= this.delay){
                this.state = "fly"
            }
            else{
                this.state = null; 
                this.sequencestart = 0; 
            }
        }
        
        if (this.scene.gui.isKeyPressed("KeyA")){
            this.turn(0.1);
        }
        if (this.scene.gui.isKeyPressed("KeyD")){
            this.turn(-0.1);
        }
        if (this.scene.gui.isKeyPressed("KeyW")){
            this.accelerate(-0.1);
        }
        if (this.scene.gui.isKeyPressed("KeyS")){
            this.accelerate(0.1);
        }
        if (this.scene.gui.isKeyPressed("KeyR")){
            this.reset();
        }
        if (this.scene.gui.isKeyPressed("KeyP")){ 
            this.state = "dive"; 
            this.sequencestart = Math.floor(t/1000); 
        }
        if (this.scene.gui.isKeyPressed("KeyO")){
            if(this.transportegg != null){
                this.state = "drop";
            }
        }
    }

    turn(v){
        this.angle += v;
    }

    accelerate(v){
        this.speed += v;
        if (this.speed > 0){
            this.speed = 0;
        }
    }
    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angle = 0;
        this.speed = 0;
    }

    boundCheck(){
        if(this.y >= -this.groundlimit && (this.z >= -this.boundlimit && this.z <= this.boundlimit) && (this.x <= this.boundlimit && this.x >= -this.boundlimit))
            return true; 
        else 
            return false; 
    }

    checkNearEgg(Egg){
        if((Egg.x >= this.x -this.tolerance && Egg.x <= this.x + this.tolerance) && (Egg.y >= this.y -this.tolerance && Egg.y <= this.y + this.tolerance) && (Egg.z >= this.z -this.tolerance && Egg.z <= this.z + this.tolerance) && this.state === "dive"){
            return true; 
        }
        else 
            return false; 
    }

    checkNearNest(){
        if((this.transportegg.x >= this.birdnest.x - this.birdnest.radius && this.transportegg.x <= this.birdnest.x + this.birdnest.radius) && (this.transportegg.z >= this.birdnest.z - this.birdnest.radius && this.transportegg.z <= this.birdnest.z + this.birdnest.radius) && this.state === "drop"){
            return true; 
        }
        else 
            return false; 
    }

    checkNestColision(){
        if((this.transportegg.y >= this.birdnest.y - this.birdnest.radius && this.transportegg.y <= this.birdnest.y + this.birdnest.radius) && this.state === "drop"){
            return true; 
        }

        return false; 
    }

    dive(){
        if(this.boundCheck()){
            this.y -= 2.65;
        }

        for(let i=0; i<this.birdeggs.length; i++){
            if(this.checkNearEgg(this.birdeggs[i]) && this.transportegg === null){
                this.transportegg = this.birdeggs[i];  
                this.birdeggs.splice(i, 1);    
                console.log(this.transportegg);        
            }
        }
    }


    fly(){
        this.y += 2.65; 
    }

    displayBirdEggs(){
        for(let i=0; i<this.birdeggs.length; i++){
            this.birdeggs[i].display(); 
        }
    }

    displayBirdFeetEgg(){
        if((this.transportegg != null && this.state != "drop") || (this.state === "drop" && !this.checkNearNest())){
            console.log("Nas patas"); 
            this.transportegg.setX(this.x + this.birdfeetxoffset); 
            this.transportegg.setY(this.y + this.birdfeetyoffset); 
            this.transportegg.setZ(this.z + this.birdfeetzoffset); 
            this.transportegg.display(); 
        }
    }

    displayEggDropping(){
        if (this.state === "drop"){
            if (this.checkNearNest() && !this.checkNestColision()){
                console.log("Esta perto do ninho")
                this.transportegg.setY(this.transportegg.y-1)
                this.transportegg.display(); 
            }

            if(this.checkNestColision()){
                this.state = null; 
                this.birdnest.birdeggs.push(this.transportegg); 
                this.transportegg = null; 
            }
        }
    }

    display() {
        //Display Bird Eggs
        this.displayBirdEggs(); 

        //Display Egg on The bird feet (if any)
        this.displayBirdFeetEgg();
        
        //Display Egg dropping while in the air 
        this.displayEggDropping(); 

        //Display Bird 
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(-this.x, -this.y, -this.z);
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(0, this.animVal, 0);
        //this.scene.scale(1,1,-1);
        this.body.display();
        this.head.display();
        this.tail.display();
        this.wings.display();
        this.scene.popMatrix();
    }

}