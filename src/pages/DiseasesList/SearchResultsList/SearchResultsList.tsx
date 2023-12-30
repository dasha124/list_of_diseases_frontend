import SearchResult from "../SearchResult/SearchResults";
import {useContext} from "react";
import {DiseasesContext} from "../DiseaseList";
//import "./SearchResultsList.css";
import {Disease} from "../../../Types";
import {useAuth} from "/home/student/front/list_of_diseases_frontend/src/hooks/useAuth.ts"
import {useSession} from "../../../hooks/useSession";
import { Link } from "react-router-dom";
import "/home/student/front/list_of_diseases_frontend/src/pages/DrugsList/Table/Table.css"
import { Card } from "react-bootstrap";
import DiseaseCardAdd from "../../DiseasePage/DiseaseInfo/DiseaseCardAdd/DiseaseCardAdd_1";


const SearchResultsList = () => {

    const { diseases } = useContext(DiseasesContext)

    const {access_token} = useSession()
    const {is_superuser, is_authenticated} = useAuth()

    const update = (diseaseId: number) => {
      return diseaseId
  };


    
   



    if (is_superuser){
      return (
          <div className="table-wrapper">
              <div className="table-container">
                  <div className="row_">
                      <div className="column1">№</div>
                      <div className="column">Название заболевания</div>
                      <div className="column4_0">Общая информация</div>
                      <div className="column4_0">Симптомы</div>
                      <div className="column">Статус</div>
                      <div className="column">Действие</div>
                     
                  </div>  
                  {diseases.map((disease: Disease) => (
                      <div className="row" key={disease.id}>
  
                        <div className="column1"> 
                          <Link className="link" to={`/diseases/${disease.id}/`}>{disease.id}</Link>
                        </div>
  
  
                        <div className="column">
                          <div>{disease.disease_name}</div>
                          <div>
                            {<Card.Img className="cardImage" variant="top" src={"data:image/png;base64," + disease.image} height={100} width={100} />}
                          </div>
                        </div>

                        <div className="column4">{disease.general_info}</div>

                        <div className="column4">
                          {disease.simptoms.split(',').map((info, index) => (
                            <span key={index}>
                              {info}
                              {index !== disease.simptoms.split(',').length - 1 ? ',' : ''}
                              <br />
                            </span>
                          ))}
                        </div>

                        <div className="column">
                          <div>{disease.status === "a" ? "Активен" : disease.status === "d" ? "Удален" : (disease.status)}</div>
                        </div>

                        <Link to={`/diseases/${disease.id}/update/`}>
                        <button className="disease-update" >Редактировать</button>
                        <button className="disease-update" >Удалить</button>
                        </Link>

                    
                          
                      </div>
                  ))}
              </div>
  
  
          </div>
      );
      
  }

   else{
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
}

export default SearchResultsList;