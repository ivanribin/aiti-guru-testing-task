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
                <h2 className="empty-list-title">{title}</h2>
                <span className="empty-list-description description-text-secondary-thin">
                    {description}
                </span>
            </div>
        </div>
    );
};

export default EmptyItemsList;
