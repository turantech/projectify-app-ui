import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SideBar, SideBarLinks, SideBarLinksGroup } from "design-system";
import { useLocalStorage, useStore } from "hooks";
import { AppPage, AppLayout, SideBarUser } from "application/components";

import { Actions } from "../../store";

const links: SideBarLinksGroup[] = [
    {
        title: "Menu",
        links: [
            {
                linkText: "Stories",
                linkTo: "stories",
                iconName: "stories",
            },
            {
                linkText: "Personal Tasks",
                linkTo: "personal-tasks",
                iconName: "tasks",
            },
        ],
    },
];

const Platform = () => {
    const navigate = useNavigate();
    const {
        state: { user },
        dispatch,
    } = useStore();
    const { removeItem } = useLocalStorage();

    const logOut = () => {
        removeItem("authToken");
        removeItem("userRole");
        dispatch({ type: Actions.RESET_STATE });
        navigate("/team-member/sign-in");
    };

    return (
        <AppLayout>
            <SideBar>
                <SideBarUser
                    details={{
                        firstName: user?.firstName || "",
                        lastName: user?.lastName || "",
                        imageUrl: "",
                        email: user?.email || "",
                    }}
                />
                <SideBarLinks links={links} logOut={logOut} />
            </SideBar>
            <AppPage>
                <Outlet />
            </AppPage>
        </AppLayout>
    );
};

export { Platform as TeamMemberPlatform };
