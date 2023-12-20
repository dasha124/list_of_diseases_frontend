
import {Link} from "react-router-dom";
import {Disease} from "../../../Types";
import {useContext} from "react";
import {DiseasesContext} from "../DiseaseList";
//import "./SearchResults.css"
import {useSession} from "../../../hooks/useSession";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"
import { Card } from "react-bootstrap";

const SearchResult = ({ disease }: { disease: Disease }) => {
    const {session_id} = useSession()
    const { setDiseases } = useContext(DiseasesContext)

    const onDelete = () => {
        fetch(`http://127.0.0.1:8000/diseases/${disease.id}/delete/`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': session_id
            },
        })
            .then((response) => {
                if (response.ok){
                    return response.json()
                }

                throw new Error('Something went wrong');
            })
            .then((results) => {
                setDiseases(results)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className="card" key={disease.id}>

            {<Card.Img className="img-card" variant="top" src={"data:image/png;base64," + disease.image} />}

            <div className="left-container">
                <span className="disease-name">{disease.disease_name}</span>
            </div>

            <div className="right-container">

                <Link to={`/diseases/${disease.id}`}>
                    <button className="disease-info-button">Открыть</button>
                </Link>

                <button className="disease-delete-button" onClick={onDelete}>Удалить</button>


            </div>
        </div>
        

    );
}

export default SearchResult;