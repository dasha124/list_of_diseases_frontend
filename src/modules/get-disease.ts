
export interface Disease{
    image: string
    disease_name: string
    id: number,
    simptoms: string,
}

export interface DiseasesResult {
    resultCount: number
    results: Disease[]
}


const DiseasesMock: Disease[] = [
    {
        disease_name: "болячка_1",
        id: 1,
        image: "",
        simptoms: "",
    },

    {
        disease_name: "болячка_2",
        id: 2,
        image: "",
        simptoms: "",
    },
    {
        disease_name: "болячка_3",
        id: 3,
        image: "",
        simptoms: "",
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

