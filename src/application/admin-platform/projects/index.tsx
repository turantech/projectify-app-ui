import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Option } from "design-system";
import { useStore } from "hooks";
import { projectService } from "api";
import { Actions, AdminPopulateProjectsAction } from "store";
import { ProjectStatus } from "types";
import { NoDataPlaceholder, PageHeader } from "application/components";
import { CreateProjectModal } from "./CreateProjectModal";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectsTable } from "./ProjectsTable";
import noProject from "application/assets/illustrations/no-project.svg";

const AdminProjectsPage = () => {
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [isProjectsFetching, setIsProjectsFetching] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortedBy, setSortedBy] = useState("");
    const {
        state: { projects },
        dispatch,
    } = useStore();

    useEffect(() => {
        projectService
            .getAll()
            .then((data) => {
                const action: AdminPopulateProjectsAction = {
                    type: Actions.ADMIN_POPULATE_PROJECTS,
                    payload: data.data,
                };
                dispatch(action);
                setIsProjectsFetching(false);
            })
            .catch((e) => {
                const err = e as Error;
                toast.error(err.message);
            });
    }, []);

    if (isProjectsFetching) return null;

    const handleSetStatusFilter = (filter: Option) => {
        setStatusFilter(filter.value as ProjectStatus);
    };
    const handleSetSortBy = (sortedBy: Option) => {
        setSortedBy(sortedBy.value as string);
    };

    const projectsArr = Object.values(projects);

    const filterProjects = (value: string) => {
        if (value === "all") return projectsArr;
        return projectsArr.filter((project) => project.status === value);
    };
    const filteredProjects = filterProjects(statusFilter);

    return (
        <>
            {!projectsArr.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noProject}
                    text="You don’t have any projects yet!"
                    buttonText="Add a Project"
                    buttonAction={() => setShowCreateProjectModal(true)}
                />
            ) : (
                <>
                    <PageHeader
                        pageTitle="Projects"
                        actionButtonText="Create A Project"
                        actionButtonOnClick={() =>
                            setShowCreateProjectModal(true)
                        }
                    />
                    <ProjectsFilters
                        sortedBy={sortedBy}
                        setSortedBy={handleSetSortBy}
                        selectedStatus={statusFilter}
                        setSelectedStatus={handleSetStatusFilter}
                    />
                    <ProjectsTable data={filteredProjects} />
                </>
            )}
            <CreateProjectModal
                show={showCreateProjectModal}
                closeModal={() => setShowCreateProjectModal(false)}
            />
        </>
    );
};

export { AdminProjectsPage };
