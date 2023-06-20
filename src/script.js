import * as THREE from "three"
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js"

// Time
let years = 0;
let hours = 0;
let days = 0;

setInterval(function(){
    years++;
document.querySelector('.year').innerText = years + " years passed";

}, 2000);

setInterval(function(){
    days += 365/20;
    document.querySelector('.day').innerText = Math.round(days) + " days passed";
    
}, 100)

setInterval(function(){
    hours += 8760/200;
    document.querySelector('.hour').innerText = Math.round(hours) + " hours passed";

}, 10)
   

// Scene 
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();


// Planètes data
const planets = [
    {
        name: 'sun',
        texture: 'sunSurfaceMaterial.jpg',
        size: 20,
        posX: 0
    },
    {
        name: 'mercury',
        texture: 'mercurySurfaceMaterial.jpg',
        size: 1,
        posX: 0
    },
    {
        name: 'venus',
        texture: 'venusSurfaceMaterial.jpg',
        size: 3,
        posX: 0
    },
    {
        name: 'earth',
        texture: 'earthSurfaceMaterial.jpg',
        size: 4,
        posX: 0
    },
    {
        name: 'mars',
        texture: 'marsSurfaceMaterial.png',
        size: 2,
        posX: 0
    },
    {
        name: 'jupiter',
        texture: 'jupiterSurfaceMaterial.jpg',
        size: 10,
        posX: 0
    },
    {
        name: 'saturn',
        texture: 'saturnSurfaceMaterial.jpg',
        size: 7,
        posX: 0,
        ring: {
            innerRadius: 10,
            outerRadius: 15,
            rotationX: 2.1,
            rotationY: -0.5
        }
    },
    {
        name: 'uranus',
        texture: 'uranusSurfaceMaterial.jpg',
        size: 6,
        posX: 0,
        ring: {
            innerRadius: 10,
            outerRadius: 11,
            rotationX: 1.1,
            rotationY: 0.5
        }
    },
    {
        name: 'neptune',
        texture: 'neptuneSurfaceMaterial.jpg',
        size: 5,
        posX: 0
    },
]


// Calcul position X des planètes
const distance = 20;

planets[1].posX = planets[0].size + planets[1].size*2 + distance;
planets[2].posX = planets[1].posX + planets[2].size*2 + distance;
planets[3].posX = planets[2].posX + planets[3].size*2 + distance;
planets[4].posX = planets[3].posX + planets[4].size*2 + distance;
planets[5].posX = planets[4].posX + planets[5].size + distance;
planets[6].posX = planets[5].posX + planets[6].size*2 + distance;
planets[7].posX = planets[6].posX + planets[7].size*2 + distance;
planets[8].posX = planets[7].posX + planets[8].size*2 + distance;
console.log(planets[8].posX);

// Création des planètes
const planetsMesh = {};

planets.forEach(item => {
    const planetTexture = loader.load('textures/' + item.texture ); 

    const planetGeometry =  new THREE.SphereGeometry(item.size, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial( { map: planetTexture } );
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(item.posX, 0, 0)

    scene.add(planet);

    planetsMesh[item.name] = planet;

    // Anneaux
    if(item.ring) {
        const ringGeometry = new THREE.RingGeometry( item.ring.innerRadius, item.ring.outerRadius, 32 );
        const ringMaterial = new THREE.MeshBasicMaterial( { 
            map: planetTexture,
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true
         } );
        const ring = new THREE.Mesh( ringGeometry, ringMaterial );
        ring.position.set(item.posX, 0, 0)
        ring.rotation.set(item.ring.rotationX, item.ring.rotationY, 0)
        scene.add( ring );
    }
});

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0, 0, 200)
scene.add(camera);

// Renderer 
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Animate
const animate = () => {

    let time = new Date() * 0.0001;
    
    planetsMesh["mercury"].position.x = Math.cos( time * 1.2 ) * 42;
    planetsMesh["mercury"].position.z = Math.sin( time * 1.2 ) * 42;

    planetsMesh["earth"].position.x = Math.cos( time * 1.2 ) * 96;
    planetsMesh["earth"].position.z = Math.sin( time * 1.2 ) * 96;

    // console.log(time)
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate()