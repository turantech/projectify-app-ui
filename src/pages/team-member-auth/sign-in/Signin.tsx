import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "../../../design-system";
import { AppContent, AuthActionLink, AuthWrapper } from "../../components";
import styled from "styled-components";
import { useLocalStorage } from "../../../hooks";

import brooklynBridge from "../../../assets/images/brooklyn-bridge.jpg";
import { admin } from "../../../api";
import { AppContext } from "../../../App";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const ActionLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
`;

const Signin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();
    const [setItem, getItem] = useLocalStorage();
    const { counter, setCounter } = useContext(AppContext);

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const signin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <AuthWrapper imageUrl={brooklynBridge} pageTitle="Sign In">
            <button onClick={() => setCounter(counter + 1)}>{counter}</button>
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
            <ActionLinks>
                <AuthActionLink
                    hintText="Don’t have an account?"
                    linkTo="../admin/sign-up"
                    linkText="Sign Up"
                />
                <AuthActionLink
                    hintText="Forgot password? "
                    linkTo="../team-member/forget-password"
                    linkText="Get Help"
                />
            </ActionLinks>
        </AuthWrapper>
    );
};

export { Signin as TeamMemberSignin };