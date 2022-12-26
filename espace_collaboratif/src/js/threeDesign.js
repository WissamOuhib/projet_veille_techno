import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const make_particles = ()=>{
    //Particle geometry
  const objectDistance = 8;

  const particlesGeometry = new THREE.BufferGeometry();
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] =
      objectDistance * 0.5 -
      Math.random() * objectDistance;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    colors[i] = Math.random();
  }
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );

  //Particles Material
  const particlesMaterial = new THREE.PointsMaterial();
  const textureLoader = new THREE.TextureLoader();
  const particlesTexture = textureLoader.load(require('.././textures/particle1.png'));

  //console.log(particlesTexture);

  particlesMaterial.size = 0.04;
  particlesMaterial.sizeAttenuation = true;
  particlesMaterial.color = new THREE.Color("#ff88cc");
  particlesMaterial.transparent = true;
  particlesMaterial.alphaMap = particlesTexture;
  particlesMaterial.depthWrite = false;
  particlesMaterial.blending = THREE.AdditiveBlending;
  particlesMaterial.vertexColors = true;

  //particles
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);

  return particles;   
}

export const make_particlesLight = () => {
    
    const hemispherelight = new THREE.HemisphereLight(0xffffff, 0x000000, 3);
    hemispherelight.position.set(-4, 0, 2);
    hemispherelight.castShadow = true;

    return hemispherelight;
}


export const floatAnimation = (elapsedTime, obj, xparam, yparam) => {
    obj.position.y = (Math.cos(elapsedTime * 1.5) * 0.15) - yparam; /*1.5 vitesse, 0.15 courbe, -1 parceque y est modifié la haut*/
}

export const infiniteAnimation = (elapsedTime, obj, xparam, yparam) => {
   obj.position.x = (Math.cos(elapsedTime*1.5) *0.3) +xparam;
   obj.position.y = (Math.cos( elapsedTime*1.5 )*Math.sin( elapsedTime*1.5 )*0.2) -yparam;
}