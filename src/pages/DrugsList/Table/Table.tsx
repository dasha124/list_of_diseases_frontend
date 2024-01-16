// @ts-ignore
import {TableInstance, useTable, usePagination} from "react-table"
import {useNavigate} from "react-router-dom";
import "./Table.css"
import axios from "axios";
import {STATUSES, Option, STATUSES_T} from "../../../Consts";
import { Link } from 'react-router-dom';
import {useQuery} from "react-query";
import {useSession} from "../../../hooks/useSession";
import { format } from 'date-fns';
import {ru} from 'date-fns/locale';
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"
import { Drug } from "../../../Types";
import { useDraftDrug } from "../../../hooks/useDraftDrug";
import {useAuth} from "../../../hooks/useAuth";
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

// import {store, RootState, AppDispatch} from '/home/student/front/list_of_diseases_frontend/src/store/store.ts';
export const DrugsTable = () => {


    const [drugs, setDrugs] = useState<any[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isLoadingDrugs, setIsLoadingDrugs] = useState(true);

  
    

    const { access_token } = useSession()
    const { ApproveDrug, DisApproveDrug} = useDraftDrug()
    const navigate = useNavigate()
    
    const fetchDrugsData = async () => {
        try {

        const drugsResponse = await axios.get(`${DOMEN}/drugs/`, {
            method: "GET",
            headers: { 'Authorization': access_token },
            params,
        });

        setDrugs(drugsResponse.data);
        setIsLoadingDrugs(false);
        } catch (error) {
        console.log("Ошибка загрузки данных о препаратах!", error);
        }
    };
    
    useEffect(() => {
        fetchUsersData();
        fetchDrugsData();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(event.target.value);
    setFilterUserId(selectedUserId);
    };


    const filteredDrugs = filterUserId !== null ? drugs.filter(drug => Number(drug.user_id) === filterUserId) : drugs;
  


    const {  error } = useQuery(
        ['drugs'],
        () => fetchDrugsData(),
        {
            keepPreviousData: true,
        }
    );



    if (error) {
        return <p>Ошибка загрузки</p>;
    }


    const getStatusName = (status: number): string => {
        const selectedStatus = STATUSES.find((option: Option) => option.id === status);
        return selectedStatus ? selectedStatus.name : '';
    }

    const getTestStatusName = (status: number): string => {
        const selectedStatus = STATUSES_T.find((option: Option) => option.id === status);
        return selectedStatus ? selectedStatus.name : '';
    }

    

    const parsedDate= (date: string): string => {
        if (date) {
            const parsedDate = format(new Date(date), "d MMMM yyyy 'г.'", { locale: ru });
            return parsedDate;
        }
        return 'Нет даты';
    }
   
    return (
        <div className="table-wrapper0">
            <div className="table-container">
                <div className="row_">
                    <div className="column1">№</div>
                    <div className="column_u">Статус заявки</div>
                    <div className="column_u">Дата создания</div>
                    <div className="column_u">Дата формирования</div>
                    <div className="column_u">Дата завершения</div>
                    <div className="column_u">Результат клинического испытания</div>
                    
                </div>  
                {filteredDrugs.map((drug: Drug) => (
                    <div className="row" key={drug.id}>

                       

                        <div className="column1"> 
                        <Link className="link" to={`/drugs/${drug.id}/`}>{drug.id}</Link>
                         
                        </div>

                        <div className="column_u"> {getStatusName(Number(drug.status))}  </div>
                  
                        <div className="column_u">{parsedDate(drug.time_create)}</div>

                        <div className="column_u">{parsedDate(drug.time_form)}</div>

                        <div className="column_u">{parsedDate(drug.time_finish)}</div>

                        <div className="column_u"> {getTestStatusName(Number(drug.test_status))}  </div>
                        
                        
                    </div>
                ))}
            </div>


        </div>
    );
}
