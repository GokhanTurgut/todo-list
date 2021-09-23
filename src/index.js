import DOM from "./domModule";
import { compareAsc, parseISO, formatDistanceToNowStrict } from "date-fns";
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
    
    // Project Functions

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
    
    // Task Functions

    const taskTodayFilter = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                let todaysTasks = project.tasks.filter((task) => {
                    let remainingDays = formatDistanceToNowStrict(parseISO(task.dueDate), {
                        unit: 'day',
                        roundingMethod: 'floor'
                    }).split(' ');
                    return remainingDays[0] === '0';
                })
                projectDisplayTasks(todaysTasks);
            }
        })
    }

    const taskWeekFilter = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                let weeksTasks = project.tasks.filter((task) => {
                    let remainingDays = formatDistanceToNowStrict(parseISO(task.dueDate), {
                        unit: 'day',
                        roundingMethod: 'floor'
                    }).split(' ');
                    return Number(remainingDays[0]) < 7;
                })
                projectDisplayTasks(weeksTasks);
            }
        })
    }

    const taskSortByPriority = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                let highPriority = project.tasks.filter((task) => {
                    return task.priority === 'High';
                });
                let mediumPriority = project.tasks.filter((task) => {
                    return task.priority === 'Medium';
                });
                let lowPriority = project.tasks.filter((task) => {
                    return task.priority === 'Low';
                });
                project.tasks = [...highPriority, ...mediumPriority, ...lowPriority];
                projectDisplayTasks(project.tasks);     
            }
        })   
    }

    const taskSortByDate = () => {
        projectsArray.forEach((project) => {
            if (project.selected) {
                project.tasks = project.tasks.sort((a, b) => {
                    return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
                });
                projectDisplayTasks(project.tasks);     
            }
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
        taskTodayFilter,
        taskWeekFilter,
        taskSortByPriority,
        taskSortByDate,
        createTask,
        taskDelete,
        taskDisplay,
        localStorageSave,
    }
})();

export default projectModule