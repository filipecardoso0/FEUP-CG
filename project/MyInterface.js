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

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'fovFactor', 0.5, 2).name("FOV");

        this.gui.add(this.scene, 'treeSpacing', 5, 30).name("Tree Spacing");
        this.gui.add(this.scene, 'rowPosX', -100, 100).name("TreeRow X");
        this.gui.add(this.scene, 'rowPosY', -100, 100).name("TreeRow Y");
        this.gui.add(this.scene, 'rowPosZ', -100, 100).name("TreeRow Z");
        this.gui.add(this.scene, 'groupPosX', -100, 100).name("TreeGroup X");
        this.gui.add(this.scene, 'groupPosY', -100, 100).name("TreeGroup Y");
        this.gui.add(this.scene, 'groupPosZ', -100, 100).name("TreeGroup Z");


        return true;
    }
}