# CG 2022/2023

## Group T05G05

## TP 3 Notes

### **Global Notes**

- ...

### **Exercise 1**

- In exercise 1 we didn't had much difficulties working around the materials to be applied in the unit cube. However, in the tangram we had some problems in the materials because we missed creating the normal vetors, after that it was pretty straight forward. 

![Screenshot 1 - MyUnitCube](./screenshots/cg-t05g05-tp3-1.png)
---
![Screenshot 1 - MyTangram](./screenshots/cg-t05g05-tp3-2.png)


### **Exercise 2**

- In exercise 2 there was some problems creating the indices list and setting up an order of vertices that would make it easier to create the cylinder...

![Screenshot 2 - MyPrism](./screenshots/cg-t05g05-tp3-3.png)

- As the normal vectors of a side of the prism are all equal in every point, then the color will be the same in every point of that side. So this is the same as calculating the color in one point and replicate it in all points, that is exactly the definition of constant shading.


### **Exercise 3**

- In exercise 3 we had basicaly the same problems in finding a way to reduce the number of vertices and simplifying its order to be easier create the indices list. 
- In the end, we just iterate through each edge of the cylinder and added the vertices to the list according to the order of iteration (from the base in xy plane to other one).

![Screenshot 1 - MyCylinder](./screenshots/cg-t05g05-tp3-4.png)
