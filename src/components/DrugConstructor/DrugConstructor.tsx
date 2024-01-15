import "./DrugConstructor.css"
import {useDraftDrug} from "../../hooks/useDraftDrug";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Disease } from "../../Types";
import SearchResult from "/home/student/front/list_of_diseases_frontend/src/pages/DiseasesList/SearchResult/SearchResults.tsx";



const DrugConstructor = () => {

    const {drug, fetchDraftDrug} = useDraftDrug()
    
    useEffect(() => {
        fetchDraftDrug()
    }, [])



    

    return (
       
       
            <Link to="/drugs/create_drug/" className="drug-constructor-container">
            <span className="title">Новая заявка</span>
            
            {drug?.disease && drug.disease.length > 0 && <span className="badge">{drug.disease.length}</span>}

            </Link>
        
    )
}

export default DrugConstructor;