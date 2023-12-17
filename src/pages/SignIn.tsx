import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from '/home/student/front/list_of_diseases_frontend/src/hooks/auth.tsx'
import { Button } from "react-bootstrap"

const SignInPage = () => {

    // const {login} = useAuth()
    
    // const navigate = useNavigate()


    // const handleSubmit = async(e: any ) => {
    //     e.preventDefault()

    //     const formData = new FormData(e.target as HTMLFormElement)

    //     const flag = await login(formData)
        
    //     if (flag) {
    //         navigate("/services")
    //     }
    // }

    // const handleAuth  = async() => {
    //     console.log("handleAuth")
    //     const flag = await login()
    //     if(flag){
    //         navigate("/diseases")
    //     }
    // }

    // useEffect(() => {
    //     handleAuth()
    // }, []);
    

    return (
        <div>
            <h3 className="sign-up-text">Авторизация</h3>

            {/* <form className="inputs" action="POST" onSubmit={handleSubmit}> */}
            <form className="inputs" action="POST">
                <div className="input">
                    <input type="text" placeholder="Логин" name="username"/>
                </div>
                <div className="input">
                    <input type="password" placeholder="Пароль" name="password"/>
                </div>
                {/* <div className="sign-up-link-container">
                    <Link to="/auth/register" style={{textDecoration: 'none'}}>
                        <span> Регистрация </span>
                    </Link>
                </div> */}

                {/* <Button onClick={sendLogin} disabled={loading}>Войти</Button>
                <p></p>
                <Button onClick={sendRegister} disabled={loading}>Регистрация</Button> */}

                <Button className="sign-up-link-container">Войти</Button>
                <p></p>
                <Button className="sign-up-link-container">Регистрация</Button>




                <p></p>
                {/*	@ts-ignore*/}
                {/* <CustomButton bg={variables.primary} text="Войти"/> */}
            </form>

        </div>
    )
}

export default SignInPage;