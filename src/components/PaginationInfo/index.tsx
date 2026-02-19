import { ReactElement } from "react";
import "./style.css";

export interface IPaginationInfoProps {
    selectedPack: number;
    packItemsCount: number;
    total: number;
}

const PaginationInfo = ({
    selectedPack,
    packItemsCount,
    total,
}: IPaginationInfoProps): ReactElement => {
    const packInfoLabel: string = `${(selectedPack - 1) * packItemsCount + 1}-${selectedPack * packItemsCount}`;

    return (
        <div className="pagination-info">
            <span className="description-text-secondary-thin">{`Показано`}</span>
            <span className="pagination-info-data description-text-thin">
                {packInfoLabel}
            </span>
            <span className="description-text-secondary-thin">{`из`}</span>
            <span className="pagination-info-data description-text-thin">
                {total}
            </span>
        </div>
    );
};

export default PaginationInfo;
