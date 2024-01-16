import { FC, useState, useEffect} from 'react'
import "/home/student/front/start_for_gp/list_of_diseases_frontend/src/components/ds.css"
import {useParams} from "react-router-dom";
import { DiseaseDetail, getDiseaseDetail} from "./modules/get-disease-detail";
import BreadCrumbs from "./components/BreadСrumbs";
import { Card } from 'react-bootstrap';
import {Link} from "react-router-dom";




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
            <div className="card-wrapper">
                {/* <BreadCrumbs /> */}
                <Card className="card_serv2">
                    {<Card.Img className="img-card2" variant="top" src={"data:image/png;base64," + details?.image} />}
                    <div>

                        <p className="service-text"> Название заболевания:  { details?.disease_name }</p>

                        <p></p>

                        <p className="service-text"> Общая информация:  { details?.gen_info }</p>
                        <p></p>
                        <p className="service-text" > Характерные симптомы:</p>
                    
                        <ul>
                            {arr?.map((simptom, index) => (
                                <li className="service-text" key={index}>
                                    <li>{simptom}</li>
                                </li>
                            ))}
                        </ul>

                    </div>
                    
                    
                </Card>
                <Link to="/diseases">
                <button className="disease-back-button2">Вернуться к списку заболеваний</button>
            </Link> 
           
            
            
        </div>
        </div>
        
        
    )
}
export default DiseaseCard;