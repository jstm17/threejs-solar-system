import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

function onMouseClick(event) {
    // Coordonnées de la souris dans l'espace de la fenêtre
    var mouseX = event.clientX;
    var mouseY = event.clientY;
  
    // Convertit les coordonnées de la souris en coordonnées normalisées dans l'espace du rendu
    var rect = renderer.domElement.getBoundingClientRect();
    var normalizedMouseX = (mouseX - rect.left) / rect.width * 2 - 1;
    var normalizedMouseY = -(mouseY - rect.top) / rect.height * 2 + 1;
  
    // Crée un vecteur de rayon à partir de la caméra
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(normalizedMouseX, normalizedMouseY), camera);
  
    // Recherche les objets cliqués
    var intersects = raycaster.intersectObjects(scene.children, true);
  
    if (intersects.length > 0) {
      // L'objet cliqué est intersects[0].object
      // Vous pouvez ajouter ici le code de traitement du clic sur la sphère
      console.log(intersects[0].object.name);
    }
  }
  
  // Ajoute le gestionnaire d'événements pour le clic de la souris
  window.addEventListener('click', onMouseClick, false);
  

// Scene 
const scene = new THREE.Scene(); 

// Sphère 1
const loader = new THREE.TextureLoader();
const sphere1Texture = loader.load('textures/earthSurface.jpg' ); 

const sphere1Geometry = new THREE.SphereGeometry(1, 32, 32);
const sphere1Material = new THREE.MeshBasicMaterial( { map:sphere1Texture } );

const sphere1 = new THREE.Mesh(sphere1Geometry, sphere1Material);
sphere1.name = 'Terre';
scene.add(sphere1);

// Sphère 2
const sphere2Texture = loader.load('textures/moon.jpg' ); 

const sphere2Geometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphere2Material = new THREE.MeshBasicMaterial( { map:sphere2Texture } );

const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
sphere2.name = 'Lune';
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