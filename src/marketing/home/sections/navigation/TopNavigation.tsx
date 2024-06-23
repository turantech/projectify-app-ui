import styled from "styled-components";
import { Container } from "marketing/components";
import { Button, Logo } from "design-system";

const TopNavigationBase = styled.nav`
    background-color: var(--primary-12);
    padding: 0 var(--space-30);
`;
const NavigationLayout = styled.div`
    height: 7.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AuthLinks = styled.div`
    display: flex;
    column-gap: var(--space-10);
`;

const NavLinks = styled.div`
    display: flex;
    column-gap: var(--space-12);
`;

export const TopNavigation = () => {
    return (
        <TopNavigationBase>
            <Container>
                <NavigationLayout>
                    <Logo layout="horizontal" size="sm" />
                    <NavLinks>
                        <Button
                            variant="text"
                            size="sm"
                            color="secondary"
                            shape="circle"
                        >
                            Features
                        </Button>
                        <Button
                            variant="text"
                            size="sm"
                            color="secondary"
                            shape="circle"
                        >
                            Pricing
                        </Button>
                        <Button
                            variant="text"
                            size="sm"
                            color="secondary"
                            shape="circle"
                        >
                            Testimonials
                        </Button>
                    </NavLinks>
                    <AuthLinks>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="sm"
                            shape="circle"
                            renderAs="link"
                            navigateTo="admin/sign-up"
                        >
                            Sign up
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="sm"
                            shape="circle"
                            renderAs="link"
                            navigateTo="admin/sign-in"
                        >
                            Login
                        </Button>
                    </AuthLinks>
                </NavigationLayout>
            </Container>
        </TopNavigationBase>
    );
};
