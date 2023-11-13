export interface DiseaseDetail{
    image64: string
    disease_name: string
    sphere_name: string
    disease_id: number
    simptoms: string
}

export const getDiseaseDetail = async (id: number): Promise<DiseaseDetail> =>{
    return fetch('/api/diseases/'+id+'/', {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch(() => ([]));
}