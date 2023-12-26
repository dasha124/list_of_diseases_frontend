import {Link} from "react-router-dom";
import {Disease} from "../../../Types";
import {useContext} from "react";
import {DiseasesContext} from "../DiseaseList";
//import "./SearchResults.css"
import {useSession} from "../../../hooks/useSession";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"
import { Card } from "react-bootstrap";
import {useAuth} from "/home/student/front/list_of_diseases_frontend/src/hooks/useAuth.ts"

import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"
import axios from 'axios';

const SearchResult = ({ disease }: { disease: Disease }) => {
    const {access_token} = useSession()
    const {is_superuser} = useAuth()
    const { setDiseases } = useContext(DiseasesContext)

    // const onDelete = () => {
    //     fetch(`${DOMEN}/diseases/${disease.id}/delete/`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //             'Authorization': access_token
    //         },
    //     })
    //         .then((response) => {
    //             if (response.ok){
    //                 return response.json()
    //             }

    //             throw new Error('Something went wrong');
    //         })
    //         .then((results) => {
    //             setDiseases(results)
    //         })
    //         .catch((error) => {
    //             console.log("Ошибка удаления!\n", error)
    //         });
    // }
    const onDelete = async () => {
        try {
            const response = await axios.delete(`${DOMEN}/diseases/${disease.id}/delete/`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });
    
            if (response.status === 200) {
                setDiseases(response.data);
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.log("Ошибка удаления!n", error);
        }
    };

    const onAdd = () => {
        fetch(`${DOMEN}/diseases/${disease.id}/add_disease_to_drug/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': access_token
          },
          body: JSON.stringify({ diseaseId: disease.id })
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then((results) => {
          // Обновляем список diseases или другую необходимую информацию после успешного добавления
          setDiseases(results);
        })
        .catch((error) => {
          console.log(error);
        });
      }
      


    if (is_superuser){

        return (
            <div className="card" key={disease.id}>
    
                {<Card.Img className="img-card" variant="top" src={"data:image/png;base64," + disease.image} />}
    
                <div className="left-container">
                    <span>{disease.disease_name}</span>
                </div>
    
                <div className="right-container">
    
                    <Link to={`/diseases/${disease.id}`}>
                        <button className="disease-info-button">Подробнее</button>
                    </Link>
    
                    <button className="disease-delete-button" onClick={onDelete}>Удалить</button>
                    
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="card" key={disease.id}>
    
                {<Card.Img className="img-card" variant="top" src={"data:image/png;base64," + disease.image} />}
    
                <div className="left-container">
                    <span>{disease.disease_name}</span>
                </div>
    
                <div className="right-container">
    
                    <Link to={`/diseases/${disease.id}`}>
                        <button className="disease-info-button">Подробнее</button>
                    </Link>
    
                    <button className="disease-delete-button" onClick={onAdd}>Добавить</button>
                    
                </div>
            </div>
        );
            
    }
    
}

export default SearchResult;