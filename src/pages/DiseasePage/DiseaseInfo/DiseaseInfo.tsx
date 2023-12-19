//import "./DiseaseInfo.css"
import { Card } from "react-bootstrap";
import {Dispatch, useEffect, useState} from "react";
import {Disease} from "../../../Types";
import {requestTime} from "../../../Consts";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useSession} from "../../../hooks/useSession";
import BreadCrumbs from '/home/student/front/list_of_diseases_frontend/src/components/BreadCrumbs/BreadСrumbs.tsx'
import {DiseaseDetail} from "../../../modules/get-disease-detail";
const DiseaseInfo = ({ disease_id, selectedDisease, setSelectedDisease }:{ disease_id:number | undefined, selectedDisease:Disease| undefined, setSelectedDisease:Dispatch<Disease | undefined> }) => {

    const [details] = useState<DiseaseDetail>()
    const [arr] = useState<string[]>();

    const {session_id} = useSession()
    const [isMock, setIsMock] = useState<boolean>(true);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {

        try {
            const response1 = await fetch(`http://127.0.0.1:8000/diseases/${disease_id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response1.ok){
                //MockDiseaseInfo()
            }

            const disease: Disease = await response1.json()

            setSelectedDisease(disease)
            setIsMock(false)

        } catch (e) {

            //MockDiseaseInfo()

        }

    };
    const onDelete = () => {
        if (selectedDisease) {
            fetch(`http://127.0.0.1:8000/api/diseases/${selectedDisease.id}/delete/`, {
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
                .then(() => {
                    navigate('/diseases');
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    // const MockDiseaseInfo = () => {
    //     const selectedDisease = iDiseasesMock.find((disease: Disease) => disease.id === disease_id);
    //
    //     if (selectedDisease !== undefined && 'id' in selectedDisease) {
    //         setSelectedDisease(selectedDisease);
    //     } else {
    //         // Обработка случая, когда ничего не найдено
    //         console.error(`Disease with id ${disease_id} not found.`);
    //     }
    //     setIsMock(true)
    // }


    useEffect(() => {
        fetchData()
        if (selectedDisease?.image) {
            const binaryData = selectedDisease.image;
            const url = URL.createObjectURL(new Blob([binaryData]));
            setImageUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [selectedDisease?.image]);


    if (!selectedDisease){
        return (
            <div>

            </div>
        )
    }

    if (isMock){

        return (
            <div className={"disease-info-wrapper"}>
                <div className="disease-info-details">
                    <h3>{selectedDisease.disease_name}</h3>
                    <img src={imageUrl} alt="Disease Icon" />
                    <span>Баланс: 0</span>
                    <span>Номер счета: номер Вашего счета</span>
                    <span>БИК банка: INK</span>
                    <span>Валюта: руб</span>
                    <span>Тип счета: карта</span>
                    <div className="buttons-info">
                        <button className="disease-delete-button-info" onClick={onDelete}>Заморозить</button>
                        <div className="home-button">
                            <Link to={`/diseases`}>
                                <button className="disease-back-button">Вернуться к счетам</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <BreadCrumbs />
            <Card className="card_serv2">
                {<Card.Img className="img-card2" variant="top" src={"data:image/png;base64," + details?.image} />}
                <div>

                    <p className="service-text"> { details?.disease_name }</p>

                    <p></p>
                    <p className="service-text"> Характерные симптомы:</p>
                    <p></p>

                    <ul>
                        {arr?.map((simptom, index) => (
                            <li className="service-text" key={index}>
                                <li>{simptom}</li>
                            </li>
                        ))}
                    </ul>

                </div>
            </Card>
        </div>


    )
    }



export default  DiseaseInfo;