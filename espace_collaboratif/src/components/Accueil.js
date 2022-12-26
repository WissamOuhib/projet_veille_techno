import React, { useEffect, useState } from "react";
import * as THREE from "three";
import {Link} from 'react-router-dom';
import '.././accueil.css';
import { make_particles, make_particlesLight, floatAnimation } from '.././js/threeDesign.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function design() {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();/*alpha true pour la transparence du fond*/
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.outputEncoding = THREE.sRGBEncoding;
  document.getElementById("canva1").appendChild(renderer.domElement);
  renderer.clearColor();

  const scene2 = new THREE.Scene();
  const renderer2 = new THREE.WebGLRenderer({ alpha: true });/*alpha true pour la transparence du fond*/
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.outputEncoding = THREE.sRGBEncoding;
  document.getElementById("canva2").appendChild(renderer2.domElement);
  renderer2.clearColor();


  //particles
  const particles = make_particles();
  const particles2 = make_particles();

  scene.add(particles);
  scene2.add(particles2);


  //modèle 3D libraire

  var obj;

  const loader = new GLTFLoader();

  loader.load(require('.././media/dusty_old_bookshelf_freeHD.glb'), function (gltf) {

    // console.log(gltf);

    obj = gltf.scene;

    obj.position.y -= 1;
    obj.rotation.y += 2;
    obj.position.z -= 2.2;
    obj.position.x += 2;

    // obj.position.x += 5;
    // obj.position.y += 3;
    // obj.rotation.y -= 2.9;

    obj.receiveShadow = true;
    obj.castShadow = true;

    //obj.scale.set(1.1, 1.8, 1.1);
    obj.scale.set(1.1, 1, 1.5);

    scene.add(obj);

  }, undefined, function (error) {

    console.error(error);

  });

  loader.castShadow = true;


  //Lights
  /*const directioanlLight = new THREE.DirectionalLight(0xffffff, 50);
  directioanlLight.position.set(1, 1, 0);
  directioanlLight.castShadow = true;
  scene.add(directioanlLight);
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  scene.add(ambientLight);*/

  const hemispherelight = new THREE.HemisphereLight(0xffffff, 0x000000, 10);
  hemispherelight.position.set(-8, 0, -2);
  hemispherelight.castShadow = true;

  scene.add(hemispherelight);
  scene2.add(make_particlesLight());

  //console.log(scene.getObjectByName("Sketchfab_Scene"));
  //console.log(scene.children);


  //camera.position.z = 5;
  //camera.position.set( 0, 3, 6 );
  //camera.position.set( - 1, 0.1, 4 );
  camera.position.set(0, 0, 0);

  /**************************************/
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    renderer2.render(scene2, camera);

    //animate particles 
    const elapsedTime = clock.getElapsedTime();
    particles.rotation.y = elapsedTime * 0.02;
    particles2.rotation.y = elapsedTime * 0.02;

    if (obj) {
      floatAnimation(elapsedTime, obj,null,1);
    }

  }

  animate();

  /**************************************/

}

function My3dBody () {

  //est appelé une fois que le composant existe == equivaut componentDidMount
  useEffect(() => {

    /***********************************/
    design();
    /*************************************/

  }//faire un return function ici si on veut qlq chose au démontage
  )

  return <div id="canvacontainer">
    <div id="canva1"></div>
    <div id="canva2"></div>
  </div>
        
}

export default function Accueil() {
   /* return <Mybody/>*/
   return <div id="maincontainer">{My3dBody()}
   <div className='htmlcontainer'>
    <div className="top-container">
      <h5 className='titre_accueil'>Bibliothèque<br/> Virtuelle</h5>
    </div>
    <div className='card-container'>
        <div className='card' id='card_1'>
          <img src={require('.././media/arts1.gif')}></img>
          {/* <a href="accueil/list" onClick={() => getDocuments('ALL')}>Arts, Lettres, Langues</a> */}
          <Link to="accueil/list" state={{ domaine: "ALL" }}>Arts,Lettres,Langues</Link>
        </div>
        <div className='card' id='card_2'>
        <img src={require('.././media/sciences2.jpg')}></img>
          {/* <a href="accueil/list">Sciences,Technologies,Santé</a> */}
          <Link to="accueil/list" state={{ domaine: "STS" }}>Sciences,Technologies<br/>Santé</Link>
        </div>
        <div className='card' id='card_3'>
        <img src={require('.././media/droit.jpg')}></img>
          {/* <a href="accueil/list">Droit,Economie,Gestion</a> */}
          <Link to="accueil/list" state={{ domaine: "DEG" }}>Droit,Economie,Gestion</Link>
        </div>
        <div className='card' id='card_4'>
        <img src={require('.././media/social.png')}></img>
          {/* <a href="accueil/list">Sciences Humaines et Sociales</a> */}
          <Link to="accueil/list" state={{ domaine: "SHS" }}>Sciences Humaines et Sociales</Link>
        </div>
    </div>
  </div>
   </div>
}