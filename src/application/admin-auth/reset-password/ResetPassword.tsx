import { useState } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Input, Toaster } from "design-system";
import { AuthActionLink, AuthWrapper } from "application/components";
import { adminService } from "api";
import pageImg from "application/assets/images/auth-page.jpg";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [searchParams] = useSearchParams();
    const passwordResetToken = searchParams.get("passwordResetToken");

    const navigate = useNavigate();

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleOnChangePasswordConfirm = (value: string) => {
        setPasswordConfirm(value);
    };

    const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await adminService.resetPassword(
                password,
                passwordConfirm,
                passwordResetToken as string
            );

            setPassword("");
            setPasswordConfirm("");

            const toastId = toast.success(response.message);
            setTimeout(() => {
                navigate("/admin/sign-in");
                toast.remove(toastId);
            }, 2000);
        } catch (e) {
            const error = e as Error;
            toast.error(error.message);
        }
    };

    return (
        <>
            <AuthWrapper imageUrl={pageImg} pageTitle="Reset Password">
                <Form onSubmit={resetPassword}>
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={handleOnChangePassword}
                        shape="rounded"
                        size="lg"
                    />
                    <Input
                        type="password"
                        placeholder="New Password Confirmation"
                        value={passwordConfirm}
                        onChange={handleOnChangePasswordConfirm}
                        shape="rounded"
                        size="lg"
                    />

                    <Button color="primary" size="lg" shape="rounded">
                        Reset Password
                    </Button>
                </Form>
                <AuthActionLink
                    hintText="Get Instructions"
                    linkText="Forget password"
                    linkTo="../admin/forget-password"
                />
            </AuthWrapper>
            <Toaster />
        </>
    );
};

export { ResetPassword as AdminResetPassword };
