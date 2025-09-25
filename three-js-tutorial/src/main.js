import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 25;
camera.position.x = 8;

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Object
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6374 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

// Lights
const pointLight = new THREE.PointLight(0xffffff, 450, 100);
pointLight.position.set(15,15,15);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

// Rotate torus
function animate() {

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

