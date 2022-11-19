import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import * as THREE from "three";
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
  
    // const scene2 = new THREE.Scene();
    // const renderer2 = new THREE.WebGLRenderer({ alpha: true });/*alpha true pour la transparence du fond*/
    // renderer2.setSize(window.innerWidth, window.innerHeight);
    // renderer2.outputEncoding = THREE.sRGBEncoding;
    // document.getElementById("canva2").appendChild(renderer2.domElement);
    // renderer2.clearColor();

    camera.position.set(0, 0, 0);
  
    //particles
    const particles = make_particles();
    //const particles2 = make_particles();
  
    scene.add(particles);
    //scene2.add(particles2);

    //Lights

    scene.add(make_particlesLight());
    //scene2.add(make_particlesLight());

    //modèle 3D livres

    var obj
    const loader = new GLTFLoader();

    loader.load(require('.././media/paladins_book.glb'), function (gltf) {

        console.log(gltf.scene);

        obj = gltf.scene;
        obj.position.x -=2;
      //  obj.position.y -=2;
      //obj.position.z = -3;
        obj.position.z = -2.1;

        obj.rotation.y += 0.5;
    //    obj.rotation.x +=0.3;
    //    obj.rotation.z +=0.1;

        obj.receiveShadow = true;
        obj.castShadow = true;

     // obj.position.z -= 3;

        obj.scale.set(2.8, 4, 4);

        scene.add( obj);
    
      }, undefined, function (error) {
    
        console.error(error);
    
      });
    
      loader.castShadow = true;

      //lumiere pour l'objet 3d
    const directioanlLight = new THREE.DirectionalLight(0xffffff, 2);
    directioanlLight.position.set(-5, 5, 0);
    //  directioanlLight.castShadow = true;
    scene.add(directioanlLight);

    /**************************************/
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        //renderer2.render(scene2, camera);

        //animate particles 
        const elapsedTime = clock.getElapsedTime();
        particles.rotation.y = elapsedTime * 0.02;
        //particles2.rotation.y = elapsedTime * 0.02;

        if (obj) {
            floatAnimation(elapsedTime, obj,-2,null);
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
      <div id="canva2" style={{top:"20%"}}></div>
    </div>
          
}

export default function AddDocument() {

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        // axios.post('http://localhost:8888/api/user/save', inputs).then(function(response){
        //     console.log(response.data);
        //     navigate('/');
        // });
        
    }

    return (
        <div id="maincontainer">{My3dBody()}
        <div className="htmlcontainer">
        <div>
            <h1 className="gros_titre_couleur">
            <Link to="/">&nbsp; &nbsp; &nbsp; &nbsp; &#8592; &nbsp; &nbsp; &nbsp;</Link>
            Proposer un document
            </h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10" className="table_form_add">
                    <tbody>
                        <tr>
                            <th>
                                <label>Année: </label>
                            </th>
                            <td>
                            <select name="annee" id="annee" onChange={handleChange} className="form_elem">
                                <option></option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Domaine: </label>
                            </th>
                            <td>
                            <select name="domaine" id="domaine" onChange={handleChange} className="form_elem">
                                <option></option>
                                <option value="ALL">Arts, Lettres, Langues</option>
                                <option value="DEG">Droit, Economie, Gestion</option>
                                <option value="STS">Sciences, Technologies, Santé</option>
                                <option value="SHS">Sciences humaines et Sociales</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Niveau: </label>
                            </th>
                            <td>
                            <select name="niveau" id="niveau" onChange={handleChange} className="form_elem">
                                <option></option>
                                <option value="n1">Bac + 1</option>
                                <option value="n2">Bac + 2</option>
                                <option value="n3">Bac + 3</option>
                                <option value="n4">Bac + 4</option>
                                <option value="n5">Bac + 5</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label></label>
                            </th>
                            <td>
                            <input type="file" id="fichier" name="fichier" accept="image/*, .doc, .docx, .txt, .pdf " className="form_elem"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right" className="row_buttun_save">
                                <button>Envoyer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </div>
        </div>
        
    )
}