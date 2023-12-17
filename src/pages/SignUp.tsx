import { useAuth } from '/home/student/front/list_of_diseases_frontend/src/hooks/auth.tsx'
import '/home/student/front/list_of_diseases_frontend/src/components/ds.css'
import { Button } from 'react-bootstrap'
// import {FaLock, FaRegBuilding, FaSignsPost, FaUser} from "react-icons/fa6";
// import {GrLogin, GrMap} from "react-icons/gr";
// import {Link, useNavigate} from "react-router-dom";
// import axios from "axios";
// import {errorMessage, successMessage} from "../../../Toasts/Toasts";
// import {useToken} from "../../../hooks/useToken";
// import {useAuth} from "../../../hooks/useAuth";
// import CustomButton from "../../../Components/CustomButton/CustomButton";
// import {variables} from "../../../utls/variables";
// import {DOMEN} from "../../../Consts.ts";

const SignUpPage = () => {

    // const navigate = useNavigate()
    // const {setAccessToken} = useToken()
    // const {setUser} = useAuth()

    // // @ts-ignore
    // const login = async (formData) => {
    //     const username = formData.get('username')
    //     const password = formData.get('password')
    //     await axios(`${DOMEN}api/authentication/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         },
    //         data: {
    //             username: username,
    //             password: password
    //         }
    //     })
    //         .then(response => {
    //             setAccessToken(response.data['access_token'])
    //             const permissions = {
    //                 is_authenticated: true,
    //                 id: response.data.user["id"],
    //                 username: response.data.user["username"],
    //                 is_moderator: response.data.user["is_moderator"],
    //             }
    //             setUser(permissions)
    //             navigate("/home");
    //             successMessage(response.data.user["username"])
    //         })
    //         .catch(error => {
    //             console.error("Ошибка!\n", error);
    //             errorMessage()
    //         });
    // }

    // @ts-ignore
    // const register = async (formData) => {
    //     await axios(`${DOMEN}api/register/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         },
    //         data: formData as FormData
    //     })
    //         .then(response => {
    //             console.log(response.data)
    //             login(formData)
    //         })
    //         .catch(error => {
    //             console.error("Ошибка!\n", error);
    //             errorMessage()
    //         });
    // }
    // // @ts-ignore
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const formData: FormData = new FormData(e.target as HTMLFormElement)
    //     await register(formData)
    // }

    return (
        <div className="auth-container">
            <h3 className="sign-up-text">Регистрация</h3>

            {/* <form className="inputs" action="POST" onSubmit={handleSubmit}> */}
            <form className="inputs">

                <div className="input">
                    <input type="text" placeholder="Логин" name="username"/>
                </div>

                <div className="input">
                    <input type="text" placeholder="Почта" name="email"/>
                </div>

                <div className="input">
                    <input type="password" placeholder="Пароль" name="password"/>
                </div>
                
                <Button className="sign-up-link-container">Зарегестрироваться</Button>

            </form>

        </div>
    )
}

export default SignUpPage;