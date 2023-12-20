//import "../Login.css"
// import {FaLock, FaUser} from "react-icons/fa6";
// import {GrMail} from "react-icons/gr";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {errorMessage, successMessage} from "../../../Toasts/Toasts";
import {useSession} from "../../../hooks/useSession";
import {useAuth} from "../../../hooks/useAuth";
import {Response} from "../../../Types";
//import GeneralButton from "../../../Components/GeneralButton/GeneralButton";


const SignUp = () => {

    const navigate = useNavigate()
    const { setSession } = useSession()
    const { setUser } = useAuth()

    const login = async (formData: any) => {

        try {
            const response:Response<any> = await axios(`http://127.0.0.1:3000/api/login/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: formData as FormData
            })

            console.log(response.headers)
            console.log(response.headers['set-cookies'])

            setSession(response.data['access_token'])

            const permissions = {
                is_authenticated: true,
                is_moderator: response.data["is_moderator"],
                user_id: response.data["user_id"],
                user_name: response.data["full_name"],
                user_email: response.data["email"]
            }

            setUser(permissions)

            navigate("/accounts");

            successMessage(response.data["full_name"])

        } catch {
            errorMessage()
        }
    }

    const register = async (formData: any) => {

        try {

            const formDataObject = {};
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData.forEach((value, key) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                formDataObject[key] = value;
            });

            console.log("Registration data:", formDataObject);
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);

            if (response.status === 200) {
                await login(formData);
            }
        } catch (error) {
            console.log("Error in register function:", error);
            errorMessage();
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Before register function");
        const formData = new FormData(e.currentTarget);
        console.log(formData)
        await register(formData);
    };

    return (
        <div className="auth-container">

            <div className="header">

                <div className="text">
                    Регистрация
                </div>

            </div>

            <form className="inputs" onSubmit={handleSubmit}>

                <div className="input">
                    {/* <FaUser className="icon" /> */}
                    <input type="text" placeholder="Имя" name="full_name" />
                </div>

                <div className="input">
                    {/* <GrMail className="icon" /> */}
                    <input type="email" placeholder="Почта" name="email" />
                </div>

                <div className="input">
                    {/* <FaLock className="icon" /> */}
                    <input type="password"  placeholder="Пароль" name="password" />
                </div>


                <div className="sign-in-link-container">
                    <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                        <span>Уже есть аккаут?</span>
                    </Link>
                </div>

                <button className="register-button" onClick={register}>Зарегистрироваться</button>

            </form>

        </div>
    )
}

export default SignUp;