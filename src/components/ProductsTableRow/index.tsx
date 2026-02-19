import Price from "@components/Price";
import Rating from "@components/Rating";
import { IProduct } from "@domains/Product";
import { ReactElement } from "react";
import "./style.css";

export interface IProductTableRowProps {
    product: IProduct;
}

const ProductTableRow = ({ product }: IProductTableRowProps): ReactElement => {
    return (
        <tr className="product-table-row">
            <td className="col-title product-table-row-cell product-table-row-cell-title">
                <div className="product-table-row-title-wrapper">
                    <div className="product-table-row-thumbnail-wrapper">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="product-table-row-thumbnail"
                            loading="lazy"
                        />
                    </div>
                    <div className="product-table-row-title-info">
                        <span className="product-table-row-title description-text-bold">
                            {product.title}
                        </span>
                        <span className="product-table-row-category caption-text-thin">
                            {product.category}
                        </span>
                    </div>
                </div>
            </td>
            <td className="col-brand product-table-row-cell product-table-row-cell-brand description-text-bold">
                {product.brand}
            </td>
            <td className="col-sku product-table-row-cell product-table-row-cell-sku description-text-thin">
                {product.sku}
            </td>
            <td className="col-rating product-table-row-cell product-table-row-cell-rating">
                <Rating rating={product.rating} />
            </td>
            <td className="col-price product-table-row-cell product-table-row-cell-price">
                <Price value={product.price} />
            </td>
        </tr>
    );
};

export default ProductTableRow;
