import "../Login.css"
// import {FaLock} from "react-icons/fa6";
// import {GrMail} from "react-icons/gr";
import {Response} from "../../../Types";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSession} from "../../../hooks/useSession";
import {useAuth} from "../../../hooks/useAuth";
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"


const SignIn = () => {
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

    const navigate = useNavigate()

    const { setSession, setRefreshSession} = useSession()

    const { setUser } = useAuth()

    const login = async (formData: any) => {
        try {
            const response:Response<any> = await axios(`${DOMEN}/login/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: formData as FormData
            })

            console.log("HHHHHHHHHHHHh",response.data.headers)
            console.log(response.headers['set-cookies'])

            // session_id(response.data['session_id'])
            // console.log("ssid =", session_id)
// было
            // setSession(response.data['session_id'])
            // setRefreshSession(response.data['session_id'])

//стало
            setSession(response.data['access_token'])
            setRefreshSession(response.data['refresh_token'])

            const permissions = {
                is_authenticated: true,
                // is_superuser: response.data["is_superuser"],
                is_moderator: response.data["is_superuser"],
                user_id: response.data["user_id"],
                user_name: response.data["username"],
                user_email: response.data["email"]
            }

            setUser(permissions)

            navigate("/diseases/");

            //successMessage(response.data["name"])

        } catch(e) {
           
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
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <span> Ещё нет аккаунта? </span>
                    </Link>
                </div>

                <button className="login-button" onClick={login}>Войти</button>

            </form>

        </div>
    )
}

export default SignIn;