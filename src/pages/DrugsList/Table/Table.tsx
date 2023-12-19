// @ts-ignore
import {TableInstance, useTable, usePagination} from "react-table"
import {useMemo} from "react";
//import "./Table.css"
import axios from "axios";
import {STATUSES} from "../../../Consts";
import { Link } from 'react-router-dom';
import {useQuery} from "react-query";
import {useSession} from "../../../hooks/useSession";

export const DrugsTable = () => {

    const { session_id } = useSession()

    const COLUMNS = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }: { value?: string }) => {
                const foundStatus = STATUSES.find((status) => status.id === value);
                return foundStatus ? foundStatus.name : "Неизвестный статус";
            }

        },
        {
            Header: "Счета",
            accessor: "diseases",
            Cell: ({ value }: { value?: { name: string }[] }) => {
                if (value) {
                    return value.map((disease) => disease.name).join(', ');
                }
                return "Нет счетов";
            }

        },
        {
            Header: "Дата формирования",
            accessor: "time_create",
        }
    ]
    const fetchDrugsData = async () => {

        const {data} = await axios(`http://127.0.0.1:8000/api/drugs/`, {
            method: "GET",
            headers: {
                'authorization': `${session_id}`
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
        return <p>Loading...</p>;
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
                                            <Link to={`/drugs/${row.original.id}/`}>
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