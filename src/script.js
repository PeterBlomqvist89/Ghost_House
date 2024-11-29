import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();

// Floor texture
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
);
const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
);
const floorNRMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
);
const floorDISPTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
);

floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNRMTexture.repeat.set(8, 8);
floorNRMTexture.wrapS = THREE.RepeatWrapping;
floorNRMTexture.wrapT = THREE.RepeatWrapping;

floorDISPTexture.repeat.set(8, 8);
floorDISPTexture.wrapS = THREE.RepeatWrapping;
floorDISPTexture.wrapT = THREE.RepeatWrapping;

// Wall texture
const wallColorTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
);
const wallARMTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
);
const wallNRMTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const wallWoodColorTexture = textureLoader.load(
  "./wall/worn_planks_1k/worn_planks_diff_1k.webp"
);
const wallWoodARMTexture = textureLoader.load(
  "./wall/worn_planks_1k/worn_planks_arm_1k.webp"
);
const wallWoodDISPTexture = textureLoader.load(
  "./wall/worn_planks_1k/worn_planks_disp_1k.webp"
);
wallWoodColorTexture.colorSpace = THREE.SRGBColorSpace;
// Rotera trätexturerna
wallWoodColorTexture.rotation = Math.PI / 2; // 90 grader i radianer
wallWoodARMTexture.rotation = Math.PI / 2;
wallWoodDISPTexture.rotation = Math.PI / 2;

// Sätt center till mitten för korrekt rotation
wallWoodColorTexture.center.set(0.5, 0.5);
wallWoodARMTexture.center.set(0.5, 0.5);
wallWoodDISPTexture.center.set(0.5, 0.5);

wallWoodColorTexture.repeat.set(1.5, 1.2);
wallWoodARMTexture.repeat.set(1.5, 1.2);
wallWoodDISPTexture.repeat.set(1.5, 1.2);

wallWoodColorTexture.wrapS = THREE.RepeatWrapping;
wallWoodColorTexture.wrapT = THREE.RepeatWrapping;
wallWoodARMTexture.wrapS = THREE.RepeatWrapping;
wallWoodARMTexture.wrapT = THREE.RepeatWrapping;
wallWoodDISPTexture.wrapS = THREE.RepeatWrapping;
wallWoodDISPTexture.wrapT = THREE.RepeatWrapping;

// Roof texture
const roofColorTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"
);
const roofARMTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"
);
const roofNRMTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNRMTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNRMTexture.wrapS = THREE.RepeatWrapping;

// Bush texture
const bushColorTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
);
const bushARMTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
);
const bushNRMTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp"
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNRMTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNRMTexture.wrapS = THREE.RepeatWrapping;

// Grave texture
const graveColorTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
);
const graveARMTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
);
const graveNRMTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNRMTexture.repeat.set(0.3, 0.4);

graveColorTexture.wrapS = THREE.RepeatWrapping;
graveARMTexture.wrapS = THREE.RepeatWrapping;
graveNRMTexture.wrapS = THREE.RepeatWrapping;

// Door Texture
const doorColorTexture = textureLoader.load("./door/color.webp");
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.webp"
);
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */

// Helper
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNRMTexture,
    displacementMap: floorDISPTexture,
    alphaMap: floorAlphaTexture,
    transparent: true,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// GUI

gui.add(floor.material, "displacementScale").min(0).max(1).step(0.001);
gui
  .add({ setWallWood: () => setWallTexture("wood") }, "setWallWood")
  .name("Set Wall Wood");
gui
  .add({ setWallColor: () => setWallTexture("color") }, "setWallColor")
  .name("Set Wall Brick");

const setWallTexture = (type) => {
  if (type === "wood") {
    // Ställ in trätextur och nollställ onödiga mappar
    walls.material.map = wallWoodColorTexture;
    walls.material.aoMap = wallWoodARMTexture;
    walls.material.roughnessMap = wallWoodARMTexture;
    walls.material.metalnessMap = wallWoodARMTexture;
    walls.material.displacementMap = wallWoodDISPTexture;
    walls.material.normalMap = null; // Nollställ brick-texturens normalMap
    walls.material.displacementScale = -0.001; // Justera displacement för trä
  } else if (type === "color") {
    // Ställ in standardtextur och nollställ trä-relaterade mappar
    walls.material.map = wallColorTexture;
    walls.material.aoMap = wallARMTexture;
    walls.material.roughnessMap = wallARMTexture;
    walls.material.metalnessMap = wallARMTexture;
    walls.material.normalMap = wallNRMTexture;
    walls.material.displacementMap = null; // Inget displacement för brick-textur
    walls.material.displacementScale = 0; // Sätt displacement till 0
  }

  // Tvinga materialet att uppdateras
  walls.material.needsUpdate = true;
};

// House
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNRMTexture,
  })
);
walls.position.y = 1.25;
house.add(walls);

// Roof

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNRMTexture,
  })
);
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    transparent: true,
  })
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNRMTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;
house.add(bush1, bush2, bush3, bush4);

// Graves
const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const gravesMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNRMTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  // Random position
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const z = Math.cos(angle) * radius;
  const x = Math.sin(angle) * radius;

  // Mesh
  const grave = new THREE.Mesh(gravesGeometry, gravesMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  // Add to group
  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 6);
doorLight.position.set(0, 2.1, 2.4);
house.add(doorLight);

// Ghosts
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

// Particles
const particleCount = 30;
const particleGeometry1 = new THREE.BufferGeometry();
const particlePositions1 = new Float32Array(particleCount * 3);
const particleVelocities1 = new Float32Array(particleCount * 3); // Hastighet i x, y, z

for (let i = 0; i < particleCount; i++) {
  // Startpositioner (nära ghost1)
  particlePositions1[i * 3 + 0] =
    ghost1.position.x + (Math.random() - 0.5) * 0.5;
  particlePositions1[i * 3 + 1] = ghost1.position.y + Math.random() * 0.5;
  particlePositions1[i * 3 + 2] =
    ghost1.position.z + (Math.random() - 0.5) * 0.5;

  // Slumpmässig långsam rörelseriktning
  particleVelocities1[i * 3 + 0] = (Math.random() - 0.5) * 0.002; // Mindre x-hastighet
  particleVelocities1[i * 3 + 1] = Math.random() * 0.005 + 0.002; // Långsammare y-hastighet
  particleVelocities1[i * 3 + 2] = (Math.random() - 0.5) * 0.002; // Mindre z-hastighet
}
particleGeometry1.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions1, 3)
);

const particleMaterial1 = new THREE.PointsMaterial({
  color: 0x8800ff, // Färg för ghost1
  size: 0.05, // Mindre storlek
  sizeAttenuation: true, // Gör dem runda och beroende av avståndet till kameran
  transparent: true,
  opacity: 0.3, // Mjukare partiklar
  depthWrite: false,
  blending: THREE.AdditiveBlending, // Magisk effekt
});

const particles1 = new THREE.Points(particleGeometry1, particleMaterial1);
scene.add(particles1);

// Partikelsystem för ghost2
const particleGeometry2 = new THREE.BufferGeometry();
const particlePositions2 = new Float32Array(particleCount * 3);
const particleVelocities2 = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  particlePositions2[i * 3 + 0] =
    ghost2.position.x + (Math.random() - 0.5) * 0.5;
  particlePositions2[i * 3 + 1] = ghost2.position.y + Math.random() * 0.5;
  particlePositions2[i * 3 + 2] =
    ghost2.position.z + (Math.random() - 0.5) * 0.5;

  particleVelocities2[i * 3 + 0] = (Math.random() - 0.5) * 0.002;
  particleVelocities2[i * 3 + 1] = Math.random() * 0.005 + 0.002;
  particleVelocities2[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
}
particleGeometry2.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions2, 3)
);

const particleMaterial2 = new THREE.PointsMaterial({
  color: 0xff0088, // Färg för ghost2
  size: 0.05,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles2 = new THREE.Points(particleGeometry2, particleMaterial2);
scene.add(particles2);

// Partikelsystem för ghost3
const particleGeometry3 = new THREE.BufferGeometry();
const particlePositions3 = new Float32Array(particleCount * 3);
const particleVelocities3 = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  particlePositions3[i * 3 + 0] =
    ghost3.position.x + (Math.random() - 0.5) * 0.5;
  particlePositions3[i * 3 + 1] = ghost3.position.y + Math.random() * 0.5;
  particlePositions3[i * 3 + 2] =
    ghost3.position.z + (Math.random() - 0.5) * 0.5;

  particleVelocities3[i * 3 + 0] = (Math.random() - 0.5) * 0.002;
  particleVelocities3[i * 3 + 1] = Math.random() * 0.005 + 0.002;
  particleVelocities3[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
}
particleGeometry3.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions3, 3)
);

const particleMaterial3 = new THREE.PointsMaterial({
  color: 0xff0000, // Färg för ghost3
  size: 0.05,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles3 = new THREE.Points(particleGeometry3, particleMaterial3);
scene.add(particles3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive shadows
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
doorLight.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
roof.receiveShadow = true;
floor.receiveShadow = true;
bush1.castShadow = true;
bush1.receiveShadow = true;
bush2.castShadow = true;
bush2.receiveShadow = true;
bush3.castShadow = true;
bush3.receiveShadow = true;
bush4.castShadow = true;
bush4.receiveShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

// Mapping

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.far = 10;

// Camera helper
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

// Sky
const sky = new Sky();
sky.scale.setScalar(1000);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

// Fog
// scene.fog = new THREE.Fog("#03343f", 1, 15);
scene.fog = new THREE.FogExp2("#02343f", 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Ghost
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.3;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45);

  //Ghost particles
  // Uppdatera partiklar för ghost 1
  const positions1 = particleGeometry1.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    // Flytta partiklar långsamt baserat på deras hastighet
    positions1[i * 3 + 0] += particleVelocities1[i * 3 + 0]; // x
    positions1[i * 3 + 1] += particleVelocities1[i * 3 + 1]; // y
    positions1[i * 3 + 2] += particleVelocities1[i * 3 + 2]; // z

    // Reset om partikeln blir för långt från ghost1
    const distance = Math.sqrt(
      Math.pow(positions1[i * 3 + 0] - ghost1.position.x, 2) +
        Math.pow(positions1[i * 3 + 1] - ghost1.position.y, 2) +
        Math.pow(positions1[i * 3 + 2] - ghost1.position.z, 2)
    );

    if (distance > 2 || Math.random() < 0.01) {
      positions1[i * 3 + 0] = ghost1.position.x + (Math.random() - 0.5) * 0.5;
      positions1[i * 3 + 1] = ghost1.position.y + Math.random() * 0.5;
      positions1[i * 3 + 2] = ghost1.position.z + (Math.random() - 0.5) * 0.5;

      particleVelocities1[i * 3 + 0] = (Math.random() - 0.5) * 0.005;
      particleVelocities1[i * 3 + 1] = Math.random() * 0.005 + 0.005;
      particleVelocities1[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
  }
  particleGeometry1.attributes.position.needsUpdate = true;

  // Uppdatera partiklar för ghost2
  const positions2 = particleGeometry2.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    positions2[i * 3 + 0] += particleVelocities2[i * 3 + 0];
    positions2[i * 3 + 1] += particleVelocities2[i * 3 + 1];
    positions2[i * 3 + 2] += particleVelocities2[i * 3 + 2];

    const distance = Math.sqrt(
      Math.pow(positions2[i * 3 + 0] - ghost2.position.x, 2) +
        Math.pow(positions2[i * 3 + 1] - ghost2.position.y, 2) +
        Math.pow(positions2[i * 3 + 2] - ghost2.position.z, 2)
    );

    if (distance > 2 || Math.random() < 0.01) {
      positions2[i * 3 + 0] = ghost2.position.x + (Math.random() - 0.5) * 0.5;
      positions2[i * 3 + 1] = ghost2.position.y + Math.random() * 0.5;
      positions2[i * 3 + 2] = ghost2.position.z + (Math.random() - 0.5) * 0.5;

      particleVelocities2[i * 3 + 0] = (Math.random() - 0.5) * 0.005;
      particleVelocities2[i * 3 + 1] = Math.random() * 0.005 + 0.005;
      particleVelocities2[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
  }
  particleGeometry2.attributes.position.needsUpdate = true;

  // Uppdatera partiklar för ghost3
  const positions3 = particleGeometry3.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    positions3[i * 3 + 0] += particleVelocities3[i * 3 + 0];
    positions3[i * 3 + 1] += particleVelocities3[i * 3 + 1];
    positions3[i * 3 + 2] += particleVelocities3[i * 3 + 2];

    const distance = Math.sqrt(
      Math.pow(positions3[i * 3 + 0] - ghost3.position.x, 2) +
        Math.pow(positions3[i * 3 + 1] - ghost3.position.y, 2) +
        Math.pow(positions3[i * 3 + 2] - ghost3.position.z, 2)
    );

    if (distance > 2 || Math.random() < 0.01) {
      positions3[i * 3 + 0] = ghost3.position.x + (Math.random() - 0.5) * 0.5;
      positions3[i * 3 + 1] = ghost3.position.y + Math.random() * 0.5;
      positions3[i * 3 + 2] = ghost3.position.z + (Math.random() - 0.5) * 0.5;

      particleVelocities3[i * 3 + 0] = (Math.random() - 0.5) * 0.005;
      particleVelocities3[i * 3 + 1] = Math.random() * 0.005 + 0.005;
      particleVelocities3[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
  }
  particleGeometry3.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
