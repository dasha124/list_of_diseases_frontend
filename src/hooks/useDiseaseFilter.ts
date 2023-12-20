import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {updateDiseases, updateQuery} from "../store/diseaseFiltersSlice";
import {Disease} from "../Types";

export function useDiseaseFilters() {
    const diseases = useSelector((state: { diseaseFilters: { diseases: Disease[], query: string } }) => state.diseaseFilters.diseases);
    const query = useSelector((state: { diseaseFilters: { diseases: Disease[], query: string } }) => state.diseaseFilters.query);


    const dispatch = useDispatch()

    const setDiseases = (value: any) => {
        dispatch(updateDiseases(value))
    }

    const setQuery = (value: any) => {
        dispatch(updateQuery(value))
    }


    return {
        diseases,
        setDiseases,
        query,
        setQuery
    };
}