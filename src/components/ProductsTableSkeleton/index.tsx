import { ProgressSpinner } from "primereact/progressspinner";
import { ReactElement } from "react";

const ProductsTableSkeleton = (): ReactElement => {
    return <ProgressSpinner style={{ width: "10rem", height: "10rem" }} />;
};

export default ProductsTableSkeleton;
