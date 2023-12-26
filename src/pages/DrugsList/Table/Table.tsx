// @ts-ignore
import {TableInstance, useTable, usePagination} from "react-table"
import {useMemo} from "react";
import "./Table.css"
import axios from "axios";
import {STATUSES} from "../../../Consts";
import { Link } from 'react-router-dom';
import {useQuery} from "react-query";
import {useSession} from "../../../hooks/useSession";
import { format } from 'date-fns';
import {ru} from 'date-fns/locale';
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"


export const DrugsTable = () => {

    // const [, setData] = useState<Drug[]>([]);

    

    const { access_token } = useSession()

    const COLUMNS = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название препарата",
            accessor: "drug_name",
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }: { value: number }) => {
                if (value === undefined) {
                  return "Неизвестный статус";
                }
                const selectedStatus = STATUSES.find((status: { id: number })  => status.id === value);
                const statusName: string = selectedStatus ? selectedStatus.name : 'Неизвестный статус';
                return statusName;
              }
           

        },
        {
            Header: "Дата создания",
            accessor: "time_create",
            Cell: ({ value }: { value?: string }) => {
                if (value) {
                    const parsedDate = format(new Date(value), "d MMMM yyyy 'г.'", { locale: ru });
                    return parsedDate;
                }
                return 'Нет даты';
            },
        },
        {
            Header: "Дата формирования",
            accessor: "time_form",
            Cell: ({ value }: { value?: string }) => {
                if (value) {
                    const parsedDate = format(new Date(value), "d MMMM yyyy 'г.'", { locale: ru });
                    return parsedDate;
                }
                return 'Нет даты';
            },
        },
        {
            Header: "Дата завершения",
            accessor: "time_finish",
            Cell: ({ value }: { value?: string }) => {
                if (value) {
                    const parsedDate = format(new Date(value), "d MMMM yyyy 'г.'", { locale: ru });
                    return parsedDate;
                }
                return 'Нет даты';
            },
        }
    ]
    
    const fetchDrugsData = async () => {
    
        const {data} = await axios(`${DOMEN}/drugs/`, {
            method: "GET",
            headers: {
                'Authorization': access_token
            }
        })

        return data

    }

    const { isLoading, error, data, isSuccess } = useQuery(
        ['drugs'],
        () => fetchDrugsData(),
        {
            keepPreviousData: true,
        }
    );

    const tableColumns = useMemo(() => COLUMNS, [])

    const tableInstance = useTable<TableInstance>({
        columns:tableColumns,
        data: isSuccess ? data : [],
        initialState: {
            pageIndex: 0,
            pageSize: 10
        },
        manualPagination: true,
        pageCount: 1,
    }, usePagination)


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = tableInstance


    if (error) {
        return <p>Error</p>;
    }

    if (isLoading) {
        return <p>Загрузка...</p>;
    }


    return (
        <div className="table-wrapper">

            <table {...getTableProps()} className="orders-table">
                <thead>
                {
                    headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))

                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row: any) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell: any) => {
                                const isIdCell = cell.column.id === 'id';
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        key={cell.column.id}
                                        style={{ cursor: isIdCell ? 'pointer' : 'default' }}
                                    >
                                        {isIdCell ? (
                                            <Link className="link" to={`/drugs/${row.original.id}/`}>
                                                {row.original.id}
                                            </Link>
                                        ) : (
                                            cell.render('Cell')
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>
    );
}