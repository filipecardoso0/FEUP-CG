import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./objects/MyTerrain.js";
import { MyPanoram } from "./objects/MyPanoram.js";
import { MyBillboard } from "./objects/MyBillboard.js";

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
    this.axis = new CGFaxis(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.texture2 = new CGFtexture(this, "images/heightmap_v2.jpg");
    this.texture3 = new CGFtexture(this, "images/altimetry.png");
    this.terrain = new MyTerrain(this, this.texture, this.texture2, this.texture3);

    this.texturePanorama = new CGFtexture(this, "images/panorama4.jpg");
    this.panoram = new MyPanoram(this, this.texturePanorama);

    this.textureBillboard = new CGFtexture(this, "images/billboardtree.png");
    
    this.billboards = [
      new MyBillboard(this, this.textureBillboard),
      new MyBillboard(this, this.textureBillboard),
      new MyBillboard(this, this.textureBillboard),
    ];

    this.billboardPositions = [
      [0,-87.5,10],
      [20,-87.5,30],
      [-30,-87.5,15],
    ];

  }
  initLights() {
    this.lights[0].setPosition(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    /*this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    ); */

    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(0, -86, 60),
      vec3.fromValues(0, -86, 30)
    );

  }
  setDefaultAppearance() {
    this.setAmbient(1, 1, 1, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.panoram.display();
    
    this.terrain.display();

    for (let i = 0; i < this.billboards.length; i++) {
      let x = this.billboardPositions[i][0];
      let y = this.billboardPositions[i][1];
      let z = this.billboardPositions[i][2];

      this.billboards[i].display(x, y, z);
      break;
    }

    // ---- END Primitive drawing section
  }
}
