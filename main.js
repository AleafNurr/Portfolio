import './style.css'

import space from './space.jpg'
import donut from './donut.jpg'
import earth from './earth.png'
import mars from './mars.jpg'
import metal3 from './space-station.jpg'
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

// Earth
const earthTexture = new THREE.TextureLoader().load(earth);
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial( { map: earthTexture } )
);
scene.add(earthSphere);

// Mars
const marsTexture = new THREE.TextureLoader().load(mars);
const marsSphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 64, 64),
  new THREE.MeshStandardMaterial( { map: marsTexture } )
);
scene.add(marsSphere);
marsSphere.position.setX(-20);
marsSphere.position.setY(10);

// Octahedron
const octoTexture = new THREE.TextureLoader().load(metal3);
const octahedron = new THREE.Mesh(
  new THREE.OctahedronGeometry( 10 ),
  new THREE.MeshStandardMaterial( { map: octoTexture, side: THREE.DoubleSide } )
);
scene.add(octahedron);
octahedron.position.setY(-15);
octahedron.position.setX(25);

// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(100,50,5)
const ambientLight = new THREE.AmbientLight(0xffffff) // floodlight
scene.add(pointLight, ambientLight)


// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)

// // Stars
// function addStar() {
//   const starTexture = new THREE.TextureLoader().load(starpng);
//   const star = new THREE.Mesh( 
//     new THREE.SphereGeometry(0.1, 24, 24), 
//     new THREE.MeshStandardMaterial( {map: starTexture} ) 
//   );

//   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(200).fill().forEach(addStar);

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

  marsSphere.rotation.y -= 0.01;
  marsSphere.rotation.z += 0.005;

  octahedron.rotation.x -= 0.01;
  octahedron.rotation.y += 0.01;
  octahedron.rotation.z -= 0.05;

  controls.update();

  renderer.render( scene, camera );
}

animate();