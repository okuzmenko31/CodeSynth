import "../../styles/components/UI/ModalWindow.scss";
import Button from "./Button";

type ModalWindowProps = {
    text: string;
    closeModal: () => any;
};

const ModalWindow = ({ text, closeModal }: ModalWindowProps) => {
    return (
        <div className="window-modal-container" onClick={closeModal}>
            <div className="window-modal" onClick={(e) => e.stopPropagation()}>
                <div className="window-modal-inner">
                    <p className="window-modal-info small-text">{text}</p>
                </div>
                <div className="window-modal-background"></div>
                <div className="window-modal-button-container">
                    <Button
                        text="OK"
                        callback={closeModal}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
