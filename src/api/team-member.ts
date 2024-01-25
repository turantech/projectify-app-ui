import { TeamMemberUser } from "../types";

export type GetMeResponseType = {
    data: TeamMemberUser;
};

interface CreatePasswordInput {
    password: string;
    passwordConfirm: string;
    email: string;
}

class TeamMember {
    url: string;
    constructor() {
        this.url = `${
            process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_PROJECTIFY_API_URL_LOCAL
                : process.env.REACT_APP_PROJECTIFY_API_URL
        }/team-members`;
    }

    async getMe(): Promise<GetMeResponseType> {
        try {
            const rawAuthToken = localStorage.getItem("authToken");
            const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
            const response = await fetch(`${this.url}/me`, {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }

    async createPassword(input: CreatePasswordInput, inviteToken: string) {
        console.log(inviteToken);
        try {
            const response = await fetch(`${this.url}/create-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${inviteToken}`,
                },
                body: JSON.stringify(input),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }
}

export const teamMember = new TeamMember();