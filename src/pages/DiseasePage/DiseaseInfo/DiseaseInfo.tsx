//import "./DiseaseInfo.css"

import { Card } from "react-bootstrap";
import {Dispatch, useEffect, useState} from "react";
import {Disease} from "../../../Types";
import {requestTime} from "../../../Consts";
// import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
// import {useSession} from "../../../hooks/useSession";
// import {DiseaseDetail} from "../../../modules/get-disease-detail";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"


const DiseaseInfo = ({ disease_id, selectedDisease, setSelectedDisease }:{ disease_id:number | undefined, selectedDisease:Disease| undefined, setSelectedDisease:Dispatch<Disease | undefined> }) => {

    const [arr, setArr] = useState<string[]>();

    // const {access_token} = useSession()
    // const [isMock, setIsMock] = useState<boolean>(true);
    // const [imageUrl, setImageUrl] = useState('');
    // const navigate = useNavigate();

    const fetchData = async () => {

        try {
            const response1 = await fetch(`${DOMEN}/diseases/${disease_id}/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response1.ok){
                //MockDiseaseInfo()
            }

            const disease: Disease = await response1.json()

            setSelectedDisease(disease)

        } catch (e) {

        }

    };
   

    useEffect(() => {
        fetchData()
        if (selectedDisease?.image) {
            return () => {selectedDisease.image};
        }
    }, [selectedDisease?.image])

   
    useEffect(() => {
        const splitArr = selectedDisease?.simptoms.split(",");
        setArr(splitArr);
    }, [selectedDisease?.simptoms]);


    if (!selectedDisease){
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="card-wrapper">
            {/* <BreadCrumbs /> */}
            <Card className="card_serv2">
                {<Card.Img className="img-card2" variant="top" src={"data:image/png;base64," + selectedDisease?.image} />}
                <div>

                    <p className="service-text"> { selectedDisease.disease_name }</p>

                    <p></p>
                    <p className="service-text"> Характерные симптомы:</p>
                
                    <ul>
                        {arr?.map((simptom, index) => (
                            <li className="service-text" key={index}>
                                <li>{simptom}</li>
                            </li>
                        ))}
                    </ul>

                </div>
                
                
            </Card>
            <div className="home-button2">
                    <Link to={`/diseases`}>
                        <button className="disease-back-button">Вернуться к списку заболеваний</button>
                    </Link>
                </div>
            
        </div>


    )
    }



export default  DiseaseInfo;