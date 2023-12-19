//import "./DiseasePage.css"
import DiseaseInfo from "./DiseaseInfo/DiseaseInfo";
import { useParams } from "react-router-dom";
import {Disease} from "../../Types";
import {Dispatch} from "react";

const DiseasePage = ({ selectedDisease, setSelectedDisease }: { selectedDisease:Disease | undefined, setSelectedDisease: Dispatch<Disease | undefined> }) => {
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <DiseaseInfo disease_id={parseInt(id)} selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease} />
    )
}

export default  DiseasePage;