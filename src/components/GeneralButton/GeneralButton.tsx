//import "./GeneralButton.css";

interface GeneralButtonProps {
    text: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => Promise<void>;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({ text, onClick }) => {
    return (
        <div className="general-button" onClick={onClick}>
            <span>{text}</span>
        </div>
    );
};

export default GeneralButton;