import { CGFscene, CGFcamera, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./objects/3d/MyTerrain.js";
import { MyPanoram } from "./objects/MyPanoram.js";
import { MyTreeGroupPatch } from "./objects/MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./objects/MyTreeRowPatch.js";
import { MyBird } from "./objects/3d/MyBird.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    this.fovFactor = 1.25;

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects

    this.bird = new MyBird(this, 1);
    this.speedFactor = 1;
    this.scaleFactor = 1;

    //Objects connected to MyInterface
    this.displayPanorama = true;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.texture2 = new CGFtexture(this, "images/heightmap_v2.jpg");
    this.texture3 = new CGFtexture(this, "images/altimetry.png");
    this.terrain = new MyTerrain(this, this.texture, this.texture2, this.texture3);

    this.texturePanorama = new CGFtexture(this, "images/panorama4.jpg");
    this.panoram = new MyPanoram(this, this.texturePanorama);

    this.textureBillboard1 = new CGFtexture(this, "images/billboardtree.png");
    this.textureBillboard2 = new CGFtexture(this, "images/billboardtree2.png");
    this.textureBillboard3 = new CGFtexture(this, "images/billboardtree3.png");

    this.windAngle = 0;
    this.windStrength = 0.01;
    this.isWind = true;

    // This is the expected use of the wind vector ***
    // this.windVector = [Math.cos(this.windAngle), 0, Math.sin(this.windAngle)];

    let treeGroupPatchCoordinates = [0,-87.5, 0];
    let treeRowPatchCoordinates = [60,-87.5, 0];
    this.treeSpacing = 20;

    this.treeGroupPatch = new MyTreeGroupPatch(this, this.textureBillboard1, this.textureBillboard2, this.textureBillboard3, treeGroupPatchCoordinates, this.treeSpacing, [this.windAngle, this.windStrength, this.isWind], this.texture2);
    this.treeRowPatch = new MyTreeRowPatch(this, this.textureBillboard1, this.textureBillboard2, this.textureBillboard3, treeRowPatchCoordinates, "z", this.treeSpacing, [this.windAngle, this.windStrength, this.isWind], this.texture2);

    this.rowPosX = 86;
    this.rowPosZ = -37;
    this.groupPosX = -76;
    this.groupPosZ = -46;

    // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.setUpdatePeriod(16);
  }
  initLights() {
    this.lights[0].setPosition(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(77, -16, 70),
      vec3.fromValues(77, -46, 10)
    );

  }
  setDefaultAppearance() {
    this.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  // called periodically (as per setUpdatePeriod() in init())
	update(t) {
    let ambientR = 1.0;
    let ambientG = 1.0;
    let ambientB = 1.0;

    let equation = 0.8*Math.sin(t/5000) + 1.0;

    if(equation > 1.0) {
        equation = 1.0;
    } else if (equation < 0.55) {
        equation = 0.55;
    } 

    // TODO add some logic to change the ambient light, for now this may suffice
    ambientR = equation;
    ambientG = equation;
    ambientB = equation;

    this.panoram.update(ambientR, ambientG, ambientB);
    this.terrain.update(ambientR);
    this.treeGroupPatch.update(t, ambientR, ambientG, ambientB);
    this.treeRowPatch.update(t, ambientR, ambientG, ambientB);

    this.checkKeys();
    this.bird.update(t, this.speedFactor);
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/

    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keysPressed = true;
    }
    if (keysPressed)
      console.log(text);
  } 
  display() {
    this.camera.fov = this.fovFactor;
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section

    this.panoram.updatePanoram(this.camera.position);

    if(this.displayPanorama)
      this.panoram.display();
    
    this.terrain.display();

    //this.treeGroupPatch.display(this.groupPosX, -87.5, this.groupPosZ, this.treeSpacing, [this.windAngle, this.windStrength, this.isWind]);
    this.treeRowPatch.display(this.rowPosX, -87.5, this.rowPosZ, this.treeSpacing, [this.windAngle, this.windStrength, this.isWind]);

    this.bird.display();
    
    this.setActiveShader(this.defaultShader);

    // ---- END Primitive drawing section
  }
}
