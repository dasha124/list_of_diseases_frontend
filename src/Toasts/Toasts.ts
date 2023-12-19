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

export const logOutMessage = () => {
    toast.info(`Вы вышли из аккаунта`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}

export const diseaseAlreadyAddedMessage = () => {
    toast.warning(`Вы уже добавили этот счет в заявку`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const diseaseAddedMessage = (disease_name: string, drug_id: number) => {
    toast.success(`Счет ${disease_name} успешно добавлен в заявку №${drug_id}`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const diseaseRemoveMessage = (disease_name: string, drug_id: number) => {
    toast.info(`Счет ${disease_name} успешно удален из заявки №${drug_id}`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const drugDeleteMessage = (id: number) => {
    toast.info(`Заявка №${id} успешно удалено`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const drugSendMessage = (id: number) => {
    toast.success(`Заявка №${id} успешно отправлена`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const drugSaveMessage = (id: number) => {
    toast.success(`Заявка №${id} успешно сохранена`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const requestErrorMessage = () => {
    toast.error(`Что-то пошло не так`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const emptyDiseasesMessage = () => {
    toast.warning(`Добавьте счет в заявку`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};