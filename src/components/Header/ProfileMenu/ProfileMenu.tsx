// import "./ProfileMenu.css"
// import { FaChevronRight, FaQuestionCircle } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
import React from "react";
import {useDraftDrug} from "../../../hooks/useDraftDrug";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import {Link} from "react-router-dom";
import axios from "axios";
import UserInfo from "./UserInfo/UserInfo";
import {useAuth} from "../../../hooks/useAuth";
import {useSession} from "../../../hooks/useSession";
import {useDesktop} from "../../../hooks/useDesktop";
import {Response} from "../../../Types";
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"



const ProfileMenu = () => {

    const {access_token} = useSession()

    const {is_authenticated, user_name, setUser} = useAuth()
    // const {is_authenticated, user_name, is_moderator, user_email, setUser} = useAuth()

    const {isDesktopMedium} = useDesktop();

    const {setDrug} = useDraftDrug()

    const fetchDrug = async () => {
        try {
            
            const response: Response<any> = await axios(`${DOMEN}/drugs/draft/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token 
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
                    is_moderator: response.data["is_moderator"],
                    user_id: response.data["user_id"],
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

    // const refreshSession = async () => {
    //     try {
    //
    //         console.log("refresh")
    //
    //         const response: Response = await axios(`http://localhost:8000/api/refresh/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-type": "application/json; charset=UTF-8",
    //                 'authorization': `${refresh_token}`
    //             },
    //         })
    //
    //         console.log(response.status)
    //         console.log(response.data)
    //
    //         if (response.status == 201)
    //         {
    //             const permissions = {
    //                 is_authenticated: true,
    //                 is_moderator: response.data["is_moderator"],
    //                 user_id: response.data["user_id"],
    //                 user_name: response.data["name"],
    //                 user_email: response.data["email"],
    //             }
    //
    //             setUser(permissions)
    //         }
    //     } catch (e: any) {
    //         console.log(e.status);
    //     }
    // }

    useEffect(() => {

        if (!is_authenticated)
        {
            auth()
        }

    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (is_authenticated)
    {
        return (
            <div className="profile-menu-wrapper">

                <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                    { !isDesktopMedium &&
                        <Link to="/profile" className="sub-menu-link" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                            <span className="item">{user_name}</span>
                        </Link>
                    }

                    { isDesktopMedium && <UserInfo />}

                </div>

                <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

            </div>
        )
    }

    return (
        <div className={"profile-menu-wrapper"}>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/auth" className="sub-menu-link" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                    <span className="item">Вход</span>
                </Link>

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>

    )
}

export default ProfileMenu;
//
// const ProfileMenuT = () => {
//     const [isOpen, setIsOpen] = useState<boolean>(false)
//
//     return (
//         <div className={"profile-menu-wrapper"}>
//             <div className={"user-avatar-container"}>
//                 <div className={"user-avatar"} onClick={() => {setIsOpen(!isOpen)}} />
//                 <span></span>
//             </div>
//
//             <div className={"sub-menu-wrapper " + (isOpen ? "open" : "")}>
//                 <div className={"sub-menu"}>
//                     <div className={"user-info"}>
//                         <span>Коновалов Илья</span>
//                     </div>
//
//                     <hr/>
//
//                     <a href="/" className={"sub-menu-link"}>
//                         <CgProfile className={"left-icon"}/>
//                         <span> Профиль</span>
//                         <FaChevronRight className={"right-icon"} />
//                     </a>
//
//
//                     <a href="/" className={"sub-menu-link"}>
//                         <FaQuestionCircle className={"left-icon"}/>
//                         <span> Помощь</span>
//                         <FaChevronRight className={"right-icon"} />
//                     </a>
//
//
//                     <a href="/" className={"sub-menu-link"}>
//                         <BiLogOut className={"left-icon"}/>
//                         <span> Выйти</span>
//                         <FaChevronRight className={"right-icon"} />
//                     </a>
//
//                 </div>
//             </div>
//         </div>
//
//     )
// }
//
// export default ProfileMenuT;
