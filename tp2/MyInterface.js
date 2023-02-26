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

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallel');
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display TSmall');
        this.gui.add(this.scene, 'displayTriangleBig').name('Display TBig');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        this.gui.add(this.scene, 'diamond_Tx', -10, 10).name('Diamond Tx');
        this.gui.add(this.scene, 'diamond_Ty', -10, 10).name('Diamond Ty');
        this.gui.add(this.scene, 'diamond_Tz', -10, 10).name('Diamond Tz');

        return true;
    }
}