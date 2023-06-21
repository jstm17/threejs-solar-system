import * as THREE from "three"
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";

// Time / Pause

const pauseBtn = document.querySelector('.pause-btn');

pauseBtn.addEventListener('click', function() {
    pauseBtn.classList.toggle('stop');

    if (pauseBtn.classList.contains('stop')) {
        pauseBtn.innerHTML = "Resume";
      } else {
        pauseBtn.innerHTML = "Stop";
      }
})

let years = 0;

setInterval(function(){

    if(!pauseBtn.classList.contains('stop')){
        years++;
    } 
document.querySelector('.year').innerText = years + " years passed";

}, 5000);   

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
        posX: 0,
        satellite: {
            name: 'lune',
            texture: 'moon.jpg',
            size: 1,
            posX: 0
        }
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

// Création des planètes
const planetsMesh = {};
const ringsMesh = {};
const clickableObjects = [];

planets.forEach(item => {

    const planetTexture = loader.load('textures/' + item.texture ); 
    const planetGeometry =  new THREE.SphereGeometry(item.size, 32, 32);
    let planetMaterial = new THREE.MeshLambertMaterial( { map: planetTexture } );

    if(item.name == "sun"){
        planetMaterial = new THREE.MeshBasicMaterial( { map: planetTexture } );
    }

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(item.posX, 0, 0);
    planet.name = item.name;
    clickableObjects.push(planet);
    scene.add(planet);

    planetsMesh[item.name] = planet;

    // Anneaux
    if(item.ring) {
        const ringGeometry = new THREE.RingGeometry( item.ring.innerRadius, item.ring.outerRadius, 32 );
        const ringMaterial = new THREE.MeshLambertMaterial( { 
            map: planetTexture,
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
         } );
        const ring = new THREE.Mesh( ringGeometry, ringMaterial );
        ring.position.set(item.posX, 0, 0)
        ring.rotation.set(item.ring.rotationX, item.ring.rotationY, 0)
        scene.add( ring );

        ringsMesh[item.name] = ring;
    }

    // Lune
    if(item.satellite) {
        const satelliteTexture = loader.load('textures/' + item.satellite.texture ); 

        const satelliteGeometry =  new THREE.SphereGeometry(item.satellite.size, 32, 32);
        const satelliteMaterial = new THREE.MeshLambertMaterial( { map: satelliteTexture } );
        const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
        satellite.position.set(item.posX + 9, 0, 0)

        scene.add(satellite);

        planetsMesh[item.satellite.name] = satellite;
    }

    // Trajectoires
        const pathGeometry = new THREE.RingGeometry( item.posX, item.posX + 0.1, 64 );
        const pathMaterial = new THREE.MeshBasicMaterial( { 
            color: 0xffffff,
            side: THREE.DoubleSide
         } );
        const path = new THREE.Mesh( pathGeometry, pathMaterial );
        path.rotation.set(Math.PI / 2, 0, 0)
        scene.add( path );


});

// Lumière
const pointLight = new THREE.PointLight( 0xFFEFAD, 5, 500, 3 );
pointLight.position.set( 5, 5, 5 );
scene.add( pointLight );
// const helper = new THREE.PointLightHelper( pointLight, 50 );
// scene.add( helper );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
scene.add( ambientLight );

// Lumière du soleil
const sunLightTexture = new THREE.TextureLoader().load( 'textures/glow.png');
const sunLightMaterial = new THREE.SpriteMaterial( { map: sunLightTexture, color: 0xFFEFAD, opacity: 0.5 } );

const sprite = new THREE.Sprite( sunLightMaterial );
sprite.scale.set(300, 300)
scene.add( sprite );

const sunLightMaterial2 = new THREE.SpriteMaterial( { map: sunLightTexture, color: 0xF89C08} );

const sprite2 = new THREE.Sprite( sunLightMaterial2 );
sprite2.scale.set(100, 100)
scene.add( sprite2 );

// Stars
const starTexture = new THREE.TextureLoader().load( 'textures/glow.png');
const starsNb = 6000;
const starsMesh = [];

for(let i=0; i < starsNb; i++){
    const starMaterial = new THREE.SpriteMaterial( { map: starTexture, color: 0xffffff} );

    const star = new THREE.Sprite( starMaterial );
    const starScale = Math.random()*1 - 1;
    star.scale.set(starScale, starScale)
    star.position.set(Math.random()*1000 - 500 , Math.random()*1000 - 500 ,  Math.random()*1000 - 500);
    scene.add( star );

    // starsMesh.push(star);
    starsMesh.push({
        'mesh': star,
        'posX': star.position.x,
        'posY': star.position.y,
        'posZ': star.position.z
    })

}

// console.log(starsMesh[0].mesh)

// const starMaterial = new THREE.SpriteMaterial( { map: starTexture, color: 0xffffff} );

//     const star = new THREE.Sprite( starMaterial );
//     star.scale.set(200, 200)
//     star.position.set(100, 100, 0);
//     scene.add( star );



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0, 300, 500);
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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Eventlistener (onClick)
canvas.addEventListener('click', onClick);

function onClick(event) {
    // Convertir les coordonnées de la souris en coordonnées normalisés ( de -1 à 1 sur les axes X et Y)
    const rect = canvas.getBoundingClientRect();
    // getBoundingClientRect : nous donne la position et la taille du canvas par rapport à la fenêtre du navigateur.
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    // Calcul de la différence entre les coordonnées de la souris et les coordonnées du coin supérieur gauche du canvas
    // (event.clientX - rect.left pour l'axe x et event.clientY - rect.top pour l'axe y). 
    // Cela nous donne les coordonnées de la souris relatives au coin supérieur gauche du canvas.
    // On les normalise en les divisant par la largeur et la hauteur du canvas 
    mouse.x = x;
    mouse.y = y;

    // Mise a jour du rayon de sélection à partir de la camera
    raycaster.setFromCamera(mouse, camera);

    // Calcul de l'intersection avec les obj ( cube, sphere, cone)
    const intersects = raycaster.intersectObjects(clickableObjects, true);

    if (intersects.length > 0) {
        // Au click
        const object = intersects[0].object;

        console.log(object.name);

        var aabb = new THREE.Box3().setFromObject(object);
        var center = aabb.getCenter(new THREE.Vector3());
        var size = aabb.getSize(new THREE.Vector3());

        // Calcul du centre de la forme de l'objet
        object.geometry.computeBoundingBox();
        var boundingBox = object.geometry.boundingBox;
        var objectCenter = new THREE.Vector3();
        boundingBox.getCenter(objectCenter);

        var startPosition = camera.position.clone();
        var targetPosition = new THREE.Vector3(center.x + center.x, center.y + center.y , center.z + size.z);

        var duration = 1; // Durée de l'animation en secondes
        var startTime = Date.now(); // Temps de début de l'animation

        // Désactiver OrbitControls pendant l'animation

        function animateCamera() {
        var currentTime = Date.now();
        var elapsed = (currentTime - startTime) / 1000; // Temps écoulé en secondes

        console.log(objectCenter);
        if (elapsed > duration) {
            // Animation terminée
            camera.position.copy(targetPosition);
            controls.target.set(targetPosition);
            // Réactiver OrbitControls après l'animation
            // controls.enabled = true;
        } else {
            // Animation en cours
            var t = elapsed / duration; // Facteur de progression entre 0 et 1
            camera.position.lerpVectors(startPosition, targetPosition, t);
            controls.target.set(targetPosition);
            requestAnimationFrame(animateCamera);
        }
        }

        animateCamera();

        
        
        
        
        // if (!canvas.classList.contains("zoom")) {

            // canvas.classList.add("zoom");
        // }


    }
}


// let counter = 0;
// setInterval(function(){
//     counter += 0.01;

// }, 1)


// Animate
const animate = () => {

    // Rotation planète + anneaux autour du soleil   
    let time = 0;

    // Stop rotation qd click sur stop
    if(!pauseBtn.classList.contains('stop')){
        time = new Date() * 0.0001;
    } else {
        time = time
    }

    planetsMesh["mercury"].position.x = Math.cos( time * 77.4 ) * planets[1].posX;
    planetsMesh["mercury"].position.z = Math.sin( time * 77.4 ) * planets[1].posX;

    planetsMesh["venus"].position.x = Math.cos( time * 38.7 ) * planets[2].posX;
    planetsMesh["venus"].position.z = Math.sin( time * 38.7 ) * planets[2].posX;

    planetsMesh["earth"].position.x = Math.cos( time * 12.9 ) * planets[3].posX;
    planetsMesh["earth"].position.z = Math.sin( time * 12.9 ) * planets[3].posX;
    planetsMesh["lune"].position.x = Math.cos( time * 12.9 ) * planets[3].posX + 5;
    planetsMesh["lune"].position.z = Math.sin( time * 12.9 ) * planets[3].posX + 5;

    planetsMesh["mars"].position.x = Math.cos( time * 7.74 ) * planets[4].posX;
    planetsMesh["mars"].position.z = Math.sin( time * 7.74 ) * planets[4].posX;

    planetsMesh["jupiter"].position.x = Math.cos( time * 4.128 ) * planets[5].posX;
    planetsMesh["jupiter"].position.z = Math.sin( time * 4.128 ) * planets[5].posX;

    planetsMesh["saturn"].position.x = Math.cos( time * 0.645 ) * planets[6].posX;
    planetsMesh["saturn"].position.z = Math.sin( time * 0.645 ) * planets[6].posX;
    ringsMesh["saturn"].position.x = Math.cos( time * 0.645 ) * planets[6].posX;
    ringsMesh["saturn"].position.z = Math.sin( time * 0.645 ) * planets[6].posX;

    planetsMesh["uranus"].position.x = Math.cos( time * 0.258 ) * planets[7].posX;
    planetsMesh["uranus"].position.z = Math.sin( time * 0.258 ) * planets[7].posX;
    ringsMesh["uranus"].position.x = Math.cos( time * 0.258 ) * planets[7].posX;
    ringsMesh["uranus"].position.z = Math.sin( time * 0.258 ) * planets[7].posX;

    planetsMesh["neptune"].position.x = Math.cos( time * 0.007 ) * planets[8].posX;
    planetsMesh["neptune"].position.z = Math.sin( time * 0.007 ) * planets[8].posX;

    // Rotation planète + anneaux
    for (let key in planetsMesh) {
        planetsMesh[key].rotation.y += 0.001;
      }

      for (let key in ringsMesh) {
        ringsMesh[key].rotation.y += 0.001;
      }

    // Déplacement des étoiles
    // starsMesh.forEach(star => {
    //     // console.log(star)
    //     const starMesh = star.mesh;
    //     // const nb = Math.random()*0.02 - 0.01;

    //     starMesh.position.x = Math.cos(time * 1 )* star.posX ;
    //     starMesh.position.z = Math.sin(time * 1)* star.posZ ;
    //     // starMesh.position.y = Math.sin(time * 1)* star.posX ;
    // })

   
    // star.position.x =  Math.cos(counter*2)*100 ;
    // star.position.z =  Math.sin(counter*2)*100 ;
    //   console.log(counter)

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate()
