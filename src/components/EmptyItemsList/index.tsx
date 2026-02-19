import { ReactElement } from "react";
import { TSvgComponent } from "@app-types/svgComponent";
import "./style.css";

interface IEmptyItemsListProps {
    Icon: TSvgComponent;
    title: string;
    description: string;
}

const EmptyItemsList = ({
    Icon,
    title,
    description,
}: IEmptyItemsListProps): ReactElement => {
    return (
        <div className={`empty-items-list`}>
            <div className="empty-list-image-wrapper">
                <Icon className="empty-icon" />
            </div>

            <div className="empty-list-info">
                <h1 className="empty-list-title bold-text">{title}</h1>
                <span className="empty-list-description">{description}</span>
            </div>
        </div>
    );
};

export default EmptyItemsList;
