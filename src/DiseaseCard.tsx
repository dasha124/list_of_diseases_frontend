import { FC, useState, useEffect} from 'react'
import "/home/student/front/start_for_gp/list_of_diseases_frontend/src/components/ds.css"
import {useNavigate, useParams} from "react-router-dom";
import { DiseaseDetail, getDiseaseDetail} from "./modules/get-disease-detail";

import { Button, Card } from 'react-bootstrap';
import BreadCrumbs from './components/BreadСrumbs';





const DiseaseCard: FC = () => {

    const [details, setDetails] = useState<DiseaseDetail>()
    const [arr, setArr] = useState<string[]>();
    const {id} = useParams<{id: string}>()

    const navigate = useNavigate();
    

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
            <div className="card-wrapper">
               
                <Card className="card_serv2">
                   
                    <div>
                    {<Card.Img className="img-card2" variant="top" src={"data:image/png;base64," + details?.image} />}
                    <p></p>
                        <p className="service-text1"> Название заболевания:  { details?.disease_name }</p>

                        <p></p>

                      
                        <p className="service-text1" > Характерные симптомы: { details?.simptoms}</p>
                    
                        {/* <ul>
                            {arr?.map((simptom, index) => (
                                <li className="service-text" key={index}>
                                    <li>{simptom}</li>
                                </li>
                            ))}
                        </ul> */}
                        <p></p>
                        <Button className="disease-back-button3" onClick={()=>navigate(`/list_of_diseases_frontend/`)} >Вернуться к списку заболеваний</Button>

                    </div>

                    {/* <Button className="disease-back-button3" onClick={()=>navigate(`/list_of_diseases_frontend/`)} >Вернуться к списку заболеваний</Button> */}
                    
                    
                </Card>
          
                
           
            
            
        </div>
        </div>
        
        
    )
}
export default DiseaseCard;