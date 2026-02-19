import useNotifications from "@hooks/useNotifications";
import FormField, { FormFieldClassnames } from "@components/FormField";
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
            <FormField
                className={`tertiary-text ${FormFieldClassnames.AUTHORIZATION}`}
                label="Email or username"
            >
                <InputText
                    value={formData.username ?? ""}
                    className={`form-field-input tertiary-text`}
                    onChange={(event) =>
                        handleFormDataChange(event, "username")
                    }
                    placeholder="Enter your email or username"
                    type="text"
                    required
                />
            </FormField>

            <FormField
                className={`tertiary-text ${FormFieldClassnames.AUTHORIZATION}`}
                label="Password"
            >
                <Password
                    value={formData.password ?? ""}
                    className="form-field-input"
                    onChange={(event) =>
                        handleFormDataChange(event, "password")
                    }
                    placeholder="Enter your password"
                    required
                />
            </FormField>
            <div
                className="form-row"
                style={{
                    display: "flex",
                    justifyContent: "start",
                    marginBottom: "2rem",
                }}
            >
                <Checkbox
                    checked={isRemember}
                    onChange={handleIsRememberChange}
                />
            </div>
            <Button
                className="tertiary-text"
                label="Login"
                type="submit"
                disabled={isSomeFieldEmpty}
                loading={isUserDataLoading}
            />
        </form>
    );
};

export default LoginForm;
