import { ReactElement } from "react";

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
            <span>{`Показано`}</span>
            <span className="pagination-info-data">{packInfoLabel}</span>
            <span>{`из`}</span>
            <span className="pagination-info-data">{total}</span>
        </div>
    );
};

export default PaginationInfo;
