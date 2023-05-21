# Computer Graphics (L.EIC)
## Project 2022/2023

## Objectives

The aim of this project is to create a scene that combines the different elements explored in previous
classes. 

The scene, at the end of the project, contains a:
- A terrain with elevations, created by a shader;
- A forest, composed of trees using billboards;
- A bird, animated and controlled by the user, as well as its nest;
- A cluster of eggs scattered across the land.

The following points describe the main characteristics of the different intended elements. 
Some freedom is given as to their composition in the scene, so that we can create our own creative scene.

<br>

### **1. Sphere Creation**

We firstly started with creating a new 3D object, a sphere. This sphere, just like most of the objects we create throughout the project, are totally costumizable. We can change the number of stacks and the number of slices, to adjust both complexity and performance.

To try out the sphere in scene, we also applied a globe texture to it. We had to keep in mind that for this type of objects, the textures must be equirectangular, so that they can be applied correctly, without visible distortions.

<br>

### **2. Creation of Panoramas**

We then created a panorama, using the sphere we created before. Beforehand, we had to invert its faces, so that we can apply the texture inside the sphere. We applied a 360º image of a mountain, which was given to us at the creation of the project at the root of this repository.

It was applied a radius of 200 units to the sphere, which was the most desirable value for the FOV we were using, as well as the amount of slices and stacks, that are both 24.

![Panorama](screenshots/project-t05g05-1.png)


### **3. Inclusion of a Bird**

We then included a bird in the scene. We had to create a new shader for the bird, which was a simple shader that applied a texture to the bird, and also applied a specular light to it.

#### **3.1.  Bird modeling**

The bird was modeled manually, inside webgl. We used a simple bird model, with 5 main body parts: the head (with eyes and beak), the body, the tail, the left and the right wings. We also created a simple texture for the bird, which was applied to the bird in the shader.

#### **3.2.  Bird animation**

The bird was animated using a simple animation, which has a simple movement of the bird's wings up and down. 


#### **3.3.  Bird Control**

We also added the possibility to move forward/break, using the keys `W` and `S`, as well as turn sideways, with `A` and `D`. The speed of the animation is controlled by the `speedFactor` variable.

![Panorama](screenshots/project-t05g05-2.png)

### **4. Terrain**

We then created a terrain, using a shader. The terrain is composed of a plane, which is manipulated on the shader, using a heightmap. The heightmap is a texture that contains the height of each point of the grid, which is then used to create the distortion desired on the plane. The main texture of the terrain is mixed with the altimetry, whose value is obtained from the heightmap - this ranges from water, to grass, to rocks, as well as mountain peaks.

(Keep in mind the bird is scalled, to be visible on the pictures)

![Panorama](screenshots/project-t05g05-3.png)

![Panorama](screenshots/project-t05g05-3_b.png)

