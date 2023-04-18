import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MyBillboard} from './2d/MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, CGFtexture, CGFtexture2, CGFtexture3, coordinates, spacing) {
        super(scene);
        this.spacing = 0;
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
        for (let i = 0; i < 9; i++) {
            this.billboards.push(new MyBillboard(this.scene, this.textures[i%3]));
        }
        this.coordinates = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ];
        this.setCoordinates(coordinates[0], coordinates[1], coordinates[2], spacing);
    }
    setCoordinates(startX, startY, startZ, spacing) {
        this.coordinates = [];
        this.spacing = spacing;

        for (let i = 0; i < 9; i++) {
            this.coordinates[i] =
            [
                startX + (i%3 - 1)*this.spacing,
                startY,
                startZ + Math.floor(i/3)*this.spacing,
            ];
        }
    }
    display(x, y, z, spacing) {
        this.setCoordinates(x, y, z, spacing);
        for (let i = 0; i < 9; i++) {
            this.billboards[i].display(this.coordinates[i][0], this.coordinates[i][1], this.coordinates[i][2]);
        }
    }
}