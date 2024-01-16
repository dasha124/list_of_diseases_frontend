//import "./DrugInfo.css"
import {Dispatch, useEffect} from "react";
import {Drug} from "../../../Types";
import {requestTime, STATUSES} from "../../../Consts";
import {Link} from "react-router-dom";
import axios from 'axios';
import SearchResult from "../../DiseasesList/SearchResult/SearchResults";
const DrugInfo = ({ drug_id, selectedDrug, setSelectedDrug }:{ drug_id:number | undefined, selectedDrug:Drug| undefined, setSelectedDrug:Dispatch<Drug | undefined> }) => {

    const getStatusName = (statusId: string | undefined): string => {
        const foundStatus = STATUSES.find((status) => status.id === statusId);
        return foundStatus ? foundStatus.name : "Неизвестный статус";
    };

    const fetchData = async () => {

        try {
        const response1 = await axios.get<Drug>(`${DOMEN}/drugs/${drug_id}/`, {
            timeout: requestTime
        });

        setSelectedDrug(response1.data);
        } catch (error) {
    }

    };

    useEffect(() => {
        fetchData()
    }, []);


    if (!selectedDrug) {
        return (
            <div>

            </div>
        )
    }
    return (
        <div className="drug-info-background">
            <div className={"drug-info-wrapper"}>

                <div className="drug-info-details">
                    <div className="drug-info-details">
                        <div className="header-name">
                            <div> Заявка № {selectedDrug.id}: {selectedDrug.drug_name}</div>
                        </div>
                        <div className="header-name">
                            <div>Статус заявки: {getStatusName(selectedDrug?.status)}</div>
                        </div>

                    </div>

                    <div className="container">
                    {selectedDrug.disease && selectedDrug.disease.map((disease: Disease, index) => (
                        <div className="item" key={index}>
                        <SearchResult disease={disease} />
                        </div>
                    ))}
                    </div>
                    <div className="drug-info-additional">
                        <div className="buttons-info">
                            <div className="home-button">
                                <Link to={`/drugs/`}>
                                    <button className="drug-back-button">Вернуться к заявкам</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default  DrugInfo;
