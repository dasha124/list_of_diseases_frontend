import {useDispatch, useSelector} from 'react-redux';
import {
    updateDrug
} from "../store/draftDrugSlice";
import axios from "axios";
import {useSession} from "./useSession";
import {Drug} from "../Types";

export function useDraftDrug() {

    const { session_id } = useSession()

    const drug = useSelector((state: { draftDrug: { drug: Drug } }) => state.draftDrug.drug);

    const dispatch = useDispatch()

    const setDrug = (value: any) => {
        dispatch(updateDrug(value))
    }

    const fetchDraftDrug = async () => {

        const response = await axios(`http://127.0.0.1:8000/api/drugs/draft/`, {
            method: "GET",
            headers: {
                "Content-type": "drug/json; charset=UTF-8",
                'authorization': session_id
            },
        })

        if (response.status != 404)
        {
            setDrug(response.data)
        }
    }

    const addDiseaseToDrug = async (disease_id: number) => {
        const response = await axios(`http://127.0.0.1:8000/api/diseases/${disease_id}/post/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })

        if (response.status == 200)
        {
            setDrug(response.data)
        }
    }

    const saveDrug = async () => {
        try {

            await axios(`http://127.0.0.1:8000/api/drugs/${drug.id}/update/`, {
                method: "PUT",
                headers: {
                    "Content-type": "drug/json; charset=UTF-8",
                    'authorization': session_id
                },
                data: drug
            })

        } catch (e) {
            console.log(e)
        }
    }

    const sendDrug = async () => {

        const response = await axios.put(`http://127.0.0.1:8000/api/app_create_status/${drug.id}/put/`,
            {
                status: 2,
            },
            {
                headers: {
                    'authorization': session_id,
                },

            })

        if (response.status == 200)
        {
            setDrug(undefined)
        }
    }

    const deleteDrug = async () => {

        const response = await axios(`http://127.0.0.1:8000/api/drugs/${drug.id}/delete/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            setDrug(undefined)
        }
    }

    const deleteDrugFromDisease = async (disease_id: number) => {
        const response = await axios(`http://127.0.0.1:8000/api/apps_accs/${disease_id}/${drug.id}/delete/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200) {
            setDrug(response.data)
        }
    }

    return {
        drug,
        setDrug,
        addDiseaseToDrug,
        saveDrug,
        sendDrug,
        deleteDrug,
        deleteDrugFromDisease,
        fetchDraftDrug
    };
}