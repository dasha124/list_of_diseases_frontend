import {AxiosResponse} from "axios";

export interface Disease {
    id: number,
    type: string,
    disease_name: string,
    general_info: string,
    simptoms: string,
    image: string,
    status: string,
}

export interface Drug {
    id: number,
    drug_name: string,
    time_create: string,
    time_form: string,
    time_finish: string,
    price: number,
    status: string,
    user_id: number,
    disease?: Disease[],
    sphere: string,

}

export interface User {
    id: number;
    username: string,
}


export type DiseasesContextType = {
    diseases: Disease[],
    setDiseases: React.Dispatch<React.SetStateAction<Disease[] | []>>
}

export const iDiseasesContextState = {
    diseases: [],
    setDiseases: () => {}
}

export type SelectedDiseaseContextType = {
    selectedDisease: Disease | null,
    setSelectedDisease: React.Dispatch<React.SetStateAction<Disease | null>>
}


export interface Option {
    id: number,
    name: string
}

export const iSelectedDiseaseContextState = {
    selectedDisease: null,
    setSelectedDisease: () => {}
}

export type Response<T> = Promise<AxiosResponse<T>> | T;