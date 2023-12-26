import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user_id: -1,
    // username: "",
    user_name: "",
    user_email: "",
    is_authenticated: false,
    is_superuser: false,
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.is_authenticated = action.payload.is_authenticated
            state.is_superuser = action.payload.is_moderator
            state.user_id = action.payload.user_id
            // state.username = action.payload.user_name
            state.user_name = action.payload.user_name
            state.user_email = action.payload.user_email
        },
        cleanUser: (state) => {
            state.is_authenticated = false
            state.is_superuser = false
            state.user_id = -1
            // state.username = ""
            state.user_name = ""
            state.user_email=""
        }
    }
})

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer