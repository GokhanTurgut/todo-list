import DOM from "./domModule";
class Project {
    constructor(title, selected) {
        this.title = title;
        this.tasks = [];
        this.selected = selected;
    }
}
class Task {
    constructor(title, description, dueDate, priority, project, notes = '', status = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.notes = notes;
        this.status = status;
    }
}

const projectModule = (() => {
    let projectsArray = [];
    
    const getProjects = () => {
        return projectsArray;
    }
    
    const createProject = () => {
        projectsArray.push(new Project(DOM.readProjectDOM().title, false));
        DOM.writeProjectDOM(projectsArray[projectsArray.length - 1]);
    }

    const projectDelete = (projectTitle) => {
        projectsArray.forEach((project, index) => {
            if (project.title === projectTitle) {
                projectsArray.splice(index, 1);
            }
        })
    }

    const projectDisplay = () => {
        projectsArray.forEach((project) => {
            DOM.writeProjectDOM(project);
        })
    }

    const projectSelectionChecker = () => {
        let projectSelected = false;

        projectsArray.forEach((project) => {
            if (project.selected === true) {
                projectSelected = true;
            }
        })
        return projectSelected;
    }

    const projectSelectionResetter = () => {
        projectsArray.forEach((project) => {
            project.selected = false;
        })
    }

    const projectDisplayTasks = (projectTasks) => {
        projectTasks.forEach((task) => {
            DOM.writeTaskDOM(task);
        })
    }
    
    const createTask = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                project.tasks.push(new Task(...DOM.readTaskDOM().formValues, project.title));
                DOM.writeTaskDOM(project.tasks[project.tasks.length - 1]);
            }
        })
    }

    const taskDelete = (projectTitle, taskTitle) => {
        let projectIndex;
        projectsArray.forEach((project, index) => {
            if (project.title === projectTitle) {
                projectIndex = index;
            }
        })
        projectsArray[projectIndex].tasks.forEach((task, index) => {
            if (task.title === taskTitle) {
                projectsArray[projectIndex].tasks.splice(index, 1);
            }
        })
    }

    const taskDisplay = (projectTitle) => {
        let projectIndex;
        projectsArray.forEach((project, index) => {
            if (project.title === projectTitle) {
                projectIndex = index;
            }
        })
        projectsArray[projectIndex].tasks.forEach((task) => {
            DOM.writeTaskDOM(task);
        })
    }

    const localStorageSave = () => {
        localStorage.clear();
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }

    const localStorageLoad = (() => {
        if (JSON.parse(localStorage.getItem('projects')) !== null) {
            projectsArray = JSON.parse(localStorage.getItem('projects'));
        }
    })();



    return {
        getProjects,
        createProject,
        projectDelete,
        projectDisplay,
        projectSelectionChecker,
        projectSelectionResetter,
        projectDisplayTasks,
        createTask,
        taskDelete,
        taskDisplay,
        localStorageSave,
    }
})();

export default projectModule