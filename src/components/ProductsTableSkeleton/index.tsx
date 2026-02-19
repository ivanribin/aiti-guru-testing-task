import { PRODUCTS_COUNT_ON_PAGE } from "@utils/constants";
import { ReactElement } from "react";
import "./style.css";

const ProductsTableSkeleton = (): ReactElement => {
    const skeletonRows = Array(PRODUCTS_COUNT_ON_PAGE).fill(null);

    return (
        <div className="products-table-skeleton-container">
            <table className="products-table products-table-skeleton">
                <thead>
                    <tr className="head-row">
                        <th className="col-title">
                            <div className="skeleton-header-cell" />
                        </th>
                        <th className="col-brand">
                            <div className="skeleton-header-cell" />
                        </th>
                        <th className="col-sku">
                            <div className="skeleton-header-cell" />
                        </th>
                        <th className="col-rating">
                            <div className="skeleton-header-cell" />
                        </th>
                        <th className="col-price">
                            <div className="skeleton-header-cell" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {skeletonRows.map((_, index) => (
                        <tr key={index} className="skeleton-row">
                            <td className="col-title">
                                <div className="skeleton-cell skeleton-cell-title">
                                    <div className="skeleton-thumbnail" />
                                    <div className="skeleton-text-wrapper">
                                        <div className="skeleton-text skeleton-text-title" />
                                        <div className="skeleton-text skeleton-text-category" />
                                    </div>
                                </div>
                            </td>
                            <td className="col-brand">
                                <div className="skeleton-cell skeleton-text skeleton-text-brand" />
                            </td>
                            <td className="col-sku">
                                <div className="skeleton-cell skeleton-text skeleton-text-sku" />
                            </td>
                            <td className="col-rating">
                                <div className="skeleton-cell skeleton-rating">
                                    <div className="skeleton-star" />
                                    <div className="skeleton-star" />
                                    <div className="skeleton-star" />
                                    <div className="skeleton-star" />
                                    <div className="skeleton-star" />
                                </div>
                            </td>
                            <td className="col-price">
                                <div className="skeleton-cell skeleton-text skeleton-text-price" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTableSkeleton;
