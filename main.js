import './style.css'

import * as THREE from 'three';
// import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

// Texture
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Torus Geometry
const torusTexture = new THREE.TextureLoader().load('donut.jpg');
const torus = new THREE.Mesh(  
  new THREE.TorusGeometry( 10, 3, 16, 100 ), 
  new THREE.MeshStandardMaterial( { map: torusTexture } ) 
);
scene.add( torus );

// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff) // soft white floodlight
scene.add(pointLight, ambientLight)

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

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