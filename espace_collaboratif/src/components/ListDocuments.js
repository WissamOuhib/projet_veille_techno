import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListDocuments() {

    const [documents, setDocuments] = useState([]);
    const location = useLocation()
    const { domaine } = location.state
    // const qs = require('qs'); 

  //  console.log(domaine);

    useEffect(() => {
   
        getDocuments();
    }, []);

    function getDocuments() {

        axios.post('http://localhost/api_veille_techno/listValide1.php/', {domaine: domaine}).then(function(response){
           //  console.log(response.data.data);
             setDocuments(response.data.data);
         });

        const formData = new FormData();
        formData.append('domaine', domaine);
/*
        axios({
            method: 'post',
            url: 'http://localhost/api_veille_techno/listValide1.php/',
            data: formData,
            config: {headers: {'Content-Type':'multipart/form-data'}}
        }).then(function(response){
            // console.log(response.data.data);
           //  setDocuments(response.data.data);
         });
*/

/*
        axios.post('http://localhost/api_veille_techno/listValide1.php/', qs.stringify(formData, { parseArrays: false })) 
        .then(function(response){
            // console.log(response.data.data);
           //  setDocuments(response.data.data);
         });
         */

    }

    return (
        
        <div>
            <h1>Liste des documents</h1>

            <table>
                <thead>
                    <tr>
                        <th>Document</th>
                        <th>Annee</th>
                    </tr>
                </thead>
                { <tbody>
                    {documents.map((document, key) =>
                    <tr key={key}>
                        <td>
                            <Link to={`${document.id}/detail`}>{document.nom}</Link>
                        </td>
                        <td>{document.annee}</td>
                         
                    </tr>
                    )}
                </tbody> }
            </table>

            <div>
            <Link to="../accueil/add">Ajouter document</Link>
            </div>

        </div>
        
    )
}