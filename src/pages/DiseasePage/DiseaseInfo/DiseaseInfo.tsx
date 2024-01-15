//import "./DiseaseInfo.css"

import { Card } from "react-bootstrap";
import {Dispatch, useEffect, useState} from "react";
import {Disease} from "../../../Types";
import {requestTime} from "../../../Consts";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useSession} from "../../../hooks/useSession";
import {DiseaseDetail} from "../../../modules/get-disease-detail";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"


const DiseaseInfo = ({ disease_id, selectedDisease, setSelectedDisease }:{ disease_id:number | undefined, selectedDisease:Disease| undefined, setSelectedDisease:Dispatch<Disease | undefined> }) => {

    const [details] = useState<DiseaseDetail>()
    const [arr, setArr] = useState<string[]>();

    const {session_id} = useSession()
    const [isMock, setIsMock] = useState<boolean>(true);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {

        try {
            const response1 = await fetch(`http://localhost:8000/api/diseases/${disease_id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response1.ok){
                //MockDiseaseInfo()
            }

            const disease: Disease = await response1.json()

            setSelectedDisease(disease)
            // console.log(disease)
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

   
    useEffect(() => {
        const splitArr = selectedDisease?.simptoms.split(",");
        setArr(splitArr);
    }, [details]);
    console.log("details.simptoms =",arr)


    if (!selectedDisease){
        return (
            <div>

            </div>
        )
    }


    return (
        <div>
            {/* <BreadCrumbs /> */}
            <Card className="card_serv2">
                {<Card.Img className="img-card2" variant="top" src={"data:image/png;base64," + details?.image} />}
                <div>

                    <p className="service-text"> { selectedDisease.disease_name }</p>

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
                <div className="home-button">
                    <Link to={`/diseases`}>
                        <button className="disease-back-button">Вернуться к списку заболеваний</button>
                    </Link>
                </div>
                
            </Card>
            
        </div>


    )
    }



export default  DiseaseInfo;
