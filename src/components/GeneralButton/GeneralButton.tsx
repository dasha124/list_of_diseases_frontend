//import "./GeneralButton.css";
import React from "react";
import "/home/student/front/list_of_diseases_frontend/src/components/ds.css"


interface GeneralButtonProps {
    text: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => Promise<void>;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({ text, onClick }) => {
    return (
        <div className="service-text_but" onClick={onClick}>
            <span>{text}</span>
        </div>
    );
};

export default GeneralButton;