import {AxiosResponse} from "axios";

export interface Disease {
    id: number | undefined,
    type: string,
    disease_name: string | undefined,
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
    status: string,
    user_id: number,
    moderator_id: number,
    disease?: Disease[],
    test_status: string,

}

export interface User {
    id: number;
    username: string,
}


export type DiseasesContextType = {
    diseases: Disease[],
    setDiseases: React.Dispatch<React.SetStateAction<Disease[] | []>>,

}

export const iDiseasesContextState = {
    diseases: [],
    setDiseases: () => {}
}

export type SelectedDiseaseContextType = {
    selectedDisease: Disease | null,
    // selectedDisease: Disease
    setSelectedDisease: React.Dispatch<React.SetStateAction<Disease>>

}



export interface Option {
    id: number,
    name: string
}

export const iSelectedDiseaseContextState = {
    selectedDisease: null,
    setSelectedDisease: () => {}
}

// export const iSelectedDiseaseContextState: SelectedDiseaseContextType = {
//     selectedDisease: Disease | null,
//     setSelectedDisease: () => {}
// }


export type Response<T> = Promise<AxiosResponse<T>> | T;