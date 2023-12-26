import "./Header.css";
import * as React from 'react';
import ProfileMenu from "./ProfileMenu/ProfileMenu";
// import logo from "../../../bank-logo.png"
import {Link} from "react-router-dom";
import {useSession} from "../../hooks/useSession";
import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
// import {useDraftDrug} from "../../hooks/useDraftDrug";
import axios from "axios";
import {Response} from "../../Types";
import Hamburger from "../../components/Header/Hamburger/Hamburger";
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"
import {useDraftDrug} from "../../hooks/useDraftDrug";


const Header: React.FC = () => {

    const {access_token } = useSession()

    const {is_authenticated, setUser} = useAuth()

    const {setDrug} = useDraftDrug()

    const fetchDrug = async () => {
        const response = await axios(`${DOMEN}/drugs/create_drug/`, {
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

    const auth = async () => {

        try {

            const response: Response<any> = await axios(`${DOMEN}/check/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            })

            if (response.status == 200)
            {
                const permissions = {
                    is_authenticated: true,
                    is_moderator: response.data["is_superuser"],
                    user_id: response.data["user_id"],
                    // user_id: response.data["id"],
                    user_name: response.data["user_name"],
                    user_email: response.data["email"],
                }

                setUser(permissions)
                await fetchDrug()
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
            }
        }

    }

    useEffect(() => {

        if (!is_authenticated)
        {
            auth()
        }

    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (is_authenticated) {

        return (
            <div className="header-wrapper">
                <div className="header-left">
                    {/*<img src={logo} className="logo" alt="Bank Logo"/>*/}
                    <div>
                        <h5 className="header-title">Регистрация новых репаратов</h5>
                    </div>
                </div>

                <div className="header-links">

                <Link to="/diseases" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Заболевания</span>
                    </Link>

                    <Link to="/drugs" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Препараты</span>
                    </Link>

                    
                </div>

                <ProfileMenu/>
            </div>
        );
    }
    return (
        <div className="header-wrapper">
            <div className="header-left">
                {/*<img src={logo} className="logo" alt="Bank Logo"/>*/}
                <div>
                    <h2 className="header-title">Регистрация новых репаратов</h2>
                </div>
            </div>

            <div className="header-links">
                <Link to="/diseases/" className="header-menu-link" style={{textDecoration: 'none'}}>
                    <span className="item">Заболевания</span>
                </Link>
            </div>

            <div className={"header-right " + (isOpen ? "open" : "")}>

                <Link to="/login" className="header-menu-link" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                    <span className="item">Вход</span>
                </Link>

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />


        </div>
    );
};

export default Header;