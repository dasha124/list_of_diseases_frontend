export interface DiseaseDetail{
    image: string
    disease_name: string
    disease_id: number
    simptoms: string
}
const DiseaseMock: DiseaseDetail = {
    
    disease_name: "болячка_1",
    disease_id: 1,
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