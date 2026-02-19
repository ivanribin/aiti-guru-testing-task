import { IDefaultLoadListPayload } from "@app-types/index";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

export interface IInfinityScrollUtils {
    invalidateTags: (tags: string[]) => void;
}

export interface IUseQueryHookOptions {
    refetchOnMountOrArgChange?: boolean;
}

export type TUseListQueryHook<TArguments, TData> = (
    arg: TArguments & IDefaultLoadListPayload,
    options?: IUseQueryHookOptions,
) => {
    data?: TData;
    isLoading: boolean;
    isFetching: boolean;
    currentData?: TData;
    error?: unknown;
    refetch: () => void;
    isUninitialized: boolean;
};

export const DEFAULT_LIST_ENTITIES_LIMIT: number = 6;

export interface IDefaultPaginationData {
    total: number;
}

const usePaginationQuery = <
    TArguments,
    TData extends IDefaultPaginationData,
    UseQueryHook extends TUseListQueryHook<TArguments, TData>,
>(
    useQueryHook: UseQueryHook,
    initialArg: TArguments,
    limit = DEFAULT_LIST_ENTITIES_LIMIT,
    listKey?: string,
) => {
    const [packsCount, setPacksCount] = useState<number>(0);
    const [selectedPackNumber, setSelectedPackNumber] = useState<number>(1);

    const [queryOffsetArguments, setQueryOffsetArguments] =
        useState<IDefaultLoadListPayload>({
            limit,
            skip: 0,
        });

    const { data, isLoading, isFetching, error, refetch } = useQueryHook(
        {
            ...initialArg,
            ...queryOffsetArguments,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        setQueryOffsetArguments((previousValue) => ({
            ...previousValue,
            skip: limit * (selectedPackNumber - 1),
        }));
    }, [selectedPackNumber, limit]);

    const reset = useCallback(() => {
        setQueryOffsetArguments({
            limit,
            skip: 0,
        });
        setSelectedPackNumber(1);
    }, [limit]);

    const prevInitialArgRef = useRef(initialArg);

    useEffect(() => {
        if (!data) {
            return;
        }

        setPacksCount(Math.max(1, Math.ceil(data.total / limit)));
    }, [data, limit]);

    useEffect(() => {
        if (!listKey) {
            return;
        }

        reset();
    }, [listKey, reset]);

    useEffect(() => {
        if (
            JSON.stringify(prevInitialArgRef.current) ===
            JSON.stringify(initialArg)
        ) {
            return;
        }

        prevInitialArgRef.current = initialArg;
        reset();
    }, [initialArg, reset]);

    return {
        data,
        error: error as Error | undefined,
        isLoading,
        isFetching,
        reset,
        refetch,
        selectedPackNumber,
        selectPackNumber: setSelectedPackNumber,
        packsCount,
    };
};

export default usePaginationQuery;
