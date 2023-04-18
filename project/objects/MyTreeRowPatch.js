import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MyBillboard} from './2d/MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
    constructor(scene, CGFtexture, CGFtexture2, CGFtexture3, coordinates, spacingXorZ, spacing) {
        super(scene);
        this.spacingX = 0;
        this.spacingZ = 0;
        this.spacingXorZ = spacingXorZ;

        this.textures = [
            CGFtexture,
            CGFtexture2,
            CGFtexture3,
        ]

        this.appearances = [];
        for (let i = 0; i < 3; i++) {
            this.appearances.push(new CGFappearance(this.scene));
            this.appearances[i].setTexture(this.textures[i]);
            this.appearances[i].setTextureWrap('REPEAT', 'REPEAT');
        }

        this.billboards = [];
        for (let i = 0; i < 6; i++) {
            this.billboards.push(new MyBillboard(this.scene, this.textures[i%3]));
        }

        this.coordinates = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ];
        this.setCoordinates(coordinates[0], coordinates[1], coordinates[2]);
    }
    setCoordinates(startX, startY, startZ, spacing) {

        if(this.spacingXorZ == "x") { // spacingXorZ = "x" or "z"
            this.spacingX = spacing;
            console.log('x');
        } else  {
            this.spacingZ = spacing;
            console.log('z');
        }

        for (let i = 0; i < 6; i++) {
            this.coordinates[i] =
            [
                startX + i*this.spacingX,
                startY,
                startZ + i*this.spacingZ,
            ];
        }
    }
    display(x, y, z, spacing) {
        this.setCoordinates(x, y, z, spacing);

        for (let i = 0; i < 6; i++) {
            this.billboards[i].display(this.coordinates[i][0], this.coordinates[i][1], this.coordinates[i][2]);
        }
    }
}