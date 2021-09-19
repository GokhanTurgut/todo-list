import projectModule from "./index.js"
import { format, parseISO } from 'date-fns'


const DOM = (() => {
    const readProjectDOM = () => {
        const projectTitle = document.getElementById('projectTitle');
        return [projectTitle.value];
    }

    const projectsContainer = document.getElementById('projects');
    const writeProjectDOM = project => {
        const projectContainer = document.createElement('div');
        projectsContainer.appendChild(projectContainer);
        const title = document.createElement('div');
        title.innerText = project.title;
        projectContainer.appendChild(title);
    }

    const readTaskDOM = () => {
        const formTitle = document.getElementById('formTitle');
        const formDescription = document.getElementById('formDescription');
        const formDueDate = document.getElementById('formDueDate');
        const formPriorityArray = document.getElementsByName('priority');
        let formPriority = '';
        for (let i = 0; i < formPriorityArray.length; i++) {
            if(formPriorityArray[i].checked) {
                formPriority = formPriorityArray[i].value;
            }
        }
        const clearData = () => {
            formTitle.value = '';
            formDescription.value = '';
            formDueDate.value = '';
            for (let i = 0; i < formPriorityArray.length; i++) {
                formPriorityArray[i].checked = false;
            }
        }
        return {
            formValues: [formTitle.value, formDescription.value, formDueDate.value, formPriority],
            clearData
        }
    }
            
    const tasksContainer = document.getElementById('tasks');
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
        dueDate.innerText = format(parseISO(task.dueDate), 'dd/MM/yyyy');
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

    const eventListeners = (() => {
        const addProjectBtn = document.getElementById('projectAdd');
        addProjectBtn.addEventListener('click', () => {
        projectModule.createProject();
        })
        
        const addTaskBtn = document.getElementById('taskAdd');
        addTaskBtn.addEventListener('click', () => {
        projectModule.createTask();
        readTaskDOM().clearData();
        })

        const projectShowModal = document.getElementById('projectShowModal');
        const addProjectForm = document.querySelector('.addProjectForm');
        const projectClose = document.getElementById('projectClose');
        projectShowModal.addEventListener('click', () => {
            addProjectForm.classList.toggle('displayNone');
        })
        projectClose.addEventListener('click', () => {
            addProjectForm.classList.toggle('displayNone');
        })

        const taskShowModal = document.getElementById('taskShowModal');
        const addTaskForm = document.querySelector('.addTaskForm');
        const taskClose = document.getElementById('taskClose');
        taskShowModal.addEventListener('click', () => {
            addTaskForm.classList.toggle('displayNone');
        })
        taskClose.addEventListener('click', () => {
            addTaskForm.classList.toggle('displayNone');
        })
    })();

    return {
        readProjectDOM,
        writeProjectDOM,
        writeTaskDOM,
        readTaskDOM,
    }
})();

export default DOM