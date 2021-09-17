/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("class Task {\n    constructor(title, description, dueDate, priority, notes = '', status = false) {\n        this.title = title;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.notes = notes;\n        this.status = status;\n    }\n}\n\nclass Project {\n    constructor(title, selected) {\n        this.title = title;\n        this.tasks = [];\n        this.selected = selected;\n    }\n}\n\nconst DOM = (() => {\n    const tasksContainer = document.getElementById('tasks');\n\n    const readTaskDOM = () => {\n        const formTitle = document.getElementById('formTitle').value;\n        const formDescription = document.getElementById('formDescription').value;\n        const formDueDate = document.getElementById('formDueDate').value;\n        const formPriority = document.querySelector('input[name=\"priority\"]:checked').value;\n\n        return {formTitle, formDescription, formDueDate, formPriority};\n    }\n\n    const writeTaskDOM = task => {\n        const taskContainer = document.createElement('div');\n        tasksContainer.appendChild(taskContainer);\n        const title = document.createElement('div');\n        title.innerText = task.title;\n        taskContainer.appendChild(title);\n        const description = document.createElement('div');\n        description.innerText = task.description;\n        taskContainer.appendChild(description);\n        const dueDate = document.createElement('div');\n        dueDate.innerText = task.dueDate;\n        taskContainer.appendChild(dueDate);\n        const priority = document.createElement('div');\n        priority.innerText = task.priority;\n        taskContainer.appendChild(priority);\n        const notes = document.createElement('div');\n        notes.innerText = task.notes;\n        taskContainer.appendChild(notes);\n        const status = document.createElement('div');\n        status.innerText = task.status;\n        taskContainer.appendChild(status);\n    };\n\n    const projectsContainer = document.getElementById('projects');\n    const writeProjectDOM = project => {\n        const projectContainer = document.createElement('div');\n        projectsContainer.appendChild(projectContainer);\n        const title = document.createElement('div');\n        title.innerText = project.title;\n    }\n\n    return {\n        writeTaskDOM,\n        writeProjectDOM,\n        readTaskDOM,\n    }\n})();\n\nconst projectModule = (() => {\n    let projectsArray = [];\n    const defaultProject = new Project('default', true);\n    projectsArray.push(defaultProject);\n    const displayProjects = () => {\n        return projectsArray;\n    }\n    const createProject = () => {\n        projectsArray.push(new Project())\n    }\n    const createTask = () => {\n        projectsArray.forEach((project) => {\n            if (project.selected) {\n\n            }\n        })\n    }\n    return {\n        displayProjects,\n    }\n})();\n\nconsole.log(projectModule.displayProjects().forEach((element) => {\n    console.log(element);\n}));\nconsole.log(DOM.readTaskDOM())\n// defaultProject.tasks.push(new tasks('cook', 'dinner', 'evening', 'medium', 'none', 'not completed'))\n// DOM.writeTaskDOM(defaultProject.tasks[0]); \n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;