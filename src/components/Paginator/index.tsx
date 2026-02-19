import LeftArrowIcon from "@assets/icons/arrow-left.svg?react";
import { ButtonTypes } from "@utils/constants";
import { ReactElement, useMemo } from "react";
import { Button } from "primereact/button";
import "./style.css";

export interface IPaginatorProps {
    selectedPack: number;
    setPack: (packNumber: number) => void;
    total: number;
    visibleCount?: number;
}

const DEFAULT_VISIBLE_COUNT: number = 5;

const Paginator = ({
    selectedPack,
    setPack,
    total,
    visibleCount = DEFAULT_VISIBLE_COUNT,
}: IPaginatorProps): ReactElement => {
    const currentPacksGroup = useMemo(() => {
        const half: number = Math.floor(visibleCount / 2);

        let group: number = selectedPack - half;

        if (group < 1) {
            group = 1;
        }

        if (group + visibleCount - 1 > total) {
            group = Math.max(1, total - visibleCount + 1);
        }

        return group;
    }, [selectedPack, total, visibleCount]);

    const pageNumbers = useMemo(() => {
        const end: number = Math.min(
            currentPacksGroup + visibleCount - 1,
            total,
        );

        return Array.from(
            { length: end - currentPacksGroup + 1 },
            (_, index: number) => currentPacksGroup + index,
        );
    }, [currentPacksGroup, total, visibleCount]);

    return (
        <div className="paginator">
            <Button
                onClick={() => setPack(selectedPack - 1)}
                disabled={selectedPack === 1}
                className={`${ButtonTypes.GHOST} arrow`}
            >
                <LeftArrowIcon />
            </Button>
            <div className="pagination-numbers">
                {pageNumbers.map((packNumber) => (
                    <Button
                        key={packNumber}
                        label={`${packNumber}`}
                        onClick={() => setPack(packNumber)}
                        style={{
                            backgroundColor:
                                packNumber === selectedPack
                                    ? "#242EDB"
                                    : "transparent",
                            color:
                                packNumber === selectedPack
                                    ? "white"
                                    : "#9C9C9C",
                            borderColor:
                                packNumber === selectedPack
                                    ? undefined
                                    : "#9C9C9C",
                        }}
                    />
                ))}
            </div>
            <Button
                onClick={() => setPack(selectedPack + 1)}
                disabled={selectedPack === total}
                className={`${ButtonTypes.GHOST} arrow`}
            >
                <LeftArrowIcon style={{ transform: "rotate(180deg)" }} />
            </Button>
        </div>
    );
};

export default Paginator;
