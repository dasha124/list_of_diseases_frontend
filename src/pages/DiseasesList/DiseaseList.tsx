//import "./DiseaseList.css"
import * as React from 'react'
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import {Response} from "../../Types";
import {Disease, DiseasesContextType, iDiseasesContextState} from "../../Types";
import {requestTime, DOMEN} from "../../Consts";
import axios from "axios";
import {useSession} from "../../hooks/useSession";

import "./DiseaseList.css"

export const DiseasesContext = React.createContext<DiseasesContextType>(iDiseasesContextState)

const DiseaseListPage = () => {

    console.log("ewFAARFARFAR")

    const {access_token} = useSession()

    const [diseases, setDiseases] = useState<Disease[]>([]);

    const [query, setQuery] = useState<string>("");

    const searchDiseases = async () => {

        try {

            const response: Response<any> = await axios(`${DOMEN}/diseases/?disease_name=${query}`, {
            
                method: "GET",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `${access_token}`
                },
            });


            if (response.status == 200){
                setDiseases(response.data)
            }

        } catch (e) {
            <div>
                Ошибка
            </div>
        }
    }

    useEffect(() => {
        searchDiseases()
    }, [query])

    return (
        <DiseasesContext.Provider value={{diseases, setDiseases}}>
            
            <div className="diseases-wrapper">

                <div className="filters-container">

                    <div className="top">


                        <SearchBar fetchData={(query) => {
                            setQuery(query)
                        }}/>

                    </div>

                    <div className={"bottom"}>


                    </div>



                </div>

                <div className="container">
                { <SearchResultsList /> }

                </div>
            
            </div>
        </DiseasesContext.Provider>

    );
}

export default DiseaseListPage;