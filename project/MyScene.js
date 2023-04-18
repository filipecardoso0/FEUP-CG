import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./objects/3d/MyTerrain.js";
import { MyPanoram } from "./objects/MyPanoram.js";
import { MyTreeGroupPatch } from "./objects/MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./objects/MyTreeRowPatch.js";

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

    this.windVector = [1.0, 0.0, 0.0];

    let treeGroupPatchCoordinates = [0,-87.5, 0];
    let treeRowPatchCoordinates = [60,-87.5, 0];
    this.treeSpacing = 20;

    this.treeGroupPatch = new MyTreeGroupPatch(this, this.textureBillboard1, this.textureBillboard2, this.textureBillboard3, treeGroupPatchCoordinates, this.treeSpacing, this.windVector);
    this.treeRowPatch = new MyTreeRowPatch(this, this.textureBillboard1, this.textureBillboard2, this.textureBillboard3, treeRowPatchCoordinates, "z", this.treeSpacing, this.windVector);

    this.rowPosX = 86;
    this.rowPosZ = -37;
    this.groupPosX = -76;
    this.groupPosZ = -46;
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
      vec3.fromValues(0, -26, 90),
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

    if(this.displayPanorama)
      this.panoram.display();
    
    this.terrain.display();

    this.treeGroupPatch.display(this.groupPosX, -87.5, this.groupPosZ, this.treeSpacing);
    this.treeRowPatch.display(this.rowPosX, -87.5, this.rowPosZ, this.treeSpacing);

    // ---- END Primitive drawing section
  }
}
