import AscendingIcon from "@assets/icons/ascending.svg?react";
import DescendingIcon from "@assets/icons/descending.svg?react";
import { SortOrders, updateSort } from "@store/slices/Products";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, MouseEvent, ReactNode } from "react";
import { IProduct } from "@domains/Product";
import { TRootState } from "@store/index";
import "./style.css";

export interface IProductTableHeadWithSortProps {
    category: keyof IProduct;
    label: string;
    className?: string;
}

const sortOrderIcons: Record<SortOrders, ReactNode> = {
    [SortOrders.ASCENDING]: <AscendingIcon className="action-icon" />,
    [SortOrders.DESCENDING]: <DescendingIcon className="action-icon" />,
};

const ProductTableHeadWithSort = ({
    category,
    label,
    className = "",
}: IProductTableHeadWithSortProps): ReactElement => {
    const dispatch = useDispatch();

    const { category: activeCategory, sortOrder } = useSelector(
        (state: TRootState) => state.products,
    );

    const onClick = (event: MouseEvent<HTMLSpanElement>): void => {
        event.stopPropagation();

        dispatch(updateSort(category));
    };

    const isActiveHead: boolean = activeCategory === category;

    const activeClassName: string = !isActiveHead ? "" : "active";

    return (
        <th
            onClick={onClick}
            className={`product-table-head-with-sort caption-text-bold ${activeClassName} ${className}`}
        >
            <span className="head-label">{label}</span>
            {isActiveHead && sortOrder && (
                <span className="sort-order-label">
                    {sortOrderIcons[sortOrder]}
                </span>
            )}
        </th>
    );
};

export default ProductTableHeadWithSort;
