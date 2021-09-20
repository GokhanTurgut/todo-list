import projectModule from "./index.js"
import { format, parseISO } from 'date-fns'


const DOM = (() => {
    const readProjectDOM = () => {
        const projectTitle = document.getElementById('projectTitle');
        const clearProjectData = () => {
            projectTitle.value = '';
        }
        return {
            title: projectTitle.value,
            clearProjectData,
        }
    }

    const projectsContainer = document.getElementById('projects');
    const writeProjectDOM = project => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('projectContainer');
        projectsContainer.appendChild(projectContainer);
        const title = document.createElement('div');
        title.classList.add('projectTitle');
        title.innerText = project.title;
        title.addEventListener('click', () => {
            project.selection();
            clearDOM(tasksContainer);
            project.displayTasks();
            projectTitleColorResetter();
            title.classList.add('selected');
        })
        projectContainer.appendChild(title);
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('material-icons');
        deleteButton.innerText = 'delete';
        deleteButton.addEventListener('click',() => {
            clearDOM(tasksContainer);
            project.delete();
            clearDOM(projectsContainer);
            project.display();
        })
        projectContainer.appendChild(deleteButton);
        project.selection();

        const projectTitleColorResetter = () => {
            let projectNodes = projectsContainer.childNodes;
            for (let i = 0; i < projectNodes.length; i++) {
                projectNodes[i].firstChild.classList.remove('selected');
            }
        }
        projectTitleColorResetter();
        title.classList.add('selected');
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
        
        let formValues = [formTitle.value, formDescription.value, formDueDate.value, formPriority];
        
        const checkValues = () => {
            let validCheck = false;
            formValues.forEach((value) => {
                if (value === '') {
                    validCheck = true;
                }
            })
            return validCheck;
        }

        const clearTaskData = () => {
            formTitle.value = '';
            formDescription.value = '';
            formDueDate.value = '';
            for (let i = 0; i < formPriorityArray.length; i++) {
                formPriorityArray[i].checked = false;
            }
        }

        return {
            formValues,
            checkValues,
            clearTaskData,
        }
    }
            
    const tasksContainer = document.getElementById('tasks');
    const writeTaskDOM = task => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
        tasksContainer.appendChild(taskContainer);
        const title = document.createElement('div');
        title.classList.add('taskTitle');
        title.innerText = task.title;
        taskContainer.appendChild(title);
        const description = document.createElement('div');
        description.classList.add('taskDescription');
        description.innerText = task.description;
        taskContainer.appendChild(description);
        const dueDate = document.createElement('div');
        dueDate.classList.add('taskDueDate');
        dueDate.innerText = format(parseISO(task.dueDate), 'dd/MM/yyyy');
        taskContainer.appendChild(dueDate);
        const priority = document.createElement('div');
        priority.classList.add('priority', `${task.priority}`);
        taskContainer.appendChild(priority);
        const notesBtn = document.createElement('span');
        notesBtn.classList.add('material-icons', 'taskNotesBtn');
        notesBtn.innerText = 'edit_note';
        notesBtn.addEventListener('click', () => {
            notesInput.value = task.notes;
            notesContainer.classList.toggle('displayNone');
        });
        taskContainer.appendChild(notesBtn);
        const status = document.createElement('div');
        status.classList.add(`${task.status}`);
        status.addEventListener('click', () => {
            status.classList.toggle('done');
        })
        taskContainer.appendChild(status);
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('material-icons', 'taskDeleteBtn');
        deleteButton.innerText = 'delete';
        deleteButton.addEventListener('click', () => {
            task.delete();
            clearDOM(tasksContainer);
            task.display();
        })
        taskContainer.appendChild(deleteButton);
        const notesContainer = document.createElement('div');
        notesContainer.classList.add('notesContainer', 'displayNone');
        const notesInput = document.createElement('input');
        notesInput.classList.add('notesInput');
        const notesAddBtn = document.createElement('span');
        notesAddBtn.classList.add('material-icons', 'notesAddBtn');
        notesAddBtn.innerText = 'done';
        notesAddBtn.addEventListener('click', () => {
            task.notes = notesInput.value;
        })
        const notesCloseBtn = document.createElement('span');
        notesCloseBtn.classList.add('material-icons', 'notesCloseBtn');
        notesCloseBtn.innerText = 'close';
        notesCloseBtn.addEventListener('click', () => {
            notesContainer.classList.toggle('displayNone');
        })
        notesContainer.appendChild(notesInput);
        notesContainer.appendChild(notesAddBtn);
        notesContainer.appendChild(notesCloseBtn);
        taskContainer.appendChild(notesContainer);
    };

    const eventListeners = (() => {
        const addProjectBtn = document.getElementById('projectAdd');
        const warningProjectMessage = document.querySelector('.warningProjectMessage');
        addProjectBtn.addEventListener('click', () => {
        if (readProjectDOM().title === '') {
            warningProjectMessage.classList.remove('displayNone');
        }
        else {
            projectModule.createProject();
            readProjectDOM().clearProjectData();
            clearDOM(tasksContainer);
            warningProjectMessage.classList.add('displayNone');
            taskShowModal.classList.remove('displayNone');
        }
        })
        
        const addTaskBtn = document.getElementById('taskAdd');
        const warningTaskMessage = document.querySelector('.warningTaskMessage');
        addTaskBtn.addEventListener('click', () => {
        if (readTaskDOM().checkValues()) {
            warningTaskMessage.classList.remove('displayNone');
        }
        else {
            projectModule.createTask();
            readTaskDOM().clearTaskData();
            warningTaskMessage.classList.add('displayNone');
        }
        })

        const projectShowModal = document.getElementById('projectShowModal');
        const addProjectForm = document.querySelector('.addProjectForm');
        const projectClose = document.getElementById('projectClose');
        projectShowModal.addEventListener('click', () => {
            addProjectForm.classList.toggle('displayNone');
            warningProjectMessage.classList.add('displayNone');
        })
        projectClose.addEventListener('click', () => {
            addProjectForm.classList.toggle('displayNone');
            warningProjectMessage.classList.add('displayNone');
        })

        const taskShowModal = document.getElementById('taskShowModal');
        const addTaskForm = document.querySelector('.addTaskForm');
        const taskClose = document.getElementById('taskClose');
        taskShowModal.addEventListener('click', () => {
            addTaskForm.classList.toggle('displayNone');
            warningTaskMessage.classList.add('displayNone');
        })
        taskClose.addEventListener('click', () => {
            addTaskForm.classList.toggle('displayNone');
            warningTaskMessage.classList.add('displayNone');
        })

        return {

        }
    })();

    const clearDOM = (container) => {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    }

    return {
        readProjectDOM,
        writeProjectDOM,
        writeTaskDOM,
        readTaskDOM,
    }
})();

export default DOM