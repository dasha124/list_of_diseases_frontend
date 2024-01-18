//import "./DiseasePage.css"
import DiseaseInfoEdit from "./DiseaseInfo/DiseaseInfoEdit";
import { useParams } from "react-router-dom";
import {Disease} from "../../Types";
import {Dispatch} from "react";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"

const DiseasePageEdit = ({ selectedDisease, setSelectedDisease }: { selectedDisease:Disease | undefined, setSelectedDisease: Dispatch<Disease | undefined> }) => {
    
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <DiseaseInfoEdit selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease} />
        )
    }

    return (
        <DiseaseInfoEdit disease_id={parseInt(id)} selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease} />
    )
}

export default  DiseasePageEdit;