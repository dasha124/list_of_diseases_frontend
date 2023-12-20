import SearchResult from "../SearchResult/SearchResults";
import {useContext} from "react";
import {DiseasesContext} from "../DiseaseList";
//import "./SearchResultsList.css";
import {Disease} from "../../../Types";
import { Row, Col } from "react-bootstrap";

const SearchResultsList = () => {

    const { diseases } = useContext(DiseasesContext)

    return (

        <Row xs={4} md={4} className="g-4">
        {diseases.map((disease: Disease, index) => (
            <Col key={index}>
            <SearchResult disease={disease} />
            </Col>
        ))}
        </Row>
        

        // <div>
        //     {diseases.map((disease: Disease) => (
        //         <SearchResult disease={disease} key={disease.disease_name} />
        //     ))}
        // </div>

        // <Row xs={4} md={4} className="g-4">
        // {disease.map((item, index)=> (
        //     <Col key={index}>
        //         <DiseaseItem {...item} />
        //     </Col>
        // ))}
        // </Row>
    );
}

export default SearchResultsList;