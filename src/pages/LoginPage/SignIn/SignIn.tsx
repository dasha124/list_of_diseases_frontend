//import "../Login.css"
// import {FaLock} from "react-icons/fa6";
// import {GrMail} from "react-icons/gr";
import {Response} from "../../../Types";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {errorMessage} from "../../../Toasts/Toasts";
import {useSession} from "../../../hooks/useSession";
import {useAuth} from "../../../hooks/useAuth";
//import GeneralButton from "../../../Components/GeneralButton/GeneralButton";

const SignIn = () => {
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

    const navigate = useNavigate()

    const { session_id} = useSession()
    const { setUser } = useAuth()

    const login = async (formData: any) => {

        try {
            const response:Response<any> = await axios(`http://127.0.0.1:8000/api/login/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: formData as FormData
            })

            console.log(response.data.headers)
            console.log(response.headers['set-cookies'])

            session_id(response.data['access_token'])

            const permissions = {
                is_authenticated: true,
                is_moderator: response.data["is_moderator"],
                user_id: response.data["user_id"],
                user_name: response.data["full_name"],
                user_email: response.data["email"]
            }

            setUser(permissions)

            navigate("/diseases/");

            //successMessage(response.data["name"])

        } catch {
            errorMessage()
        }
    }

    const handleSubmit = async (e: any) => {

        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        await login(formData)
    }


    return (
        <div className="auth-container">

            <div className="header">

                <div className="text">
                    Вход
                </div>

            </div>

            <form className="inputs" action="POST" onSubmit={handleSubmit}>

                <div className="input">
                    {/* <GrMail /> */}
                    <input type="email" name="email" placeholder="Почта" required/>
                </div>

                <div className="input">
                    {/* <FaLock /> */}
                    <input type="password" name="password"  placeholder="Пароль" required/>
                </div>


                <div className="sign-up-link-container">
                    <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                        <span> Ещё нет аккаунта? </span>
                    </Link>
                </div>

                <button className="login-button" onClick={login}>Войти</button>

            </form>

        </div>
    )
}

export default SignIn;