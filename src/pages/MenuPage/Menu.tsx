import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import './Menu.css'

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const { is_authenticated, is_superuser } = useAuth();

    if (!is_authenticated) {
        return (
            <div className="menu">
                <button onClick={() => navigate('/login')}>Войти</button>
                <button onClick={() => navigate('/register')}>Регистрация</button>
            </div>
        );
    }
    if (is_superuser) {
        return (
            <div className="menu">
                <button onClick={() => navigate('/diseases')}>Заболевания</button>
                <button onClick={() => navigate('/drugs')}>Препараты</button>
                <button onClick={() => navigate('/drugs/create_drug/')}>Выбранные заболевания</button>
                <button onClick={() => navigate('/diseases/add/')}>Добавить заболевание</button>
            </div>
        );
    }
    else {
        return (
            <div className="menu">
                <button onClick={() => navigate('/diseases')}>Заболевания</button>
                <button onClick={() => navigate('/drugs')}>Препараты</button>
                <button onClick={() => navigate('/drugs/create_drug/')}>Выбранные заболевания</button>
            </div>
        );

    }
    return null;
};

export default Menu;
