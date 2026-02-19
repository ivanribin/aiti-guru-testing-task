import { type TApplicationDispatch, type TRootState } from "@store/index";
import { removeSession, setIsTryAuthorization } from "@store/slices/User";
import { useCallback, useLayoutEffect, type ReactElement } from "react";
import { fetchUserSession } from "@store/slices/User/thunks";
import { setIsLoading } from "@store/slices/Application";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { paths } from "@router/routes";

export interface IProtectedRouteProps {
    children: ReactElement;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    const dispatch = useDispatch<TApplicationDispatch>();
    const navigate = useNavigate();

    const { isUserAuthorized, isTryAuthorization } = useSelector(
        (state: TRootState) => state.user,
    );

    const getSession = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));

            await dispatch(fetchUserSession()).unwrap();
        } catch (_error: unknown) {
            dispatch(removeSession(null));
            navigate(paths.LOGIN.path);
        } finally {
            dispatch(setIsLoading(false));
            dispatch(setIsTryAuthorization(true));
        }
    }, [dispatch, navigate]);

    useLayoutEffect(() => {
        if (isUserAuthorized || isTryAuthorization) {
            return;
        }

        getSession();
    }, [getSession, isUserAuthorized, isTryAuthorization]);

    if (!isUserAuthorized && !isTryAuthorization) {
        return null;
    }

    if (!isUserAuthorized && isTryAuthorization) {
        return <Navigate to={paths.LOGIN.path} />;
    }

    return children;
};

export default ProtectedRoute;
