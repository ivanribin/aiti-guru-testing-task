import InputWithTools, {
    IInputWithToolsProps,
} from "@components/InputWithTools";
import useDebounce from "@hooks/useDebounce";
import SearchIcon from "@assets/icons/search.svg?react";
import { ApiQueryParams } from "@utils/constants";
import { ReactElement, useState } from "react";
import { useSearchParams } from "react-router";

const ProductsSearch = ({
    ...props
}: Omit<IInputWithToolsProps, "onChange" | "value">): ReactElement => {
    const [params, setParams] = useSearchParams();

    const [search, setSearch] = useState<string>("");

    const updateSearchQueryParam = (newSearch: string): void => {
        if (!newSearch) {
            setParams({});

            return;
        }

        setParams({ ...params, [ApiQueryParams.SEARCH]: newSearch });
    };

    const runDebounced = useDebounce(updateSearchQueryParam, 500);

    const onSearchChange = (newSearch: string): void => {
        setSearch(newSearch);

        runDebounced(newSearch);
    };

    return (
        <InputWithTools
            Icon={SearchIcon}
            value={search ?? ""}
            onChange={onSearchChange}
            placeholder="Найти"
            {...props}
        />
    );
};

export default ProductsSearch;
