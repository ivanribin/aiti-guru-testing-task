import FormField from "@components/FormField";
import useNotifications from "@hooks/useNotifications";
import { ChangeEvent, FormEvent, type ReactElement, useState } from "react";
import type { TApplicationDispatch, TRootState } from "@store/index";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { setIsUserDataLoading } from "@store/slices/User";
import { useDispatch, useSelector } from "react-redux";
import { ISignInUserCredentials } from "@domains/User";
import { signIn } from "@store/slices/User/thunks";
import { AlertMessages } from "@utils/constants";
import { InputText } from "primereact/inputtext";
import { AlertTypes } from "@components/Alert";
import { Password } from "primereact/password";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { paths } from "@router/routes";
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

            createAlert({
                message,
                type: AlertTypes.ERROR,
            });
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

    const isSomeFieldEmpty: boolean = Object.values(formData).some(
        (value: string) => value === "",
    );

    return (
        <form className="username-form" onSubmit={handleSubmit}>
            <FormField label="Логин">
                <InputText
                    value={formData.username ?? ""}
                    className={`form-field-input form-input description-text`}
                    onChange={(event) =>
                        handleFormDataChange(event, "username")
                    }
                    placeholder="Введите свой логин"
                    type="text"
                    required
                />
            </FormField>
            <FormField label="Пароль" styles={{ marginBottom: "1.2rem" }}>
                <Password
                    value={formData.password ?? ""}
                    className="form-field-input form-input"
                    onChange={(event) =>
                        handleFormDataChange(event, "password")
                    }
                    placeholder="Введите свой пароль"
                    required
                />
            </FormField>
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
