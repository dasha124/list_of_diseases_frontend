import {useDispatch, useSelector} from 'react-redux';
import {pageChanged, pageSizeChanged, totalCountChanged} from "../store/drugsSlice";
import React from "react";

export function useDrugs() {
    const queryPageIndex = useSelector((state: any) => state.drugs.queryPageIndex);
    const queryPageSize = useSelector((state: any) => state.drugs.queryPageSize);
    const totalCount = useSelector((state: any) => state.drugs.totalCount);

    const dispatch = useDispatch()

    const setDrugsPage = (value) => {
        dispatch(pageChanged(value))
    }

    const setDrugsPageSize = (value) => {
        dispatch(pageSizeChanged(value))
    }

    const setDrugsPageTotalCount = (value) => {
        dispatch(totalCountChanged(value))
    }

    return {
        queryPageIndex,
        queryPageSize,
        totalCount,
        setDrugs: {
            setDrugsPage,
            setDrugsPageSize,
            setDrugsPageTotalCount
        }
    };
}