import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
//creating the renderer here
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//creating the camera here
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//creating scene here.
const scene = new THREE.Scene();

renderer.render(scene, camera);

//creating controls here
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

//now we are adding something to the scene. A shape. 
const geo = new THREE.IcosahedronGeometry(1.0, 2); //radius, detail
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    flatShading: true
    
}); //color and texture of shape

//MeshStandardMaterial lets us have the object interact with light. 
//MeshBasicMaterial does not interact with light.

const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh); //adding the shape to the scene

//adding wireframe geometry

const geoWire = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:true,

});

const meshWire = new THREE.Mesh(geo, geoWire);
meshWire.scale.setScalar(1.001); //making the wireframe slightly larger than the shape.
mesh.add(meshWire); //adding wireframe as child of mesh instead of child to whole scene. 

const hemiLight = new THREE.HemisphereLight(0x0098ff, 0xcc5200, 0.6);
scene.add(hemiLight);

// Animation loop
function animate(t = 0) {
    mesh.rotation.y = t * 0.0002;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); 

}

// Start the animation loop
animate();




