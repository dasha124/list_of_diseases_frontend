//import '/home/student/front/list_of_diseases_frontend/src/components/ds.css'
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useDisease } from "../../hooks/useDisease";
import {FaChevronRight} from "react-icons/fa";
import "./Breadcrumbs.css"

function BreadCrumbs(){

    const { disease, setDisease } = useDisease()

    const resetSelectedDisease = () => setDisease(undefined)

    const location = useLocation()

    let currentLink = ''

    type Topics = {
        [key: string]: string;
    };

    const topics: Topics = {
        diseases: "Заболевания",
        draft: "Заявка",
        // home: "Главная",
        profile: "Профиль",
        login: "Вход",
        register: "Регистрация",
        update: "Редактирование",
        add: "Добавление"
    };

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedDisease}>
                        {topics[crumb]}
                    </Link>


                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('diseases/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Заболевание: { disease?.disease_name}
                    </Link>

                    

                </div>
            )
        }
    });
    return(
        <div className={"breadcrumbs-wrapper"}>
        <div className="breadcrumbs">

            <div className="crumb">

            </div>

            {crumbs}

        </div>
    </div>
    )
}

export default BreadCrumbs;