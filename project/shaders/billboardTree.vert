
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
// wind
uniform float windSpeed;
uniform float windAngle;
uniform float cameraAngle;
uniform bool isWind;

uniform float yPos;

uniform float sinusoidalWaveValue;


void main() {

	vTextureCoord = aTextureCoord;

	vec3 offset=vec3(0.0,0.0,0.0);

	if(isWind){
		offset.x = windSpeed * sin(windAngle - cameraAngle) * sinusoidalWaveValue;
		offset.z = windSpeed * cos(windAngle - cameraAngle) * sinusoidalWaveValue;

		offset *= (aVertexPosition.y + 0.5); 

		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + offset.x, aVertexPosition.y, aVertexPosition.z + offset.z, 1.0);
	} else {
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); 
	}
}

