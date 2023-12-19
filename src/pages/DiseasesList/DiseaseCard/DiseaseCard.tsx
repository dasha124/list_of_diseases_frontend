import {Dispatch} from "react";
import {Link} from "react-router-dom";
import {Disease} from "../../../Types";
import {motion} from "framer-motion"
import {DOMEN, requestTime} from "../../../Consts";
//import "./DiseaseCard.css"
import GeneralButton from "../../../components/GeneralButton/GeneralButton";
import axios from "axios";
import {diseaseAddedMessage, diseaseAlreadyAddedMessage, requestErrorMessage} from "../../../Toasts/Toasts";
import {useAuth} from "../../../hooks/useAuth";
import {useSession} from "../../../hooks/useSession";
import {useDraftDrug} from "../../../hooks/useDraftDrug";
import { AxiosResponse } from 'axios';

const DiseaseCard = ({ disease, setDiseases }: { disease: Disease, setDiseases: Dispatch<Disease[]> }) => {

    const {session_id} = useSession()

    const {is_authenticated} = useAuth()

    const {setDrug} = useDraftDrug()

    interface CustomError extends Error {
        response?: {
            status?: number;
        };
    }

    const addToDrug = async () => {

        try {
            const response: AxiosResponse = await axios(`${DOMEN}/diseases/${disease.id}/add_disease_to_drug/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': session_id
                },
            });

            if (response.status === 200) {
                diseaseAddedMessage(disease.disease_name, response.data["id"])
                setDrug(response.data)
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                const customError = e as CustomError;
                if (customError.response !== undefined && 'status' in customError.response && customError.response.status === 409) {
                    diseaseAlreadyAddedMessage();
                } else {
                    requestErrorMessage()
                }
            }
        }
    }


    const onDelete = async () => {

        try {
            const response = await fetch(`${DOMEN}/diseases/${disease.id}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
            });

            if (!response.ok){
                <div>
                    Ошибка
                </div>
            }

            const diseases: Disease[] = await response.json()

            setDiseases(diseases)

        } catch (e) {
            <div>
                Ошибка
            </div>
        }
    }

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{scale: 1.1}}
            className="disease"
            key={disease.id}>

            <div className="top-container">
            </div>

            <div className="center-container">

                <span className="disease-name">{disease.disease_name}</span>

            </div>

            <div className="bottom-container">

                <Link to={`/diseases/${disease.id}`}>
                    <button className="disease-info-button">Открыть</button>
                </Link>

                {is_authenticated && <GeneralButton text="Выбрать" onClick={addToDrug} /> }

                <button className="disease-delete-button" onClick={onDelete}>Удалить</button>

            </div>

        </motion.div>

    );
}

export default DiseaseCard;