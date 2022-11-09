import { useState } from "react";

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
        <div>
            <h1>Ajouter un document</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Année: </label>
                            </th>
                            <td>
                            <select name="annee" id="annee" onChange={handleChange}>
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
                            <select name="domaine" id="domaine" onChange={handleChange}>
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
                            <select name="niveau" id="niveau" onChange={handleChange}>
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
                            <input type="file" id="fichier" name="fichier" accept="image/*, .doc, .docx, .txt, .pdf "/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}