import DOM from "./domModule";
class Project {
    constructor(title, selected) {
        this.title = title;
        this.tasks = [];
        this.selected = selected;
    }
}
class Task {
    constructor(title, description, dueDate, priority, notes = '', status = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }
}

const projectModule = (() => {
    let projectsArray = [];
    
    const defaultProject = new Project('default', true);
    projectsArray.push(defaultProject);
    
    const displayProjects = () => {
        return projectsArray;
    }
    
    const createProject = () => {
        projectsArray.push(new Project(...DOM.readProjectDOM(), false));
        DOM.writeProjectDOM(projectsArray[projectsArray.length - 1]);
    }
    
    const createTask = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                project.tasks.push(new Task(...DOM.readTaskDOM().formValues));
                DOM.writeTaskDOM(project.tasks[project.tasks.length - 1]);
            }
        })
    }
    return {
        displayProjects,
        createProject,
        createTask,
    }
})();

export default projectModule
// console.log(projectModule.displayProjects().forEach((element) => {
//     console.log(element);
// }));


// projectModule.createTask();
// projectModule.displayProjects();
// defaultProject.tasks.push(new tasks('cook', 'dinner', 'evening', 'medium', 'none', 'not completed'))
// DOM.writeTaskDOM(defaultProject.tasks[0]); 