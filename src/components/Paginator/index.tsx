import LeftArrowIcon from "@assets/icons/arrow-left.svg?react";
import { ReactElement, useMemo } from "react";
import { Button } from "primereact/button";

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
        <button className="paginator">
            <Button
                onClick={() => setPack(selectedPack - 1)}
                disabled={selectedPack === 1}
            >
                <LeftArrowIcon />
            </Button>
            {pageNumbers.map((packNumber) => (
                <Button
                    key={packNumber}
                    label={`${packNumber}`}
                    onClick={() => setPack(packNumber)}
                    style={{
                        backgroundColor:
                            packNumber === selectedPack ? "blue" : "white",
                        color: packNumber === selectedPack ? "white" : "black",
                    }}
                />
            ))}
            <Button
                onClick={() => setPack(selectedPack + 1)}
                disabled={selectedPack === total}
            >
                <LeftArrowIcon style={{ transform: "rotate(180deg)" }} />
            </Button>
        </button>
    );
};

export default Paginator;
