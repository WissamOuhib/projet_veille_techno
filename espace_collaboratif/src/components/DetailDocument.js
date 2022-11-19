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
    document.getElementById("canva2").appendChild(renderer.domElement);
    renderer.clearColor();

    const scenemiddle = new THREE.Scene();
    const renderermiddle = new THREE.WebGLRenderer({ alpha: true });/*alpha true pour la transparence du fond*/
    renderermiddle.setSize(window.innerWidth, window.innerHeight);
    renderermiddle.outputEncoding = THREE.sRGBEncoding;
    document.getElementById("middle_canva").appendChild(renderermiddle.domElement);
    renderermiddle.clearColor();
  
    const scene2 = new THREE.Scene();
    const renderer2 = new THREE.WebGLRenderer({ alpha: true });/*alpha true pour la transparence du fond*/
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.outputEncoding = THREE.sRGBEncoding;
    document.getElementById("canva1").appendChild(renderer2.domElement);
    renderer2.clearColor();

    const scenebottom = new THREE.Scene();
    const rendererbottom = new THREE.WebGLRenderer({ alpha: true });/*alpha true pour la transparence du fond*/
    rendererbottom.setSize(window.innerWidth, window.innerHeight);
    rendererbottom.outputEncoding = THREE.sRGBEncoding;
    document.getElementById("bottom_canva").appendChild(rendererbottom.domElement);
    rendererbottom.clearColor();

    camera.position.set(0, 0, 0);
  
    //particles
    const particles = make_particles();
    const particles2 = make_particles();
    const particles3 = make_particles();
    const particles4 = make_particles();
  
    scene.add(particles);
    scene2.add(particles2);
    scenemiddle.add(particles3);
    scenebottom.add(particles4);

    //Lights

   // scene.add(make_particlesLight());
    scene2.add(make_particlesLight());
    scenemiddle.add(make_particlesLight());
    scenebottom.add(make_particlesLight());

    //modèle 3D bureau

  var obj;

  const loader = new GLTFLoader();

  loader.load(require('.././media/necronomicon.glb'), function (gltf) {

    // console.log(gltf);

      obj = gltf.scene;

      obj.position.x -= 8;
      obj.position.y -= 2;
      //obj.position.z = -3;
      obj.position.z = -15;

      obj.rotation.y += 0.5;
      //       obj.rotation.x +=8;
      //       obj.rotation.z -=4;

      obj.receiveShadow = true;
      obj.castShadow = true;

      obj.scale.set(0.2, 0.2, 0.2);
      //obj.scale.set(2.2, 1.7, 1.7);

      scene.add(obj);

  }, undefined, function (error) {

    console.error(error);

  });

  loader.castShadow = true;

  //lumiere pour le livre 3d

     const directioanlLight = new THREE.DirectionalLight(0xffffff, 4);
    directioanlLight.position.set(5, 3, 0);
    //  directioanlLight.castShadow = true;
    scene.add(directioanlLight);

    /**************************************/
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        renderer2.render(scene2, camera);
        renderermiddle.render(scenemiddle, camera);
        rendererbottom.render(scenebottom, camera);

        //animate particles 
        const elapsedTime = clock.getElapsedTime();
        particles.rotation.y = elapsedTime * 0.02;
        particles2.rotation.y = elapsedTime * 0.02;
        particles3.rotation.y = elapsedTime * 0.02;
        particles4.rotation.y = elapsedTime * 0.02;

        if (obj) {
            infiniteAnimation(elapsedTime, obj,-8,2);
            obj.rotation.y += 0.01
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
      <div id="middle_canva" style={{top:"170%"}}></div>
      <div id="canva2" style={{top:"390%"}}></div>
      <div id="bottom_canva" style={{top:"600%"}}></div>
    </div>
          
}

export default function DetailDocument() {

    const location = useLocation()
    const {id_document} = location.state
    //const [id_document, setId_document] = useState(location.state['id_document'])
    const navigate = useNavigate()

    const [document, setDocument] = useState({});
    const [corrections, setCorrections] = useState([]);

    var caca;

    useEffect(() => {
        navigate('', { state: { id_document: id_document }}); /*je sauvegarde domaine*/
        getDocument();
        getCorrections(id_document);
    
    }, []);

    function getDocument() {

        axios.post('http://localhost/api_veille_techno/getDocumentById.php/', {id_document: id_document}).then(function(response){
         //   console.log(response.data.data);
            setDocument(response.data.data);
         });
    }

    function getCorrections(id) {

        axios.post('http://localhost/api_veille_techno/getCorrectionsByDocumentId.php/', {id_document: id}).then(function(response){
         //   console.log(id_document);
        //console.log(response.data.data);
           setCorrections(response.data.data);
         });
    }

    function updateDocument(correction){
        setDocument(correction);
     //   setId_document(correction.id);
        getCorrections(correction.id);
    }

    function render_solutions(){
        if(corrections.length>0) return (
            <div>
                <h1 id="titre_solutions_document" className="gros_titre_couleur">Solutions</h1>
                <table className={`liste_${document.domaine}`}>
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Annee</th>
                            <th>Niveau</th>
                        </tr>
                    </thead>
                    {<tbody>
                        {corrections.map((correction, key) =>
                            <tr key={key}>
                                <td>
                                    <Link to={`../accueil/list/${correction.id}/detail`} state={{ id_document: correction.id }} onClick={() => updateDocument(correction)}>{correction.nom}</Link>
                                </td>
                                <td>{correction.annee}</td>
                                <td>Bac + {correction.niveau}</td>
                            </tr>
                        )}
                    </tbody>}
                </table>
            </div>
        )
    }

    return ( 
        <div id="maincontainer">{My3dBody()}
            <div className="htmlcontainer">
                <div>
                    {/* {<Link to="../accueil/list" state={{ domaine: document.domaine }} className='a_logo_accueil'>
                        <span className="logo_accueil"></span>
                    </Link>} */}

                    <h1 className="gros_titre_couleur" style={{ textAlign: 'center' }} >
                        <Link to="../accueil/list" state={{ domaine: document.domaine }}>&#8592; &nbsp; &nbsp; &nbsp;</Link>
                        Lecture de: {document.nom}
                    </h1>

                    {/* <iframe
                        src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        style={{ width: 600 + 'px', height: 500 + 'px' }}
                        scrolling="auto"
                        frameBorder="0"></iframe> */}

                    <iframe className="frame_detail"
                        //src=  'http://localhost/api_veille_techno/archive/veille.pdf'
                        src={document.path}
                        // style={{width:600 +'px',height:500 +'px'}} 
                        scrolling="auto"
                        frameBorder="0"></iframe>

                    <div>
                        {render_solutions()}
                    </div>

                    <div className="card_ajouter_doc">
                        {/* <h3>Ajouter un document</h3> */}
                        <img className="bulle" src={require('.././media/bulle_texte_solution1.png')}></img>
                        <img className="harry" src={require('.././media/harry1.png')}></img>
                        <Link to={`../accueil/list/${document.id}/detail/addsolution`}>
                            <span></span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    
            
    )
}