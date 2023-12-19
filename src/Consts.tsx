export const DOMEN = "http://127.0.0.1:8000/"

export const requestTime = 1000

export const iDiseaseMock = {
    
        disease_name: "болячка_1",
        disease_id: 1,
        image: "",
        save: []
}

export const iDiseasesMock = [
    {
        disease_name: "болячка_1",
        disease_id: 1,
        image: "",
        save: []
    },
    {
        disease_name: "болячка_2",
        disease_id: 2,
        image: "",
        save: []
    },
    {
        disease_name: "болячка_3",
        disease_id: 3,
        image: "",
        save: []
    }
]

interface Option {
    id: string;
    name: string;
}


export const STATUSES : Option[] = [
    {
        id: "e",
        name: "Черновик"
    },
]