export interface DiseaseDetail{
    image64: string
    disease_name: string
    sphere_name: string
    disease_id: number
}

export const getDiseaseDetail = async (id: number): Promise<DiseaseDetail> =>{
    return fetch('http://localhost:8000/diseases/?${id}', {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch(() => ([]));
}