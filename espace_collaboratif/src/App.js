import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Accueil from './components/Accueil';
import AddDocument from './components/AddDocument';
import DetailDocument from './components/DetailDocument';
import ListDocuments from './components/ListDocuments';
import { useEffect, useState } from "react";
import axios from "axios";
import AddSolution from './components/AddSolution';

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="/" className='a_logo_accueil'>
        <span className="logo_accueil"></span>
      </Link>
      

        <Routes>
          <Route index element={<Accueil />} />
          <Route path="accueil/list" element={<ListDocuments />} />
          <Route path="accueil/add" element={<AddDocument />} />
          <Route path="accueil/list/:id/detail/addsolution" element={<AddSolution />} />
          <Route path="accueil/list/:id/detail" element={<DetailDocument />} />
        </Routes>
      </BrowserRouter>

    </div>

    
  );
}

export default App;
