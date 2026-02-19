import FormField from "@components/FormField";
import LockIcon from "@assets/icons/lock.svg?react";
import Alert, { AlertTypes } from "@components/Alert";
import useNotifications from "@hooks/useNotifications";
import CustomPassword from "@components/CustomPassword";
import InputWithTools from "@components/InputWithTools";
import UserIcon from "@assets/icons/user-icon.svg?react";
import type { TApplicationDispatch, TRootState } from "@store/index";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { setIsUserDataLoading } from "@store/slices/User";
import { useDispatch, useSelector } from "react-redux";
import { ISignInUserCredentials } from "@domains/User";
import { signIn } from "@store/slices/User/thunks";
import { AlertMessages } from "@utils/constants";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { paths } from "@router/routes";
import {
    ChangeEvent,
    FormEvent,
    type ReactElement,
    useEffect,
    useState,
} from "react";
import "./style.css";

const LoginForm = (): ReactElement => {
    const dispatch = useDispatch<TApplicationDispatch>();
    const navigate = useNavigate();

    const isUserDataLoading: boolean = useSelector(
        (state: TRootState) => state.user.isUserDataLoading,
    );

    const [formData, setFormData] = useState<Partial<ISignInUserCredentials>>(
        {},
    );

    const { createAlert } = useNotifications();

    const [isRemember, setIsRemember] = useState<boolean>(true);

    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        try {
            dispatch(setIsUserDataLoading(true));
            await dispatch(
                signIn({
                    username: formData.username!,
                    password: formData.password!,
                    isRemember: isRemember,
                }),
            ).unwrap();

            navigate(paths.PRODUCTS.path);

            createAlert({
                message: AlertMessages.LOGIN,
                type: AlertTypes.SUCCESS,
            });
        } catch (error: unknown) {
            const message = error as string;

            setError(message);
        } finally {
            dispatch(setIsUserDataLoading(false));
        }
    };

    const handleFormDataChange = (
        event: ChangeEvent<HTMLInputElement>,
        fieldName: keyof ISignInUserCredentials,
    ): void => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: event.target.value,
        }));
    };

    const handleIsRememberChange = (event: CheckboxChangeEvent): void => {
        setIsRemember(event.checked!);
    };

    useEffect(() => {
        if (!error) {
            return;
        }

        setError("");
    }, [formData, error]);

    const isSomeFieldEmpty: boolean = Object.values(formData).some(
        (value: string) => value === "",
    );

    return (
        <form className="username-form" onSubmit={handleSubmit}>
            <FormField label="Логин">
                <InputWithTools
                    Icon={UserIcon}
                    value={formData.username ?? ""}
                    className={`form-field-input form-input description-text`}
                    onChange={(newUsername) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            ["username"]: newUsername,
                        }));
                    }}
                    placeholder="Введите свой логин"
                    required
                />
            </FormField>
            <FormField label="Пароль" styles={{ marginBottom: "1.2rem" }}>
                <CustomPassword
                    value={formData.password ?? ""}
                    className="form-field-input form-input"
                    onChange={(event) =>
                        handleFormDataChange(event, "password")
                    }
                    placeholder="Введите свой пароль"
                    Icon={LockIcon}
                    required
                />
            </FormField>
            {error && <Alert type={AlertTypes.ERROR} message={error} />}
            <div
                className="form-row"
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    marginBottom: "2rem",
                    gap: "0.5rem",
                }}
            >
                <Checkbox
                    checked={isRemember}
                    onChange={handleIsRememberChange}
                />
                <span className="caption-text">Запомнить данные</span>
            </div>
            <Button
                label="Войти"
                type="submit"
                disabled={isSomeFieldEmpty}
                loading={isUserDataLoading}
                style={{ width: "100%" }}
            />
        </form>
    );
};

export default LoginForm;
