import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/Slice";
import axios from "axios";
import { SsId } from './session';

export function useAuth() {
  //@ts-ignore
  const { is_authenticated, is_superuser, user_id, user_name } = useSelector(state => state.user)

  const { session_id, setSsId, resetSsId } = SsId()

  const dispatch = useDispatch()

  const setUser = (value: any) => {
    dispatch(updateUser(value))
  }

  const resetUser = () => {
    dispatch(cleanUser())
  }

//   const logOut = async () => {

//     try {

//       console.log(session_id)

//       const response = await axios(`http://localhost:8000/accounts/logout/`, {
//         method: "POST",
//         headers: {
//           'authorization': session_id
//         }
//       })

//       console.log(response.status)

//       if (response.status == 200)
//       {
//         resetSsid()
//         resetUser()
//       }

//     } catch (error) {
//       console.log("Что-то пошло не так")
//     }

//   }

//   const login = async (formData: any) => {

//       const response = await axios('http://127.0.0.1:8000/login/', {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json; charset=UTF-8"
//         },
//         data: formData as FormData
//       })

//       if (response.status == 201) {

//         console.log(response.data)

//         setSsId(response.data['session_id'])


//         const data = {
//           is_authenticated: true,
//           is_superuser: response.data["is_superuser"],
//           user_id: response.data["user_id"],
//           username: response.data["email"],
//       }
      
//       console.log(`Добро пожаловать, ${response.data["username"]}!`)

//       setUser(data)

//         return true
//       }

//       return false

//     }



    const login = async () => {

        console.log("login")

        // console.log(session_id)

        const response = await axios('http://127.0.0.1:8000/login/', {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })

      if (response.status == 201) {

        console.log(response.data)

        setSsId(response.data['session_id'])


        const data = {
          is_authenticated: true,
          is_superuser: response.data["is_superuser"],
          user_id: response.data["user_id"],
          username: response.data["email"],
      }
      
      console.log(`Добро пожаловать, ${response.data["username"]}!`)

      setUser(data)

        return true
      }

      return false

    }


    // const auth = async () => {

    //     console.log("auth")

    //     console.log(session_id)

    //     const response = await axios(`http://localhost:8000/accounts/check/`, {
    //         method: "POST",
    //         headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         'authorization': session_id
    //         },
    //     })

    //     if (response.status == 200) {

    //         console.log(response.data)

    //         const data = {
    //             is_authenticated: true,
    //             is_moderator: response.data["admin_flag"],
    //             user_id: response.data["user_id"],
    //             user_name: response.data["login"],
    //         }

    //         setUser(data)

    //         return true
    //     }

    //     return false
    // }

  return {
    is_authenticated,
    is_superuser,
    user_id,
    user_name,
    setUser,
    // logOut,
    login,
    // auth,
  };
}