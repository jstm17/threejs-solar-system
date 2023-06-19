import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Scene 
const scene = new THREE.Scene(); 

// Sphère 1
const loader = new THREE.TextureLoader();
const sphere1Texture = loader.load('textures/earthSurface.jpg' ); 

const sphere1Geometry = new THREE.SphereGeometry(1, 32, 32);
const sphere1Material = new THREE.MeshBasicMaterial( { map:sphere1Texture } );

const sphere1 = new THREE.Mesh(sphere1Geometry, sphere1Material);
scene.add(sphere1);

// Sphère 2
const sphere2Texture = loader.load('textures/moon.jpg' ); 

const sphere2Geometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphere2Material = new THREE.MeshBasicMaterial( { map:sphere2Texture } );

const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);

// Sizes
const sizes = {
    width: 800, 
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0, 0, 30)
scene.add( camera );

// Renderer 
const canvas = document.querySelector(".webgl"); 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize( sizes.width, sizes.height );

// Controls
const controls = new OrbitControls( camera, canvas ) 
controls.enableDamping = true

// Animate
const animate = () => {

    var time = Date.now() * 0.0001;
	sphere2.position.x = Math.sin( time * 10 ) * 5;
	sphere2.position.y = Math.cos( time * 10 ) * 5;

    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

animate()