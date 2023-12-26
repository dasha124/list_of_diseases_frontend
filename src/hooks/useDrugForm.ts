import {useDispatch, useSelector} from 'react-redux';
import {setOpen} from "../store/drugFormSlice";

export function useDrugForm() {
    const isOpen = useSelector((state: any) => state.drugForm.isOpen);

    const dispatch = useDispatch()

    const openForm = () => {
        dispatch(setOpen(true))
    }

    const closeForm = () => {
        dispatch(setOpen(false))
    }

    return {
        isOpen,
        openForm,
        closeForm
    };
}