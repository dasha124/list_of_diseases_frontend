//import "./DiseaseList.css"
import * as React from 'react'
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import {Response} from "../../Types";
import {Disease, DiseasesContextType, iDiseasesContextState} from "../../Types";
import {requestTime} from "../../Consts";
import axios from "axios";
import {useSession} from "../../hooks/useSession";

export const DiseasesContext = React.createContext<DiseasesContextType>(iDiseasesContextState)

const DiseaseListPage = () => {

    const {session_id} = useSession()

    const [diseases, setDiseases] = useState<Disease[]>([]);

    const [query, setQuery] = useState<string>("");

    const searchDiseases = async () => {

        try {

            const response: Response<any> = await axios(`http://localhost:8000/api/diseases/?disease_name=${query}`, {
            
                method: "GET",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': session_id
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
                { <SearchResultsList /> }

                {/* <div className="bottom">
                    <div className="disease-list-wrapper">

                        <div className="top-wrapper">

                        </div>

                        <div className="center-wrapper">

                            { <SearchResultsList /> }

                        </div>

                        <div className="bottom-wrapper">

                        </div>

                    </div>
                </div> */}

            </div>
        </DiseasesContext.Provider>

    );
}

export default DiseaseListPage;