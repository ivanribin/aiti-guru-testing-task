import { ProgressSpinner } from "primereact/progressspinner";
import { ReactElement } from "react";

const ProductsTableSkeleton = (): ReactElement => {
    return <ProgressSpinner />;
};

export default ProductsTableSkeleton;
