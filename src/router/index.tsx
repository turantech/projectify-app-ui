import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { App } from "../App";
import {
    AdminSignin,
    AdminSignup,
    AdminForgetPassword,
    AdminResetPassword,
    AdminPlatform,
    AdminProjectsPage,
    AdminTasksPage,
    AdminTeamMembersPage,
    TeamMemberSignin,
    TeamMemberForgetPassword,
    TeamMemberResetPassword,
    TeamMemberCreatePassword,
    TeamMemberPlatform,
    TeamMemberPersonalTasks,
    AdminAccountActivation,
} from "application";
import { UserRole } from "types";
import { Private } from "./Private";
import { Auth } from "./Auth";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route
                path="admin/activate-account"
                element={
                    <Auth
                        userType={UserRole.admin}
                        component={<AdminAccountActivation />}
                    />
                }
            ></Route>
            <Route
                path="admin/sign-up"
                element={
                    <Auth
                        component={<AdminSignup />}
                        userType={UserRole.admin}
                    />
                }
            />
            <Route
                path="admin/sign-in"
                element={
                    <Auth
                        component={<AdminSignin />}
                        userType={UserRole.admin}
                    />
                }
            />
            <Route
                path="admin/forget-password"
                element={
                    <Auth
                        component={<AdminForgetPassword />}
                        userType={UserRole.admin}
                    />
                }
            />
            <Route
                path="admin/reset-password"
                element={
                    <Auth
                        component={<AdminResetPassword />}
                        userType={UserRole.admin}
                    />
                }
            />
            <Route
                path="admin/platform"
                element={
                    <Private
                        component={<AdminPlatform />}
                        userType={UserRole.admin}
                    />
                }
            >
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="stories" element={<h1>Stories</h1>} />
                <Route path="personal-tasks" element={<AdminTasksPage />} />
                <Route path="team-members" element={<AdminTeamMembersPage />} />
            </Route>

            <Route
                path="team-member/sign-in"
                element={
                    <Auth
                        component={<TeamMemberSignin />}
                        userType={UserRole.teamMember}
                    />
                }
            />
            <Route
                path="team-member/forget-password"
                element={
                    <Auth
                        component={<TeamMemberForgetPassword />}
                        userType={UserRole.teamMember}
                    />
                }
            />
            <Route
                path="team-member/reset-password"
                element={
                    <Auth
                        component={<TeamMemberResetPassword />}
                        userType={UserRole.teamMember}
                    />
                }
            />
            <Route
                path="team-member/create-password"
                element={
                    <Auth
                        component={<TeamMemberCreatePassword />}
                        userType={UserRole.teamMember}
                    />
                }
            />
            <Route
                path="team-member/platform"
                element={
                    <Private
                        component={<TeamMemberPlatform />}
                        userType={UserRole.teamMember}
                    />
                }
            >
                <Route path="stories" element={<h1>Stories</h1>} />
                <Route
                    path="personal-tasks"
                    element={<TeamMemberPersonalTasks />}
                />
                <Route path="team-members" element={<h1>Members</h1>} />
            </Route>
        </>
    )
);
