import "./DrugConstructor.css"
import {useDraftDrug} from "../../hooks/useDraftDrug";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Disease } from "../../Types";
import SearchResult from "/home/student/front/list_of_diseases_frontend/src/pages/DiseasesList/SearchResult/SearchResults.tsx";



const DrugConstructor = () => {

    const {drug, fetchDraftDrug} = useDraftDrug()
    // console.log("drrrrrrrrruuuuuuuuug = ",drug)


    useEffect(() => {
        fetchDraftDrug()
    }, [])


    // if (drug?.disease &&drug.disease.length == 0){
    //     return(
    //         <div>GECM</div>

    //     )
        
    // }
    // else{
    //     return (
    //         <Link to="/drugs" className="drug-constructor-container">
    //         <span className="title">Ваша заявка</span>
    //         {drug?.disease && drug.disease.length > 0 && <span className="badge">{drug.disease.length}</span>}
    //     </Link>
            
    //     )
    // }

    

    

    return (
       
       
            <Link to="/drugs/create_drug/" className="drug-constructor-container">
            <span className="title">Новая заявка</span>
            
            {drug?.disease && drug.disease.length > 0 && <span className="badge">{drug.disease.length}</span>}

            {/* {drug.disease && drug.disease.map((disease: Disease, index) => (
                        <div className="item" key={index}>
                        <SearchResult disease={disease} />
                        </div>
                    ))} */}
        </Link>
        
    )
}

export default DrugConstructor;