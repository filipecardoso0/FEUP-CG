import {CGFobject, CGFappearance, CGFshader} from '../../lib/CGF.js';
import {MyPlane} from './2d/MyPlane.js'

export class MyTerrain extends CGFobject {
    constructor(scene, CGFtexture, CGFHeightMapTexture) {
        super(scene);
        this.texture = CGFtexture;
        this.textureHeigthMap = CGFHeightMapTexture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/texture3.vert", "shaders/texture3.frag");
        this.shader.setUniformsValues({ uSampler2: 1, normScale: 2.5 });

        this.plane = new MyPlane(this.scene, 30);
    }
    display() {
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();

        this.textureHeigthMap.bind(1);

        this.appearance.apply();
        this.scene.translate(0,-100,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display();
        this.scene.popMatrix();
    }
}