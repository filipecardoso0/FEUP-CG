import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Slider element in GUI
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');

        this.gui.add(this.scene, 'fovFactor', 0.5, 2).name("FOV");

        this.gui.add(this.scene, 'treeSpacing', 5, 30).name("Tree Spacing");
        this.gui.add(this.scene, 'rowPosX', -100, 100).name("TreeRow X");
        this.gui.add(this.scene, 'rowPosZ', -100, 100).name("TreeRow Z");
        this.gui.add(this.scene, 'groupPosX', -100, 100).name("TreeGroup X");
        this.gui.add(this.scene, 'groupPosZ', -100, 100).name("TreeGroup Z");

        this.gui.add(this.scene, 'windAngle', 0, 2*Math.PI).name("Wind Angle");
        this.gui.add(this.scene, 'windSpeed', 0, 0.5).name("Wind Speed");
        this.gui.add(this.scene, 'isWind').name("Wind");


        return true;
    }
}