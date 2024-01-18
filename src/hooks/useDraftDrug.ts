import {useDispatch, useSelector} from 'react-redux';
import {updateDrug} from "../store/draftDrugSlice";
import axios from "axios";
import {useSession} from "./useSession";
import {Drug} from "../Types";
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"


export function useDraftDrug() {

    const { access_token } = useSession()

    const drug = useSelector((state: { draftDrug: { drug: Drug } }) => state.draftDrug.drug);

    const dispatch = useDispatch()

    const setDrug = (value: any) => {
        dispatch(updateDrug(value))
    }

    const fetchDraftDrug = async () => {

        const response = await axios(`${DOMEN}/drugs/${drug.id}/`, {
            method: "GET",
            headers: {
                "Content-type": "drug/json; charset=UTF-8",
                'authorization': access_token
            },
        })

        if (response.status != 404)
        {
            setDrug(response.data)
        }
    }

    const addDiseaseToDrug = async (disease_id: number) => {
        const response = await axios(`${DOMEN}/diseases/${disease_id}/post/`, {
            method: "POST",
            headers: {
                'authorization': access_token
            },
        })

        if (response.status == 200)
        {
            setDrug(response.data)
        }
    }

    const saveDrug = async () => {
        try {

            await axios(`${DOMEN}/drugs/${drug.id}/update/`, {
                method: "PUT",
                headers: {
                    "Content-type": "drug/json; charset=UTF-8",
                    'authorization': access_token
                },
                data: drug
            })

        } catch (e) {
            console.log(e)
        }
    }

    const sendDrug = async (id: number) => {

        const response = await axios.put(`${DOMEN}/drugs/${id}/update_st_user/`,
            {
                status: 1,
            },
            {
                headers: {
                    'authorization': access_token,
                },

            })

        if (response.status == 200)
        {
            setDrug(undefined)
        }
    }

    

    const deleteDrug_e = async () => {
            const response = await axios.delete(`${DOMEN}/drugs/delete_entered_drug/`,{
                headers: {
                    "Content-type": "drug/json; charset=UTF-8",
                    'authorization': access_token
                },
            })
            if (response.status == 200)
            {
                setDrug(undefined)
            }
    }


    
    const ApproveDrug = async (id: number) => {
        const response = await axios.put(`${DOMEN}/drugs/${id}/update_st_admin/`,
            {
                status: 2,
            },
            {
                headers: {
                    'authorization': access_token,
                },

            })

            if (response.status == 200)
            {
                setDrug(response.data)
            }
    }

    const DisApproveDrug = async (id: number) => {
        const response = await axios.put(`${DOMEN}/drugs/${id}/update_st_admin/`,
            {
                status: 3,
            },
            {
                headers: {
                    'authorization': access_token,
                },

            })

            if (response.status == 200)
            {
                setDrug(response.data)
            }
    }


    
    const deleteDiseaseFromDrug = async (disease_id: number, id: number) => {
        const response = await axios(`${DOMEN}/drugs/${disease_id}/${id}/delete_disease_from_drug/`, {
            method: "DELETE",
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setDrug(response.data)
        }
    }

    

    



    // const deleteDrugFromDisease = async (disease_id: number) => {
    //     const response = await axios(`${DOMEN}/apps_accs/${disease_id}/${drug.id}/delete/`, {
    //         method: "DELETE",
    //         headers: {
    //             'authorization': access_token
    //         }
    //     })

    //     if (response.status == 200) {
    //         setDrug(response.data)
    //     }
    // }

    return {
        drug,
        setDrug,
        addDiseaseToDrug,
        saveDrug,
        sendDrug,
        deleteDiseaseFromDrug,
        fetchDraftDrug,

        ApproveDrug,
        DisApproveDrug,
        deleteDrug_e,
        

    };
}