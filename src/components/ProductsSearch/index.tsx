import useDebounce from "@hooks/useDebounce";
import { ChangeEvent, ReactElement, useState } from "react";
import { ApiQueryParams } from "@utils/constants";
import { InputText } from "primereact/inputtext";
import { useSearchParams } from "react-router";

const ProductsSearch = (): ReactElement => {
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

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.stopPropagation();

        setSearch(event.target.value);

        runDebounced(event.target.value);
    };

    return (
        <InputText
            value={search ?? ""}
            // className={`form-field-input tertiary-text  ${InputClassnames.AUTHORIZATION}`}
            className={`form-field-input tertiary-text`}
            onChange={onSearchChange}
            placeholder="Найти"
            type="text"
            // variant={TypesOfInput.PRIMARY}
            // size={InputSizes.MEDIUM}
        />
    );
};

export default ProductsSearch;
