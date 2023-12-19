//import "./DrugPage.css"
import {useNavigate} from "react-router-dom";
import {useDraftDrug} from "../../hooks/useDraftDrug";
import DiseaseCard from "../../pages/DiseasesList/DiseaseCard/DiseaseCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {Disease} from "../../Types";

const DraftDrugPage = () => {
    const navigate = useNavigate()
    const [,setDiseases] = useState<Disease[]>(/* initial value */);
    const {is_authenticated, is_superuser} = useAuth()

    const {drug, sendDrug, deleteDrug} = useDraftDrug()

    useEffect(() => {
        if (!is_authenticated || is_superuser) {
            navigate("/diseases")
        }
    }, [])

    if (!is_authenticated || is_superuser){
        return
    }

    if (drug == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const cards = drug.diseases?.map((disease:Disease) => (
        <DiseaseCard disease={disease} key={disease.id} setDiseases={setDiseases} />
    ));


    const handleAdd = async () => {
        await sendDrug()
        navigate("/drugs")
    }

    const handleDelete = async () => {
        await deleteDrug()
        navigate("/diseases")
    }

    return (
        <div className="drug-page-wrapper">

            <div className="drug-draft-wrapper">
                <div className="top">
                    <h3>Заявка</h3>
                </div>

                <div className="bottom">
                    {cards}
                </div>
            </div>

            <div className="draft-buttons-wrapper">

                <button className="draft-button" onClick={handleAdd}>Отправить</button>

                <button className="draft-button" onClick={handleDelete}>Удалить</button>

            </div>


        </div>
    )
}

export default DraftDrugPage