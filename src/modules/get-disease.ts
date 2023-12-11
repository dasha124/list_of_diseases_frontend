
export interface Disease{
    image: string
    disease_name: string
    disease_id: number
}

export interface DiseasesResult {
    resultCount: number
    results: Disease[]
}


const DiseaseMock = {
    
    disease_name: "болячка_1",
    disease_id: 1,
    image: "",
}

const DiseasesMock: Disease[] = [
    {
        disease_name: "болячка_1",
        disease_id: 1,
        image: "",
    },
    {
        disease_name: "болячка_2",
        disease_id: 2,
        image: "",
    },
    {
        disease_name: "болячка_3",
        disease_id: 3,
        image: "",
    }

]


export const getDisease = async (name = ''): Promise<Disease[]> =>{

    return fetch(`/api/diseases/?disease_name=${encodeURIComponent(name)}`, {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return DiseasesMock;
        });

}

