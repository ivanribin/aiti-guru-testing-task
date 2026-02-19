import type { ReactElement, ReactNode, MouseEvent } from "react";
import { FIRST_SHEET_MODAL_Z_INDEX } from "@utils/constants";
import { createPortal } from "react-dom";
import "./style.css";

interface IModalWindowProps {
    onClose: () => void;
    children: ReactNode;
    zIndex?: number;
}

export const ModalWindow = ({
    onClose,
    children,
    zIndex = FIRST_SHEET_MODAL_Z_INDEX,
}: IModalWindowProps): ReactElement => {
    const handleContentClick = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
    };

    return createPortal(
        <div className="modal-overlay" onClick={onClose} style={{ zIndex }}>
            <div className="modal-content" onClick={handleContentClick}>
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default ModalWindow;
