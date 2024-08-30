import space from './space.jpg'
import donut from './donut.jpg'
import earth from './earth.png'

import * as THREE from 'three';
// import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // field of view
  window.innerWidth/window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(0);

// Texture
// const spaceTexture = new THREE.TextureLoader().load(space);
// scene.background = spaceTexture;

// Torus Geometry
const torusTexture = new THREE.TextureLoader().load(donut);
const torus = new THREE.Mesh(  
  new THREE.TorusGeometry( 10, 3, 16, 100 ), 
  new THREE.MeshStandardMaterial( { map: torusTexture } ) 
);
scene.add( torus );

// Earth
const earthTexture = new THREE.TextureLoader().load(earth);
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial( { map: earthTexture } )
);
scene.add(earthSphere);

// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(100,50,5)
const ambientLight = new THREE.AmbientLight(0xffffff) // floodlight
scene.add(pointLight, ambientLight)


// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)

// Scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // get the top of the document
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// Animation
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y -= 0.01;
  torus.rotation.z += 0.05;

  earthSphere.rotation.y -= 0.01;
  earthSphere.rotation.z += 0.001;

  controls.update();

  renderer.render( scene, camera );
}

animate();