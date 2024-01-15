export const DOMEN = "http://192.168.2.124:8000/api"

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


export interface Option {
    id: number,
    name: string
}
export const STATUSES: Option[] = [
    {
        id: 0,
        name: "Черновик"
    },
    {
        id: 1,
        name: "Сформирована"
    },
    {
        id: 2,
        name: "Завершена"
    },
    {
        id: 3,
        name: "Отменена"
    },
    {
        id: 4,
        name: "Удалена"
    }
]

export const STATUSES_T: Option[] = [

    {
        id: 1,
        name: "Успех"
    },
    {
        id: 2,
        name: "Неуспех"
    }
]

