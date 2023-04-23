import {CGFobject, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyPlane} from './MyPlane.js'

export class MyBillboard extends CGFobject {
    constructor(scene, CGFtexture, wind) {
        super(scene);
        this.texture = CGFtexture;
        this.wind = wind;
        this.heigth = 25;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/billboardTree.vert", "shaders/billboardTree.frag");
        this.shader.setUniformsValues({windAngle: this.wind[0], windSpeed: this.wind[1], isWind: this.wind[2]});

        this.plane = new MyPlane(this.scene, 30);

        // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.scene.setUpdatePeriod(33);
    }
    followCamera(x, y, z) {
        let vector1 = vec2.fromValues(this.scene.camera.position[0] - x, this.scene.camera.position[2] - z);
        let vector2 = vec2.fromValues(0, 1);

        vec2.normalize(vector1, vector1);
        
        let angle = 0;

        if(vector1[0] < 0)
            angle = - Math.acos(vec2.dot(vector1, vector2));
        else 
            angle = Math.acos(vec2.dot(vector1, vector2));

        this.scene.translate(x,y,z);

        this.scene.rotate(angle,0.0,1.0,0.0);     

        this.scene.scale(20, this.heigth,25);

        this.shader.setUniformsValues({ cameraAngle: angle });

        this.plane.display();

        this.scene.rotate(-angle,0.0,1.0,0.0);   
    } 
    // called periodically (as per setUpdatePeriod() in init())
	update(t) {
        // Dividing the time by 100 "slows down" the variation (i.e. in 100 ms timeFactor increases 1 unit).
        // Doing the modulus (%) by 100 makes the timeFactor loop between 0 and 99
        // ( so the loop period of timeFactor is 100 times 100 ms = 10s ; the actual animation loop depends on how timeFactor is used in the shader )
        this.shader.setUniformsValues({ sinusoidalWaveValue: Math.sin(2*Math.PI * (t / 2000)) });
	}
    
    makeItWind() {
        let someWind = vec3.fromValues(this.wind[1] * Math.cos(this.wind[0]), 0.0, this.wind[1] * Math.sin(this.wind[0]));

        //this.scene.rotate(someWind[0], 1.0, 0.0, 0.0);
    }
    display(x, y, z, wind) {
        this.wind = wind;
        this.shader.setUniformsValues({windAngle: this.wind[0], windSpeed: this.wind[1], isWind: this.wind[2], yPos: y - this.heigth});

        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.appearance.apply();

        this.followCamera(x, y, z);

        this.scene.popMatrix();
    }

}