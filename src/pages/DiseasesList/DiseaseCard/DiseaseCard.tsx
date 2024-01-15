
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"
import {Dispatch} from "react";
import {Link} from "react-router-dom";
import {Disease} from "../../../Types";
import {motion} from "framer-motion"
import {useDraftDrug} from "../../../hooks/useDraftDrug";
import { Card } from "react-bootstrap";


const DiseaseCard = ({ disease }: { disease: Disease, setDiseases: Dispatch<Disease[]> }) => {



    const {drug, deleteDiseaseFromDrug } = useDraftDrug()

    const onDelete1 = (diseaseId: number) => {
        deleteDiseaseFromDrug(diseaseId, drug.id)
    };
      

    

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1, marginLeft: '20px' }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{scale: 1.1}}
            className="disease"
            key={disease.id}>

            
            <div className="center-container">
                <div className="card_pos">
                    {<Card.Img className="cardImage" variant="top" src={"data:image/png;base64," + disease.image}  />}
                </div>

                <span className="service-text">{disease.disease_name}</span>
                <div className="bottom-container">

                <Link to={`/diseases/${disease.id}`}>
                    <button className="disease-info-button">Открыть</button>
                </Link>

                

                <button className="disease-delete-button" onClick={() => onDelete1(Number(disease.id))}>Удалить</button>

                </div>

            </div>

        </motion.div>

    );
}

export default DiseaseCard;