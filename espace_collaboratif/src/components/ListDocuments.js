import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as THREE from "three";
import { infiniteAnimation, make_particles, make_particlesLight } from '.././js/threeDesign.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function design() {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
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

    camera.position.set(0, 0, 0);
  
    //particles
    const particles = make_particles();
    const particles2 = make_particles();
  
    scene.add(particles);
    scene2.add(particles2);

    //Lights

   // scene.add(make_particlesLight());
    scene2.add(make_particlesLight());

    //modèle 3D bureau

  var obj;

  const loader = new GLTFLoader();

  loader.load(require('.././media/victorian_desk_with_props.glb'), function (gltf) {

    // console.log(gltf);

    obj = gltf.scene;

  //  obj.position.y -= 1;
    obj.position.x += 2;
    obj.position.z = -5;

    obj.rotation.y += 5.2;
    obj.rotation.x += 0.4;
    obj.rotation.z += 0.08;


    obj.receiveShadow = true;
    obj.castShadow = true;

    obj.scale.set(1, 1, 1);
    //obj.scale.set(2.2, 1.7, 1.7);

    scene.add(obj);

  }, undefined, function (error) {

    console.error(error);

  });

  loader.castShadow = true;

  //lumiere pour le bureau 3d

  const directioanlLight = new THREE.DirectionalLight(0xffffff, 6);
    directioanlLight.position.set(10, 1, 20);
    //directioanlLight.castShadow = true;
    scene.add(directioanlLight);

    const hemispherelight = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
    // hemispherelight.position.set(10, -10, 10);
    hemispherelight.position.set(0, 0, 0);
    //   hemispherelight.position.set(0, 0, 0);
    //   hemispherelight.castShadow = true;
    scene.add(hemispherelight);

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
            infiniteAnimation(elapsedTime, obj,2,null);
          }
    }

    animate();
    /**************************************/

}

function My3dBody () {

    useEffect(() => {
      /***********************************/
    design();
      /*************************************/
    }
    )
  
    return <div id="canvacontainer">
      <div id="canva1"></div>
      <div id="canva2" style={{top:"130%"}}></div>
    </div>
          
}

export default function ListDocuments() {

    const [documents, setDocuments] = useState([]);
    const [corrections, setCorrections] = useState([]);
    //ces trois en dessous c'est pour gérer le param domaine qui vient de la page accueil
    const location = useLocation()
    const { domaine } = location.state
    const navigate = useNavigate()

    useEffect(() => {
        navigate('', { state: { domaine: domaine }}); /*je sauvegarde domaine*/
        getDocuments();

        // documents.forEach(function (item, index) {
        //    // console.log(item, index);
        //    getCorrections(item.id);
        // });     

    }, []);

    function getDocuments() {

        axios.post('http://localhost/api_veille_techno/listValide1.php/', {domaine: domaine}).then(function(response){
           //  console.log(response.data.data);
             setDocuments(response.data.data);
         });
    }

    function titre_page() {
        switch (domaine) {
            case 'ALL':
                return "Arts, Lettres, Langues";
            case 'STS':
                return "Sciences, Technologies, Santé";
            case 'DEG':
                return "Droit, Economie, Gestion";
            case 'SHS':
                return "Sciences Humaines et Sociales";
            default:
              return ""
          }
    }

    return (
        <div id="maincontainer">{My3dBody()}
            <div className="htmlcontainer">
                <div>
                    <h1 id="titre_liste_documents" className="gros_titre_couleur">{titre_page()}</h1>
                    <table id="table_liste_documents" className={`liste_${domaine}`} >
                        <thead>
                            <tr>
                                <th>Document</th>
                                <th>Annee</th>
                                <th>Niveau</th>
                            </tr>
                        </thead>
                        {<tbody>
                            {documents.map((document, key) =>
                                <tr key={key}>
                                    <td>
                                        <Link to={`${document.id}/detail`} state={{ id_document: document.id }}>{document.nom}</Link>
                                    </td>
                                    <td>{document.annee}</td>
                                    <td>Bac + {document.niveau}</td>
                                </tr>
                            )}
                        </tbody>}
                    </table>
                    <div className="card_ajouter_doc">
                        {/* <h3>Ajouter un document</h3> */}
                        <img className="bulle" src={require('.././media/bulle_texte.png')}></img>
                        <img className="hermione" src={require('.././media/hermione11.png')}></img>
                        <Link to="../accueil/add">
                            <span></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}