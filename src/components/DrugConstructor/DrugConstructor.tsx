//import "./DrugConstructor.css"
import {useDraftDrug} from "../../hooks/useDraftDrug";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import React from "react";

const DrugConstructor = () => {

    const {drug, fetchDraftDrug} = useDraftDrug()

    useEffect(() => {
        fetchDraftDrug()
    }, [])

    return (
        <Link to="/drugs/draft/" className="drug-constructor-container">
            <span className="title">Ваша заявка</span>
            {drug?.diseases && drug.diseases.length > 0 && <span className="badge">{drug.diseases.length}</span>}
        </Link>
    )
}

export default DrugConstructor;