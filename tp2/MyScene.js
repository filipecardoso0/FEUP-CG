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
    this.redTriangle = new MyTriangleSmall(this);
    this.purpleTriangle = new MyTriangleSmall(this);
    this.pinkTriangle = new MyTriangle(this);
    this.orangeTriangle = new MyTriangleBig(this);
    this.blueTriangle = new MyTriangleBig(this);
    this.yellowParallelogram = new MyParallelogram(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.diamond_Tx = -3;
    this.diamond_Ty = 1.5;
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
  setOrangeAppearance(){
    this.setAmbient(0.8, 0.5, 0, 1.0);
    this.setDiffuse(0.8, 0.5, 0, 1.0);
    this.setSpecular(0.8, 0.5, 0, 1.0);
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
  setPurpleApearance(){
    this.setAmbient(0.8, 0.1, 0.5, 1.0);
    this.setDiffuse(0.8, 0.1, 0.5, 1.0);
    this.setSpecular(0.8, 0.1, 0.5, 1.0);
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

    this.multMatrix(default_scale);
    this.pushMatrix();

    ///// Diamond 

    // Matrix rotation values
    var angle = Math.PI/4.0;  

    var matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    var T_x = -3.0;
    var T_y = 1.5;
    var T_z = 0.0;

    var matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    this.setGreenAppearance();
    this.diamond.display();

    ////////

    this.popMatrix();
    this.pushMatrix();

    ///// Red Triangle

    // Matrix rotation values
    angle = 3*Math.PI/4.0;  

    matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    T_x = -4.4;
    T_y = 1.5;
    T_z = 0.0;

    matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    this.setRedApearance();
    this.redTriangle.display();

    ////////

    this.popMatrix();
    this.pushMatrix();

    ///// Purple Triangle
    
    // Matrix rotation values
    var angle = Math.PI;  

    var matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    T_x = -4.7;
    T_y = 2.2;
    T_z = 0.0;

    matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    this.setPurpleApearance();
    this.purpleTriangle.display();

    ////////

    this.popMatrix();
    this.pushMatrix();

    ///// Pink Triangle
    
    // Matrix rotation values
    angle = 0.0;  

    matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    T_x = -1.3;
    T_y = 1.2;
    T_z = 0.0;

    matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    this.setPinkAppearance();
    this.pinkTriangle.display();

    ////////

    this.popMatrix();
    this.pushMatrix();

    ///// Pink Triangle
    
    // Matrix rotation values
    angle = Math.PI;  

    matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    T_x = -0.3;
    T_y = 0.2;
    T_z = 0.0;

    matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    this.setOrangeAppearance();
    this.orangeTriangle.display();

    ////////
    
    this.popMatrix();
    this.pushMatrix();

    ///// Pink Triangle
    
    // Matrix rotation values
    angle = 0.0;  

    matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    T_x = 2.0;
    T_y = 0.2;
    T_z = 0.0;

    matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    this.setDefaultAppearance();
    this.blueTriangle.display();

    ////////
    
    this.popMatrix();
    this.pushMatrix();

    ///// Yellow Parallelogram
    
    // Matrix rotation values
    angle = Math.PI;  

    matrix_rotate = [
      Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
      Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    // Matrix translation values
    T_x = 5.0;
    T_y = -0.8;
    T_z = 0.0;

    matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);
    this.multMatrix(matrix_rotate);

    var matrix_reflect = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, -1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    this.multMatrix(matrix_reflect);

    this.setYellowAppearance();
    this.yellowParallelogram.display();

    ////////
  }
}
