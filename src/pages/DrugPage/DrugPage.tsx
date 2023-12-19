import DrugInfo from "./DrugInfo/DrugInfo";
import { useParams } from "react-router-dom";
import {Drug} from "../../Types";
import {Dispatch} from "react";

const DrugPage = ({ selectedDrug, setSelectedDrug }: { selectedDrug:Drug | undefined, setSelectedDrug: Dispatch<Drug | undefined> }) => {
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <DrugInfo drug_id={parseInt(id)} selectedDrug={selectedDrug} setSelectedDrug={setSelectedDrug} />
    )
}

export default  DrugPage;