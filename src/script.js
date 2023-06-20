import * as THREE from "three"
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js"

// Time


let years = 0;
let hours = 0;
let days = 0;
let date = new Date();

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

// const planets = [
//     {
//         name: 'sun',
//         texture: 'sunSurfaceMaterial.jpg',
//         size: 20,
//         posX: 0
//     },
//     {
//         name: 'mercury',
//         texture: 'mercurySurfaceMaterial.jpg',
//         size: 2,
//         posX: 31
//     },
// ]

// planets.forEach(item => {
//     const planetTexture = loader.load('textures/' + item.texture ); 

//     const planetGeometry =  new THREE.SphereGeometry(item.size, 32, 32);
//     const planetMaterial = new THREE.MeshBasicMaterial( { map: planetTexture } );
//     const planet = new THREE.Mesh(planetGeometry, planetMaterial);
//     planet.position.set(item.posX,1,1)


//     scene.add(planet);
// });

// Calcul position X des planètes
const sunSize = 20;
const planetsSize = {
    mercury: 1,
    venus: 3,
    earth: 4,
    mars: 2,
    jupiter: 10,
    saturn: 7,
    uranus: 6,
    neptune: 5
};

const distance = 20;

const planetsPosX = (name) => {

    const mercuryPos = sunSize + planetsSize.mercury*2 + distance;
    const venusPos = mercuryPos + planetsSize.venus*2 + distance;
    const earthPos = venusPos + planetsSize.earth*2 + distance;
    const marsPos = earthPos + planetsSize.mars*2 + distance;
    const jupiterPos = marsPos + planetsSize.jupiter + distance;
    const saturnPos = jupiterPos + planetsSize.saturn*2 + distance;
    const uranusPos = saturnPos + planetsSize.uranus*2 + distance;
    const neptunePos = uranusPos + planetsSize.neptune*2 + distance;
    console.log(mercuryPos);
    console.log(earthPos);
    console.log(marsPos);
    console.log(jupiterPos);
    
    switch (name) {
        case 'mercury':
            return mercuryPos;
        case 'venus':
            return venusPos;
        case 'earth':
            return earthPos;
        case 'mars':
            return marsPos;
        case 'jupiter':
            return jupiterPos;
        case 'saturn':
            return saturnPos;
        case 'uranus':
            return uranusPos;
        case 'neptune':
            return neptunePos;
    }
}

// Sun
const sunTexture = loader.load('textures/sunSurfaceMaterial.jpg');

const sunGeometry = new THREE.SphereGeometry(sunSize, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Mercury
const mercuryTexture = loader.load('textures/mercurySurfaceMaterial.jpg');

const mercuryGeometry = new THREE.SphereGeometry(1, 32, 32);
const mercuryMaterial = new THREE.MeshBasicMaterial({
    map: mercuryTexture
});

const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(planetsPosX('mercury'), 0, 0)
scene.add(mercury);

// Ring
// const geometry = new THREE.RingGeometry( 42, 42.1, 32 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
// const mesh = new THREE.Mesh( geometry, material );
// mesh.rotation.set(1.5, 0, 0)
// scene.add( mesh );

// Venus
const venusTexture = loader.load('textures/venusSurfaceMaterial.jpg');

const venusGeometry = new THREE.SphereGeometry(3, 32, 32);
const venusMaterial = new THREE.MeshBasicMaterial({
    map: venusTexture
});

const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(planetsPosX('venus'), 0, 0)
scene.add(venus);

// Earth
const earthTexture = loader.load('textures/earthSurface.jpg');

const earthGeometry = new THREE.SphereGeometry(4, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(planetsPosX('earth'), 0, 0)
scene.add(earth);

// Mars
const marsTexture = loader.load('textures/marsSurfaceMaterial.png');

const marsGeometry = new THREE.SphereGeometry(2, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({
    map: marsTexture
});

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(planetsPosX('mars'), 0, 0)
scene.add(mars);

// Jupiter
const jupiterTexture = loader.load('textures/jupiterSurfaceMaterial.jpg');

const jupiterGeometry = new THREE.SphereGeometry(10, 32, 32);
const jupiterMaterial = new THREE.MeshBasicMaterial({
    map: jupiterTexture
});

const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.set(planetsPosX('jupiter'), 0, 0)
scene.add(jupiter);

// Saturn
const saturnTexture = loader.load('textures/saturnSurfaceMaterial.jpg');

const saturnGeometry = new THREE.SphereGeometry(7, 32, 32);
const saturnMaterial = new THREE.MeshBasicMaterial({
    map: saturnTexture
});

const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(planetsPosX('saturn'), 1, 1)
scene.add(saturn);

// Uranus
const uranusTexture = loader.load('textures/uranusSurfaceMaterial.jpg');

const uranusGeometry = new THREE.SphereGeometry(6, 32, 32);
const uranusMaterial = new THREE.MeshBasicMaterial({
    map: uranusTexture
});

const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.set(planetsPosX('uranus'), 0, 0)
scene.add(uranus);

// Neptune
const neptuneTexture = loader.load('textures/neptuneSurfaceMaterial.jpg');

const neptuneGeometry = new THREE.SphereGeometry(5, 32, 32);
const neptuneMaterial = new THREE.MeshBasicMaterial({
    map: neptuneTexture
});

const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.set(planetsPosX('neptune'), 0, 0)
scene.add(neptune);


const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

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

    var time = new Date() * 0.0001;
    mercury.position.x = Math.cos( time * 1 ) * 42;
    mercury.position.z = Math.sin( time * 1 ) * 42;

    earth.position.x = Math.cos( time * 1.2 ) * 96;
    earth.position.z = Math.sin( time * 1.2 ) * 96;

    // console.log(time)

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate()