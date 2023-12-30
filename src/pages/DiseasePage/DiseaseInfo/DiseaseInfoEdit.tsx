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
import {useAuth} from "/home/student/front/list_of_diseases_frontend/src/hooks/useAuth.ts"
import {useSession} from "../../../hooks/useSession";

import axios from 'axios';



const DiseaseInfoEdit = ({ disease_id, selectedDisease, setSelectedDisease }:
    { disease_id:number | undefined, selectedDisease:Disease| undefined, setSelectedDisease:Dispatch<Disease | undefined> }) => {

    const [arr, setArr] = useState<string[]>();
    const {access_token} = useSession()
    const {is_superuser, is_authenticated} = useAuth()

    // const {access_token} = useSession()
    // const [isMock, setIsMock] = useState<boolean>(true);
    // const [imageUrl, setImageUrl] = useState('');
    // const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response1 = await axios.get(`${DOMEN}/diseases/${disease_id}/`, {
                method: "GET"
            });
            const disease = response1.data;
            setSelectedDisease(disease);
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


    // Новые данные
    const [formData, setFormData] = useState({
        disease_name: "",
        general_info: "",
        simptoms: "",
        // image: new Blob([""], { type: "image/jpeg" }),
        status: true
    });

    const setInitialFormData = (object: any) => {
        if (object) {
            setFormData({
                disease_name: object.disease_name || "",
                general_info: object.general_info || "",
                simptoms: object.simptoms || "",
                // image: object.image
                //     ? new Blob([object.image], { type: "image/jpeg" })
                //     : new Blob([""], { type: "image/jpeg" }),
                status: object.status || true
            });
        }
    };

    
    // Ваш компонент
    useEffect(() => {
        // Вызываем функцию для установки начальных значений при изменении selectedGeographicalObject
        setInitialFormData(selectedDisease);
    }, [selectedDisease]);

    const handleChange = (field: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: field === 'size' ? parseFloat(value) : value,
        }));
    };

    useEffect(() => {
        if (formData.disease_name !== "" && formData.general_info !== ""  && formData.simptoms !== "") {
            // editDisease();
        }
    }, [])



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
            {is_authenticated ? (
                <Link to="/diseases">
                <button className="disease-back-button">Вернуться к списку заболеваний</button>
                </Link>
            ) :
            <Link to="/diseases">
                <button className="disease-back-button2">Вернуться к списку заболеваний</button>
                </Link> 
            }
            </div>
            
        </div>


    )
    }



export default  DiseaseInfoEdit;