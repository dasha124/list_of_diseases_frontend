//import "./DrugInfo.css"
import {Dispatch, useEffect} from "react";
import {Drug} from "../../../Types";
import {requestTime, STATUSES} from "../../../Consts";
import {Link} from "react-router-dom";
const DrugInfo = ({ drug_id, selectedDrug, setSelectedDrug }:{ drug_id:number | undefined, selectedDrug:Drug| undefined, setSelectedDrug:Dispatch<Drug | undefined> }) => {

    const getStatusName = (statusId: string | undefined): string => {
        const foundStatus = STATUSES.find((status) => status.id === statusId);
        return foundStatus ? foundStatus.name : "Неизвестный статус";
    };

    const fetchData = async () => {

        try {
            const response1 = await fetch(`http://127.0.0.1:8000/drugs/${drug_id}`, {
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
                            <h3> Заявка № {selectedDrug.id}</h3>
                        </div>
                        <div className="header-name">
                            <h3>Статус заявки: {getStatusName(selectedDrug?.status)}</h3>
                        </div>

                    </div>
                    <div className="drug-info-additional">
                        <table>
                            <thead>
                            <tr>
                                <th>Тип счета</th>
                                <th>Название</th>
                                <th>Номер счета</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedDrug.diseases && selectedDrug.diseases.map(disease => (
                                <tr key={disease.id}>
                                    <td>{disease.type}</td>
                                    <td>{disease.disease_name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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