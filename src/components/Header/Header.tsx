import "./Header.css";
import * as React from 'react';
import ProfileMenu from "./ProfileMenu/ProfileMenu";
//import logo from "../../../bank-logo.png"
import {Link} from "react-router-dom";
import {useSession} from "../../hooks/useSession";
import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {useDraftDrug} from "../../hooks/useDraftDrug";
import axios from "axios";
import {Response} from "../../Types";
import Hamburger from "../../components/Header/Hamburger/Hamburger";

const Header: React.FC = () => {

    const {session_id,} = useSession()

    const {is_authenticated, setUser} = useAuth()

    const {setDrug} = useDraftDrug()

    const fetchDrug = async () => {
        try {

            const response: Response<any> = await axios(`http://localhost:8000/api/drugs/draft/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
            })

            if (response.status != 404)
            {
                setDrug(response.data)
            }

        } catch (error) {


        }
    }

    const auth = async () => {

        try {

            const response: Response<any> = await axios(`http://localhost:8000/api/check/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': session_id
                },
            })

            if (response.status == 200)
            {
                const permissions = {
                    is_authenticated: true,
                    is_moderator: response.data["is_moderator"],
                    user_id: response.data["user_id"],
                    user_name: response.data["name"],
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
                        <h1 className="header-title">Регистрация новых репаратов (авторизован)</h1>
                    </div>
                </div>

                <div className="header-links">

                    <Link to="/drugs" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Лекарства</span>
                    </Link>

                    <Link to="/diseases" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Болезни</span>
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
                    <h1 className="header-title">Регистрация новых репаратов (неавторизован)</h1>
                </div>
            </div>

            <div className="header-links">
                <Link to="/home" className="header-menu-link" style={{textDecoration: 'none'}}>
                    <span className="item">Главная</span>
                </Link>
            </div>

            <div className={"header-right " + (isOpen ? "open" : "")}>

                <Link to="/auth" className="header-menu-link" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                    <span className="item">Вход</span>
                </Link>

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />


        </div>
    );
};

export default Header;