// import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/authSlice";
import {Response} from "../Types";
import axios from "axios";
import {useSession} from "./useSession";
import {DOMEN} from "/home/student/front/list_of_diseases_frontend/src/Consts.tsx"


export function useAuth() {
  const {is_authenticated, is_superuser, user_id, user_name, user_email} = useSelector((state: any) => state.user);

  const dispatch = useDispatch()

  const setUser = (value: any) => {
    dispatch(updateUser(value))
  }

  const sendRequest = async() => {

    const { access_token } = useSession()

    try {

      const response: Response<any> = await axios(`${DOMEN}/logout/`, {
        method: "POST",
        headers: {
          'Authorization': `${access_token}`
        }
      })

      if (response.status == 200)
      {
        console.log(response.data)
      }

    } catch (error) {

    }
  }

  const logOut = async () => {

    sendRequest()

    dispatch(cleanUser())
  }


  return {
    is_authenticated,
    is_superuser,
    user_id,
    user_name,
    user_email,
    setUser,
    logOut
  };
}
