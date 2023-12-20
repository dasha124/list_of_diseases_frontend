// import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {updateDisease} from "../store/selectedDiseaseSlice";
import {Disease} from "../Types";

export function useDisease() {
    const disease = useSelector((state: { selectedDisease: { disease: Disease } }) => state.selectedDisease.disease);

    const dispatch = useDispatch();

    const setDisease= (value: any) => {
        dispatch(updateDisease(value))
    }

    return {
        disease,
        setDisease
    };
}