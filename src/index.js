import DOM from "./domModule";
class Project {
    constructor(title, selected) {
        this.title = title;
        this.tasks = [];
        this.selected = selected;
    }

    delete() {
        projectModule.getProjects().forEach((project, index) => {
            if (project.title === this.title) {
                projectModule.getProjects().splice(index, 1);
            }
        })
    }

    display() {
        projectModule.getProjects().forEach((project) => {
            DOM.writeProjectDOM(project);
        })
    }

    selection() {
        projectModule.getProjects().forEach((project) => {
            project.selected = false;
            this.selected = true;
        })
    }

    displayTasks() {
        this.tasks.forEach((task) => {
            DOM.writeTaskDOM(task);
        })
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
    
    projectIndex = null;

    delete() {
        projectModule.getProjects().forEach((project, index) => {
            if (project.title === this.project) {
                this.projectIndex = index;
            }
        })
        projectModule.getProjects()[this.projectIndex].tasks.forEach((task, index) => {
            if (task.title === this.title) {
                projectModule.getProjects()[this.projectIndex].tasks.splice(index, 1);
            }
        })
    }

    display() {
        projectModule.getProjects()[this.projectIndex].tasks.forEach((task) => {
            DOM.writeTaskDOM(task);
        })
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
    
    const createTask = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                project.tasks.push(new Task(...DOM.readTaskDOM().formValues, project.title));
                DOM.writeTaskDOM(project.tasks[project.tasks.length - 1]);
            }
        })
    }

    return {
        getProjects,
        createProject,
        createTask,
    }
})();

export default projectModule