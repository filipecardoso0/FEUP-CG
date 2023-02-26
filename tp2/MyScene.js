import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = false;
    this.displayParallelogram = false;
    this.displayDiamond = true;
    this.displayTriangleSmall = false;
    this.displayTriangleBig = false;
    this.scaleFactor = 1;
    this.diamond_Tx = -3;
    this.diamond_Ty = -1;
    this.diamond_Tz = 0;

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  setYellowAppearance(){
    this.setAmbient(0.6, 0.6, 0, 1.0);
    this.setDiffuse(0.6, 0.6, 0, 1.0);
    this.setSpecular(0.6, 0.6, 0, 1.0);
    this.setShininess(10.0);
  }
  setPinkAppearance(){
    this.setAmbient(1, 0.4, 0.4, 1.0);
    this.setDiffuse(1, 0.4, 0.4, 1.0);
    this.setSpecular(1, 0.4, 0.4, 1.0);
    this.setShininess(10.0);
  }
  setGreenAppearance(){
    this.setAmbient(0, 0.6, 0, 1.0);
    this.setDiffuse(0, 0.6, 0, 1.0);
    this.setSpecular(0, 0.6, 0, 1.0);
    this.setShininess(10.0);
  }
  setRedApearance(){
    this.setAmbient(0.8, 0.1, 0, 1.0);
    this.setDiffuse(0.8, 0.1, 0, 1.0);
    this.setSpecular(0.8, 0.1, 0, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // Default object Matrix scale values

    var default_scale = [
      this.scaleFactor, 0.0, 0.0, 0.0, 
      0.0, this.scaleFactor, 0.0, 0.0, 
      0.0, 0.0, this.scaleFactor, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix rotation values
    var angle = Math.PI/4.0;  

    var matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values

    //var T_x = -3.0;
    //var T_y = -1.0;
    //var T_z = 0.0;

    var matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      this.diamond_Tx, this.diamond_Ty, this.diamond_Tz, 1.0, 
    ];


    this.multMatrix(default_scale);
    this.multMatrix(matrix_rotate);
    this.multMatrix(matrix_translate);

    this.setGreenAppearance();
    if (this.displayDiamond) this.diamond.display();

    // ---- BEGIN Primitive drawing section
    /*
    this.setGreenAppearance();
    if (this.displayDiamond) this.diamond.display();

    this.setPinkAppearance();
    if (this.displayTriangle) this.triangle.display();
    
    this.setYellowAppearance();
    if (this.displayParallelogram) this.parallelogram.display();

    this.setRedApearance();
    if (this.displayTriangleSmall) this.triangleSmall.display();

    this.setDefaultAppearance();
    if (this.displayTriangleBig) this.triangleBig.display();
    */
    // ---- END Primitive drawing section
  }
}
