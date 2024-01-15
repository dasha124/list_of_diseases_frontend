import "./DrugInfo.css"
import {Dispatch, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Drug} from "../../../Types";
import {requestTime, STATUSES, DOMEN} from "../../../Consts";
// import {requestTime} from "../../../Consts";
import {Link} from "react-router-dom";
// import { useState } from "react";
import { Disease } from "../../../Types";
import SearchResult from "../../DiseasesList/SearchResult/SearchResults";
import {useAuth} from "../../../hooks/useAuth";
import {useDraftDrug} from "../../../hooks/useDraftDrug";


const DrugInfo = ({ drug_id, selectedDrug, setSelectedDrug }:{ drug_id:number | undefined, selectedDrug:Drug| undefined, setSelectedDrug:Dispatch<Drug | undefined> }) => {

    const navigate = useNavigate()

    const getStatusName = (status: number | string): string => {
        const id = Number(status);
        const statusOption = STATUSES.find((option) => option.id === id);
      
        return statusOption ? statusOption.name : '';
      };
    const { is_superuser} = useAuth()
    const { ApproveDrug, DisApproveDrug} = useDraftDrug()
      

    const fetchData = async () => {

        try {
            const response1 = await fetch(`${DOMEN}/drugs/${drug_id}/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response1.ok) {
            }

            const drug: Drug = await response1.json()
            setSelectedDrug(drug)

        } catch (e) {
        }
    };

    useEffect(() => {
        fetchData()
    }, [drug_id]);
    // }, []);


    const setOk = async () => {
        await ApproveDrug(selectedDrug?.id!)
        navigate("/drugs")
    }

    
    const setNotOk = async () => {
        await DisApproveDrug(selectedDrug?.id!)
        navigate("/drugs")
    }


    if (!selectedDrug) {
        return (
            <div>

            </div>
        )
    }

    const selectedDrugStatus = getStatusName(selectedDrug?.status);



    if(is_superuser){
        if (selectedDrugStatus === "Сформирована"){
            return (
                <div className="drug-info-background">
                    <div className={"drug-info-wrapper"}>
        
                        <div className="drug-info-details">
                            <div className="drug-info-details">
                                <div className="header-name">
                                    <div className="header-text"> Заявка № {selectedDrug.id}</div>
                                </div>
                                <div className="header-name">
                                    <div className="header-text">Статус заявки: {getStatusName(selectedDrug?.status)}</div>
                                    
                                </div>
        
                            </div>
        
                            <div className="drug-info-additional">
    
                            <div className="container">
                    {selectedDrug.disease && selectedDrug.disease.map((disease: Disease, index) => (
                        <div className="item" key={index}>
                        <SearchResult disease={disease} />
                        </div>
                    ))}
                    </div>
                                <div className="buttons-info">
                                    <div className="home-button">
                                        <Link to={`/drugs/`}>
                                            <button className="drug-back-button">Вернуться к заявкам</button>
                                        </Link>
                                        <button className="drug-back-button_ok" onClick={setOk}>Одобрить</button>
                                        <button className="drug-back-button_ne_ok" onClick={setNotOk}>Отклонить</button>
                                    </div>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>
            );

        }
        return (
            <div className="drug-info-background">
                <div className={"drug-info-wrapper"}>
    
                    <div className="drug-info-details">
                        <div className="drug-info-details">
                            <div className="header-name">
                                <div className="header-text"> Заявка № {selectedDrug.id}</div>
                            </div>
                            <div className="header-name">
                                <div className="header-text">Статус заявки: {getStatusName(selectedDrug?.status)}</div>
                                
                            </div>
    
                        </div>

                        <div className="drug-info-additional">

                        <div className="container">
                    {selectedDrug.disease && selectedDrug.disease.map((disease: Disease, index) => (
                        <div className="item" key={index}>
                        <SearchResult disease={disease} />
                        </div>
                    ))}
                    </div>
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