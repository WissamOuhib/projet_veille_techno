import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function Accueil(){
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getDocuments();
  }, []);

  function getDocuments() {

    axios.get('http://localhost/api_veille_techno/listValide0.php/').then(function(response){
       //  console.log(response.data.data);
         setDocuments(response.data.data);
     });

}
const supprimer = (event, id) => {

  //console.log(id);

   axios.post('http://localhost/api_veille_techno/supprimer.php/', {id: id}).then(function(response){
      //  console.log(response.data.data);
      window.location.reload();

    });

}

const valider = (event, id) => {

  //console.log(id);

   axios.post('http://localhost/api_veille_techno/valider.php/', {id: id}).then(function(response){
      //  console.log(response.data.data);
      window.location.reload();

    });

}



  return (
    <div>
    <h1>Liste des documents</h1>
    <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>domaine</th>
            <th>annee</th>
            <th>niveau</th>
            <th>date_ajout</th>
          </tr>
        </thead>
        {<tbody>
          {documents.map((document, key) =>
            <tr key={key}>
              <td>{document.nom}</td>
              <td>{document.domaine}</td>
              <td>{document.annee}</td>
              <td>{document.niveau}</td>
              <td>{document.date_ajout}</td>
              <td>  
                <Link to= {`${document.id}/read`} className = 'a_icon_read' >
                <span className="icon icon_read"></span>
                </Link> 
              </td>
              <td>  
                <a onClick={event => valider(event, `${document.id}` )} >
                <span className="icon icon_valider"></span>
                </a> 
              </td>
              <td>  
                <a onClick={event => supprimer(event, `${document.id}` )} >
                <span className="icon icon_supprimer"></span>
                </a> 
              </td>

            </tr>
          )}
        
        </tbody>}
        
        
    </table>

    </div >
)

}
