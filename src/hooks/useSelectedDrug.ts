import {useDispatch, useSelector} from 'react-redux';
import {updateDrug} from "../store/selectedDrugSlice";

export function useSelectedDrug() {
    const drug = useSelector((state: any) => state.selectedDrug.drug);

    const dispatch = useDispatch()

    const setDrug = (value: any) => {
        dispatch(updateDrug(value))
    }

    return {
        drug,
        setDrug
    };
}