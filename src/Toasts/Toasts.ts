import {toast} from "react-toastify";

export const successMessage = (username: string) => {
    toast.success(`Добро пожаловать, ${username}!`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const errorMessage = () => {
    toast.error(`Неправильный логин или пароль`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};
