export interface DiseaseDetail{
    image: string
    disease_name: string
    id: number
    simptoms: string
}


const DiseaseMock: DiseaseDetail = {
    
    disease_name: "болячка_1",
    id: 1,
    image: "",
    simptoms: "симптом_1,симптом_2"
}

export const getDiseaseDetail = async (id: number): Promise<DiseaseDetail> =>{
    return fetch('/api/diseases/'+id+'/', {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return DiseaseMock;
        });
}