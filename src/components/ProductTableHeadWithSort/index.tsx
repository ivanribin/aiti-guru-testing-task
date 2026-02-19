import { sortOrdersLabels, updateSort } from "@store/slices/Products";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, MouseEvent } from "react";
import { IProduct } from "@domains/Product";
import { TRootState } from "@store/index";
import "./style.css";

export interface IProductTableHeadWithSortProps {
    category: keyof IProduct;
    label: string;
}

const ProductTableHeadWithSort = ({
    category,
    label,
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
            className={`product-table-head-with-sort ${activeClassName}`}
        >
            {label}
            {isActiveHead && sortOrder && (
                <div>{sortOrdersLabels[sortOrder]}</div>
            )}
        </th>
    );
};

export default ProductTableHeadWithSort;
