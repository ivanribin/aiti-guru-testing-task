import Logo from "@components/Logo";
import LoginForm from "@components/LoginForm";
import TextDivider from "@components/TextDivider";
import { ButtonTypes } from "@utils/constants";
import { Button } from "primereact/button";
import { type ReactElement } from "react";
import "./style.css";

const LoginPage = (): ReactElement => {
    return (
        <div className="login-page">
            <div className="login-block">
                <div className="logo-wrapper">
                    <Logo />
                </div>
                <h1 className="login-title">Добро пожаловать!</h1>
                <div className="login-subtitle description-text-secondary centered-text">
                    Пожалуйста, авторизируйтесь
                </div>
                <div className="login-form-wrapper">
                    <LoginForm />
                </div>
                <TextDivider text="или" />
                <p className="login-footer card-section-value">
                    <span className="caption-text-thin">{`Нет аккаунта?`}</span>
                    <Button
                        className={`block-caption-primary-text ${ButtonTypes.LINK}`}
                    >
                        Создать
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
