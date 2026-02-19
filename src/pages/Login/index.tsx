import Logo from "@components/Logo";
import LoginForm from "@components/LoginForm";
import { type ReactElement } from "react";
import "./style.css";

const LoginPage = (): ReactElement => {
    return (
        <div className="login-page">
            <div className="login-block">
                <div className="logo-wrapper">
                    <Logo />
                </div>
                <h2 className="login-title h-2-text">Login</h2>
                <LoginForm />
                <p className="login-footer card-section-value">
                    Don’t have an account?{" "}
                    <button className={`block-caption-primary-text`}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
