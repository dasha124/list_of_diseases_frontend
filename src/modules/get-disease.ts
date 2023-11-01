export interface Disease{
    image64: string
    disease_name: string
    sphere_name: string
    disease_id: number
}

// export const getDisease = async (name = ''): Promise<Disease[]> =>{
//     return fetch('http://localhost:8000/diseases/?name=${name}', {
//         method: 'GET',
//         }) 
//         .then((response) => response.json())
//         .catch(() => ([]));
// }
export const getDisease = async (name = ''): Promise<Disease[]> =>{
    return fetch('http://localhost:8000/diseases/', {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch(() => ([]));
}


// export const getDiseaseDetail = async (id: number): Promise<Disease> => {
//     return fetch('http://localhost:8000/diseases/${id}/', {
//         method: 'GET',
//         }) 
//         .then((response) => response.json())
//         .catch(() => ([]));
// }

