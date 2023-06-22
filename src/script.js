import * as THREE from "three"
import gsap from "gsap";

import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";

// Scene 
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

//pause btn

const pauseBtn = document.querySelector('.pause-btn');

// Planètes data
const planets = [
    {
        name: 'sun',
        texture: 'sunSurfaceMaterial.jpg',
        size: 20,
        posX: 0,
        desc: 'Le Soleil est l\'étoile centrale de notre système solaire et joue un rôle crucial en fournissant la chaleur et la lumière nécessaires à la vie sur Terre.',
        composition : 'Hydrogène (74% de sa masse) et d\'hélium (24% de sa masse)',
        height: 'Environ 1,4 million de km',
        rotationI: 'Environ 27 jours à son équateur et en environ 34 jours près de ses pôles.' ,
    },
    {
        name: 'mercury',
        texture: 'mercurySurfaceMaterial.jpg',
        size: 1,
        posX: 0,
        desc: 'Mercure, la plus proche du Soleil, est une petite planète rocheuse au paysage aride et inhospitalier.',
        composition : 'Rocheuse',
        height: '4 879 km de diamètre',
        rotationI: 'Environ 59 jours terrestres pour une rotation complète' ,
    },
    {
        name: 'venus',
        texture: 'venusSurfaceMaterial.jpg',
        size: 3,
        posX: 0,
        desc: 'Vénus, la deuxième planète du système solaire, est un monde étouffant recouvert d\'une épaisse atmosphère de gaz toxiques.',
        composition : 'Rocheuse',
        height: '12 104 km de diamètre',
        rotationI: 'Environ 243 jours terrestres pour une rotation complète' ,
    },
    {
        name: 'earth',
        texture: 'earthSurfaceMaterial.jpg',
        size: 4,
        posX: 0,
        desc: 'La Terre, notre planète bleue, est un havre de vie avec des océans, des continents et une atmosphère propice à la diversité biologique.',
        composition : 'Rocheuse (avec une atmosphère)',
        height: '12 742 km de diamètre',
        rotationI: 'Environ 24 heures pour une rotation complète',
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
        posX: 0,
        desc: 'Mars, la \'planète rouge\', intrigue les scientifiques avec ses canyons, ses volcans et sa possibilité d\'abriter des formes de vie microscopiques.',
        composition : 'Rocheuse',
        height: '6 779 km de diamètre',
        rotationI: 'Environ 24,6 heures pour une rotation complète' ,
    },
    {
        name: 'jupiter',
        texture: 'jupiterSurfaceMaterial.jpg',
        size: 10,
        posX: 0,
        desc: 'Jupiter, la plus grande planète du système solaire, est un géant gazeux aux puissantes tempêtes et à l\'énigmatique Grande Tache Rouge.',
        composition : 'Gazeuse',
        height: '139 820 km de diamètre',
        rotationI: 'Environ 9,9 heures pour une rotation complète' ,
    },
    {
        name: 'saturn',
        texture: 'saturnSurfaceMaterial.jpg',
        size: 7,
        posX: 0,
        desc: 'Saturne, célèbre pour ses magnifiques anneaux, est une planète majestueuse aux nuances dorées, abritant des dizaines de lunes.',
        composition : 'Gazeuse',
        height: '116 460 km de diamètre',
        rotationI: 'Environ 10,7 heures pour une rotation complète' ,
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
        desc: 'Uranus, la géante glacée, possède une atmosphère composée de gaz gelés et orbite autour du Soleil sur un axe incliné unique.',
        composition : 'Gazeuse',
        height: 'Environ 2,9 milliards de kilomètres',
        rotationI: 'Environ 17,2 heures pour une rotation complète' ,
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
        posX: 0,
        desc: 'Neptune, la mystérieuse planète bleue, est un monde venteux et froid, entouré d\'une atmosphère riche en méthane et en nuages tourbillonnants.',
        composition : 'Gazeuse',
        height: '49 244 km de diamètre',
        rotationI: ' Environ 16,1 heures pour une rotation complète'
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

    // const starMaterial = new THREE.SpriteMaterial( { map: starTexture, color: 0xffffff} );

    // const star = new THREE.Sprite( starMaterial );
    // star.scale.set(200, 200)
    // star.position.set(100, 100, 0);
    // scene.add( star );



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0, 300, 500)
scene.add(camera);

// Renderer 
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Eventlistener (onClick)
canvas.addEventListener('click', onClick);
var planetInfo = document.querySelector(".planet-info");
var planetInfoDesc = document.querySelector(".desc");
var planetInfoComposition = document.querySelector(".composition");
var planetInfoHeight = document.querySelector(".height");
var planetInfoRotation = document.querySelector(".rotation");

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
        //alert(`Forme géométrique touchée : ${object.name}`);
        togglePause() 
        //camera.position.z = object.position.z;
        camera.position.x = object.position.x;
        camera.position.Z = object.position.Z;
        planetInfo.classList.remove("none");
        //display data info
        document.querySelector(".planet-info .name").innerHTML = object.name;
        var currentPlanet;
        for( var i=0; i < planets.length; i++){
            if (planets[i].name == object.name) {
                currentPlanet = planets[i];
            }
        }
        //console.log(currentPlanet);
        planetInfoComposition.textContent = currentPlanet.composition;
        planetInfoDesc.textContent = currentPlanet.desc;
        planetInfoHeight.textContent = currentPlanet.height;
        planetInfoRotation.textContent = currentPlanet.rotationI;
        
        if (pauseBtn.classList.contains('stop')) {
            planetInfo.classList.remove("none");
        } else {
            planetInfo.classList.add("none");
        }
    }
}

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Time / Pause

pauseBtn.addEventListener('click', function() {
    pauseBtn.classList.toggle('stop');

    if (pauseBtn.classList.contains('stop')) {
        pauseBtn.innerHTML = '<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" />';
      } else {
        pauseBtn.innerHTML = '<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clip-rule="evenodd" />';
      }
})

function togglePause() {
    pauseBtn.classList.toggle('stop');

    if (pauseBtn.classList.contains('stop')) {
        pauseBtn.innerHTML = '<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" />';
      } else {
        pauseBtn.innerHTML = '<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clip-rule="evenodd" />';
      }
}

let seconde = 0;
let years = 0;


// Animate
const animate = () => {
    
    // Stop rotation qd click sur stop
    if(!pauseBtn.classList.contains('stop')){
        seconde += 0.01;
        
        // +1 an à chaque fois que la Terre fait un tour complet 
        setTimeout(() => {
            if(Math.round(planetsMesh["earth"].position.x) == planets[3].posX){
                years += 0.2;
                // console.log(planetsMesh["earth"].position.x)
                // console.log(years)
            } else {
                years = Math.round(years);
            }
        }, 500)
        
    } else {
        seconde = seconde
    }

    controls.update();

    // Affichage du nombre d'années
    document.querySelector('.year').innerHTML = Math.round(years) + " années passées";

    // Rotation planète + anneaux autour du soleil  
    planetsMesh["mercury"].position.x = Math.cos( seconde * 25 ) * planets[1].posX;
    planetsMesh["mercury"].position.z = Math.sin( seconde * 25 ) * planets[1].posX;

    planetsMesh["venus"].position.x = Math.cos( seconde * 8.5 ) * planets[2].posX;
    planetsMesh["venus"].position.z = Math.sin( seconde * 8.5 ) * planets[2].posX;

    planetsMesh["earth"].position.x = Math.cos( seconde * 5 ) * planets[3].posX;
    planetsMesh["earth"].position.z = Math.sin( seconde * 5 ) * planets[3].posX;
    planetsMesh["lune"].position.x = Math.cos( seconde * 5 ) * planets[3].posX + 5;
    planetsMesh["lune"].position.z = Math.sin( seconde * 5 ) * planets[3].posX + 5;

    planetsMesh["mars"].position.x = Math.cos( seconde * 2.5 ) * planets[4].posX;
    planetsMesh["mars"].position.z = Math.sin( seconde * 2.5 ) * planets[4].posX;

    planetsMesh["jupiter"].position.x = Math.cos( seconde * 0.4 ) * planets[5].posX;
    planetsMesh["jupiter"].position.z = Math.sin( seconde * 0.4 ) * planets[5].posX;

    planetsMesh["saturn"].position.x = Math.cos( seconde * 0.3 ) * planets[6].posX;
    planetsMesh["saturn"].position.z = Math.sin( seconde * 0.3 ) * planets[6].posX;
    ringsMesh["saturn"].position.x = Math.cos( seconde * 0.3 ) * planets[6].posX;
    ringsMesh["saturn"].position.z = Math.sin( seconde * 0.3 ) * planets[6].posX;

    planetsMesh["uranus"].position.x = Math.cos( seconde * 0.1 ) * planets[7].posX;
    planetsMesh["uranus"].position.z = Math.sin( seconde * 0.1 ) * planets[7].posX;
    ringsMesh["uranus"].position.x = Math.cos( seconde * 0.1 ) * planets[7].posX;
    ringsMesh["uranus"].position.z = Math.sin( seconde * 0.1 ) * planets[7].posX;

    planetsMesh["neptune"].position.x = Math.cos( seconde * 0.006 ) * planets[8].posX;
    planetsMesh["neptune"].position.z = Math.sin( seconde * 0.006 ) * planets[8].posX;

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

    //     starMesh.position.x = Math.cos(seconde * 1 )* star.posX ;
    //     starMesh.position.z = Math.sin(seconde * 1)* star.posZ ;
    //     // starMesh.position.y = Math.sin(time * 1)* star.posX ;
    // })

   
    // star.position.x =  Math.cos(seconde*1)*100 ;
    // star.position.z =  Math.sin(seconde*1)*100 ;
    //   console.log(seconde)

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate()

