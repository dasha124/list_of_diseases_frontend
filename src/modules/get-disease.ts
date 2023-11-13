export interface Disease{
    image: string
    disease_name: string
    sphere_name: string
    disease_id: number
}

export interface DiseasesResult {
    resultCount: number
    results: Disease[]
}

export const getDisease = async (name = ''): Promise<Disease[]> =>{

    return fetch(`/api/diseases/?disease_name=${encodeURIComponent(name)}`, {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch(() => ([]));

}

