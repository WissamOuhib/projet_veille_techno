import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
                <h1 className="gros_titre_couleur">Solutions</h1>
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
    <div>
        {/* <Link to="../accueil/list" state={{ domaine: document.domaine}} className='a_logo_accueil'>
        <span className="logo_accueil"></span>
        </Link> */}

        <h1 className="gros_titre_couleur" style={{textAlign:'center'}} > 
        <Link to="../accueil/list" state={{ domaine: document.domaine}}>&#8592; &nbsp; &nbsp; &nbsp;</Link>    
        Lecture de: {document.nom}
        </h1>

        {/* <iframe 
        src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0" 
        style={{width:600 +'px',height:500 +'px'}} 
        scrolling="auto"
        frameBorder="0"></iframe> */}

        <iframe className="frame_detail"
        //src=  'http://localhost/api_veille_techno/archive/veille.pdf'
         src=  {document.path}
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
            <Link to="../accueil/add">
                <span></span>
            </Link>
        </div>

    </div>
            
    )
}