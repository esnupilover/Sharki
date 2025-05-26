import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three/examples/jsm/postprocessing/ShaderPass.js';
import { PixelShader } from 'https://cdn.skypack.dev/three/examples/jsm/shaders/PixelShader.js';

let scene, camera, renderer, composer;
let sharkModel = null;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.DirectionalLight(0xffffff, 1.2).position.set(5, 10, 7.5));
  scene.add(new THREE.AmbientLight(0x404040, 2.0));

  const loader = new GLTFLoader();
  loader.load('shark2f.glb', (gltf) => {
    sharkModel = gltf.scene;
    sharkModel.scale.set(5, 5, 5);         // Increased scale
    sharkModel.rotation.y = Math.PI;       // Turn to face forward
    sharkModel.position.set(0, 0, 0);       // Center
    scene.add(sharkModel);
  });

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const pixelPass = new ShaderPass(PixelShader);
  pixelPass.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio);
  pixelPass.uniforms['pixelSize'].value = 4.0;
  composer.addPass(pixelPass);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (sharkModel) sharkModel.rotation.y += 0.01;
  composer.render();
}

init();
animate();