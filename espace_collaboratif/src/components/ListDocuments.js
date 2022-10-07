import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListDocuments() {

    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        getDocuments();
    }, []);

    function getDocuments() {
        axios.get('http://localhost/api_veille_techno/listValide1.php/').then(function(response){
             console.log(response.data.data);
             setDocuments(response.data.data);
         });
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
                <tbody>
                    {documents.map((document, key) =>
                    <tr key={key}>
                        <td>
                            <Link to={`${document.id}/detail`}>{document.nom}</Link>
                        </td>
                        <td>{document.annee}</td>
                         
                    </tr>
                    )}
                </tbody>
            </table>

        </div>
        
    )
}