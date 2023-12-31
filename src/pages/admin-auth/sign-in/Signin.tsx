import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "../../../design-system";
import { AuthWrapper } from "../../components";
import styled from "styled-components";

import brooklynBridge from "../../../assets/images/brooklyn-bridge.jpg";
import { admin } from "../../../api";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const Signin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const signin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsFormSubmitting(true);
            const { token } = await admin.signIn({
                email,
                password,
            });
            localStorage.setItem("authToken", token);
            navigate("/admin/platform");

            setIsFormSubmitting(false);
            setEmail("");
            setPassword("");
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                setIsFormSubmitting(false);
                setIsError(true);
            }
        }
    };

    return (
        <AuthWrapper imageUrl={brooklynBridge} pageTitle="Sign In">
            <Form onSubmit={signin}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleOnChangePassword}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />
                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    disabled={isFormSubmitting}
                >
                    Sign In
                </Button>
            </Form>
        </AuthWrapper>
    );
};

export { Signin as AdminSignin };
