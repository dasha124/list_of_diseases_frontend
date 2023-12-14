import { FC, useState, useEffect} from 'react'
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"
import {useParams} from "react-router-dom";
import { DiseaseDetail, getDiseaseDetail} from "../modules/get-disease-detail";
import BreadCrumbs from "../components/BreadСrumbs";
import { Card } from 'react-bootstrap';




const DiseaseCard: FC = () => {

    const [details, setDetails] = useState<DiseaseDetail>()
    const [arr, setArr] = useState<string[]>();
    const {id} = useParams<{id: string}>()

    const handlerGetDetail = async () => {
    if (id) {
        const data = await getDiseaseDetail(parseInt(id, 10));
        setDetails(data);
        }
    }
    useEffect(() => {
        handlerGetDetail();
      }, [id]);


    useEffect(() => {
        const splitArr = details?.simptoms.split(",");
        setArr(splitArr);
    }, [details]);
    console.log("details.simptoms =",arr)

    
    return (
        <div>
            <BreadCrumbs />
            <Card className="card_serv">
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
export default DiseaseCard;