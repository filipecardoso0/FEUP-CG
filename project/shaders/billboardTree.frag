#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float textureColorWeigth;

uniform sampler2D uSampler;


void main() {
	vec4 colorTexture1 = texture2D(uSampler, vTextureCoord);
	vec4 color = vec4(0.0,0.0,0.0,0.0);

	if(colorTexture1.a < 1.0) {
		discard;
	} else {
		color = colorTexture1;
	}

	gl_FragColor = color;
}
