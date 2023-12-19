import SearchResult from "../SearchResult/SearchResults";
import {useContext} from "react";
import {DiseasesContext} from "../DiseaseList";
//import "./SearchResultsList.css";
import {Disease} from "../../../Types";

const SearchResultsList = () => {

    const { diseases } = useContext(DiseasesContext)

    return (
        <div>
            {diseases.map((disease: Disease) => (
                <SearchResult disease={disease} key={disease.disease_name} />
            ))}
        </div>
    );
}

export default SearchResultsList;