import './style.css'

import space from './space.jpg'
import donut from './donut.jpg'
import starpng from './star.png'

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
const spaceTexture = new THREE.TextureLoader().load(space);
scene.background = spaceTexture;

// Torus Geometry
const torusTexture = new THREE.TextureLoader().load(donut);
const torus = new THREE.Mesh(  
  new THREE.TorusGeometry( 10, 3, 16, 100 ), 
  new THREE.MeshStandardMaterial( { map: torusTexture } ) 
);
scene.add( torus );

// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(100,50,5)
const ambientLight = new THREE.AmbientLight(0xffffff) // floodlight
scene.add(pointLight, ambientLight)

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper)

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)

// // Stars
function addStar() {
  const starTexture = new THREE.TextureLoader().load(starpng);
  const star = new THREE.Mesh( 
    new THREE.SphereGeometry(0.25, 24, 24), 
    new THREE.MeshStandardMaterial( {map: starTexture} ) 
  );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // get the top of the document
  // torus rotation
  

  // camera position
  // if( camera.position.z <= 0 ) {
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  // }
  // log the position of the camera
  // console.log(camera.position.x, camera.position.y, camera.position.z);
}

document.body.onscroll = moveCamera;

// Animation
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y -= 0.01;
  torus.rotation.z += 0.05;

  controls.update();

  renderer.render( scene, camera );
}

animate();