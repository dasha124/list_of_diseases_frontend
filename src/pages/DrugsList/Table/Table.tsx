// @ts-ignore
import {TableInstance, useTable, usePagination} from "react-table"
import {useNavigate} from "react-router-dom";
import "./Table.css"
import axios from "axios";
import {STATUSES, Option} from "../../../Consts";
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



export const DrugsTable = () => {

    // const [, setData] = useState<Drug[]>([]);
    // const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [drugs, setDrugs] = useState<any[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isLoadingDrugs, setIsLoadingDrugs] = useState(true);
    const [filterUserId, setFilterUserId] = useState<number | null>(null);

    const [filteredData, setFilteredData] = useState<Drug[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    // const [loaded, setLoaded] = useState(false);    
    

    const { access_token } = useSession()
    const { is_superuser} = useAuth()
    const { ApproveDrug, DisApproveDrug} = useDraftDrug()
    const navigate = useNavigate()

    // let users: any[] = [];
    // let drugs: any[] = [];
    const fetchUsersData = async () => {
        try {
            const usersResponse = await axios.get(`${DOMEN}/get_users/`);
            
            setUsers(usersResponse.data);
            setIsLoadingUsers(false);
            console.log("uuuuuuuuuuseeeeeeeer =", usersResponse.data)

        } catch (error) {
          console.log("Ошибка загрузки пользователей!", error);
        }
    };
    
    const fetchDrugsData = async () => {
        try {


            const params: Record<string, any> = {};

            if (startDate) {
                params.start_date = startDate;
            }

            if (endDate) {
                params.end_date = endDate;
            }

            if (selectedStatus) {
                params.status = selectedStatus;
            }

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

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         fetchDrugsData();
    //     }, 10000); // Интервал обновления данных каждые 10 секунд

    //     return () => clearInterval(intervalId);
    // }, []);


    useEffect(() => {
        // Фильтрация данных при изменении фильтров
        let filteredDrugs: Drug[] = [];

        if (startDate) {
            filteredDrugs = filteredDrugs.filter(
                (drug: Drug) => new Date(drug.time_create) >= new Date(startDate)
            );
        }
        
        if (endDate) {
            filteredDrugs = filteredDrugs.filter(
                (drug: Drug) => new Date(drug.time_finish) <= new Date(endDate)
            );
        }
        
        if (selectedStatus) {
            filteredDrugs = filteredDrugs.filter(
                (drug: Drug) => drug.status === selectedStatus
            );
        }
        

        setFilteredData(filteredDrugs);
    }, [filteredData, startDate, endDate, selectedStatus]);

    
    const getCreator = (userId: number) => {
    const user = users.find(user => user.id === userId);
    return user ? user.email : 'Unknown';
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(event.target.value);
    setFilterUserId(selectedUserId);
    };


    const filteredDrugs = filterUserId !== null ? drugs.filter(drug => Number(drug.user_id) === filterUserId) : drugs;
  


    const {  error, data, isSuccess } = useQuery(
        ['drugs'],
        () => fetchDrugsData(),
        {
            keepPreviousData: true,
        }
    );



    if (error) {
        return <p>Ошибка загрузки</p>;
    }

    // if (isLoading) {
    //     return <p>Загрузка...</p>;
    // }

   
    const getStatusName = (status: number): string => {
        const selectedStatus = STATUSES.find((option: Option) => option.id === status);
        return selectedStatus ? selectedStatus.name : '';
    }

    const parsedDate= (date: string): string => {
        if (date) {
            const parsedDate = format(new Date(date), "d MMMM yyyy 'г.'", { locale: ru });
            return parsedDate;
        }
        return 'Нет даты';
    }

    const handleStartDateChange = (date: string) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: string) => {
        setEndDate(date);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    


    const setOk = async (drug_id: number) => {
        await ApproveDrug(drug_id)
        navigate("/drugs")
    }

    
    const setNotOk = async (drug_id: number) => {
        await DisApproveDrug(drug_id)
        navigate("/drugs")
    }



    if (is_superuser){
        return (


            <div className="table-wrapper">
                <div className="filter-container">
                    <select className="filter-select" onChange={handleFilterChange}>
                        <option value="">Все создатели</option>
                        {users.map(user => (
                        <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>

                <div className="filters">
                <label>
                    Дата создания:
                    <input className="start-date" type="date" onChange={(e) => handleStartDateChange(e.target.value)}/>
                </label>
                <label>
                    Дата завершения:
                    <input className="end-date" type="date" onChange={(e) => handleEndDateChange(e.target.value)}
                     />
                </label>
                <label>
                    Статус:
                    <select className="status-box"onChange={(e) => handleStatusChange(e.target.value)}
                        >
                        <option value="">Все</option>
                        {STATUSES.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

                <div className="table-container">
                    <div className="row_">
                        <div className="column1">№</div>
                        <div className="column">Статус</div>
                        <div className="column">Создатель</div>
                        <div className="column">Дата создания</div>
                        <div className="column">Дата формирования</div>
                        <div className="column">Дата завершения</div>
                        <div className="column">Изменить статус</div>
                    </div>  
                    {(isLoadingUsers || isLoadingDrugs) ? 'Loading...' : (
                        <div>
                            {filteredDrugs.map((drug: Drug) => (
                            <div className="row" key={drug.id}>
        
                                <div className="column1"> 
                                <Link className="link" to={`/drugs/${drug.id}/`}>{drug.id}</Link>
                                
                                </div>
        
                                <div className="column"> {getStatusName(Number(drug.status))}  </div>

                            
                                <div className="column">
                                {getCreator(Number(drug.user_id))}
                                </div>
                            
                                <div className="column">{parsedDate(drug.time_create)}</div>
        
                                <div className="column">{parsedDate(drug.time_form)}</div>
        
                                <div className="column">{parsedDate(drug.time_finish)}</div>
                                
        
                                {/* <div className="column">{getStatusName(Number(drug.status)) === "Сформирована" ? getStatusName(Number(drug.status)) : "-"}</div> */}
                                    
                                {getStatusName(Number(drug.status)) !== "Сформирована" && (
                                    <div className="column">
                                        -
                                    </div>
                                    )}

                                    {getStatusName(Number(drug.status)) === "Сформирована" && (
                                        <div className="column5">
                                        <button className="drug-back-button_ok1" onClick={() => setOk(drug.id)}>Одобрить</button>
                                        <button className="drug-back-button_ne_ok1" onClick={() => setNotOk(drug.id)}>Отклонить</button>
                                        </div>
                                    )}

                            </div>
                             
                        ))}
                    </div>
    
                    )}
            </div>
            </div>
        );
        
    }


    return (
        <div className="table-wrapper0">
            <div className="table-container">
                <div className="row_">
                    <div className="column1">№</div>
                    <div className="column_u">Статус</div>
                    <div className="column_u">Дата создания</div>
                    <div className="column_u">Дата формирования</div>
                    <div className="column_u">Дата завершения</div>
                    
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
                        
                        
                    </div>
                ))}
            </div>


        </div>
    );
}