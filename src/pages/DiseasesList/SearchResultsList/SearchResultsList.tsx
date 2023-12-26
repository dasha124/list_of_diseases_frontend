import SearchResult from "../SearchResult/SearchResults";
import {useContext} from "react";
import {DiseasesContext} from "../DiseaseList";
//import "./SearchResultsList.css";
import {Disease} from "../../../Types";
// import { Row, Col } from "react-bootstrap";
// import { Grid, Container } from '@mui/material';

const SearchResultsList = () => {

    const { diseases } = useContext(DiseasesContext)

    return (

    <div className="container">
      {diseases.map((disease: Disease, index) => (
        <div className="item" key={index}>
          <SearchResult disease={disease} />
        </div>
      ))}
    </div>

    );
}

export default SearchResultsList;