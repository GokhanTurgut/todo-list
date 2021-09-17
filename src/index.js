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

class Project {
    constructor(title, selected) {
        this.title = title;
        this.tasks = [];
        this.selected = selected;
    }
}

const DOM = (() => {
    const tasksContainer = document.getElementById('tasks');

    const readTaskDOM = () => {
        const formTitle = document.getElementById('formTitle').value;
        const formDescription = document.getElementById('formDescription').value;
        const formDueDate = document.getElementById('formDueDate').value;
        const formPriority = document.querySelector('input[name="priority"]:checked').value;

        return {formTitle, formDescription, formDueDate, formPriority};
    }

    const writeTaskDOM = task => {
        const taskContainer = document.createElement('div');
        tasksContainer.appendChild(taskContainer);
        const title = document.createElement('div');
        title.innerText = task.title;
        taskContainer.appendChild(title);
        const description = document.createElement('div');
        description.innerText = task.description;
        taskContainer.appendChild(description);
        const dueDate = document.createElement('div');
        dueDate.innerText = task.dueDate;
        taskContainer.appendChild(dueDate);
        const priority = document.createElement('div');
        priority.innerText = task.priority;
        taskContainer.appendChild(priority);
        const notes = document.createElement('div');
        notes.innerText = task.notes;
        taskContainer.appendChild(notes);
        const status = document.createElement('div');
        status.innerText = task.status;
        taskContainer.appendChild(status);
    };

    const projectsContainer = document.getElementById('projects');
    const writeProjectDOM = project => {
        const projectContainer = document.createElement('div');
        projectsContainer.appendChild(projectContainer);
        const title = document.createElement('div');
        title.innerText = project.title;
    }

    return {
        writeTaskDOM,
        writeProjectDOM,
        readTaskDOM,
    }
})();

const projectModule = (() => {
    let projectsArray = [];
    const defaultProject = new Project('default', true);
    projectsArray.push(defaultProject);
    const displayProjects = () => {
        return projectsArray;
    }
    const createProject = () => {
        projectsArray.push(new Project())
    }
    const createTask = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {

            }
        })
    }
    return {
        displayProjects,
    }
})();

console.log(projectModule.displayProjects().forEach((element) => {
    console.log(element);
}));
console.log(DOM.readTaskDOM())
// defaultProject.tasks.push(new tasks('cook', 'dinner', 'evening', 'medium', 'none', 'not completed'))
// DOM.writeTaskDOM(defaultProject.tasks[0]); 