//import "./UserInfo.css"
import React from "react";
import {useAuth} from "../../../../hooks/useAuth";
// import {ImExit} from "react-icons/im";
// @ts-ignore
import user from "./user.png"
import {useNavigate } from "react-router-dom";
import {logOutMessage} from "../../../../Toasts/Toasts";
import {useSession} from "../../../../hooks/useSession";
import {useDraftDrug} from "../../../../hooks/useDraftDrug";
import {useModal} from "../../../../hooks/useModal";

const UserInfo = () => {

    const navigate = useNavigate()

    const {is_superuser, user_name, user_email, logOut} = useAuth()

    const {resetSession} = useSession()

    const {drug} = useDraftDrug()

    const {modalRef, buttonRef, isOpen, setIsOpen} = useModal()


    const deleteLastDrug = async () => {
        console.log(drug)
    }

    const doLogOut = () => {
        deleteLastDrug()

        logOut()
        resetSession()
        logOutMessage()
        navigate("/home")
    }

    return (
        <div>
            <div ref={buttonRef}>
                <img src={user} className="user-avatar" onClick={() => setIsOpen(!isOpen)} />
            </div>

            <div className={"user-info-wrapper " + (isOpen ? "open" : "")} ref={modalRef}>
                <span>Имя: {user_name}</span>
                <span>Почта: {user_email}</span>
                <span>Статус: {is_superuser ? "Модератор" : "Пользователь"}</span>

                <button onClick={doLogOut}>
                    Выйти
                    {/* <ImExit /> */}
                </button>
            </div>

        </div>
    )
}

export default UserInfo;