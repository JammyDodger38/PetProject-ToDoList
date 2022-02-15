const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const todoLoad = function () {
    let result = JSON.parse(localStorage.getItem('toDoData'))

    if (result === null) {
        result = []
    }

    return result
}

toDoData = todoLoad()

const render = function () {
    toDoData = toDoData.filter(function (e) {return e})
    localStorage.setItem('toDoData', JSON.stringify(toDoData))
    
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''
    toDoData.forEach(function (item, index) {

        if (item == null) {

        } else {
            const li = document.createElement('li')

            li.classList.add('todo-item')
    
            li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
            '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' + 
            '</div>'
    
            if (item.completed) {
                todoCompleted.append(li)
            } else {
                todoList.append(li)
            }
            
            li.querySelector('.todo-complete').addEventListener('click', function() {
                item.completed = !item.completed
                render()
            })
    
            li.querySelector('.todo-remove').addEventListener('click', function() {
                delete toDoData[index]
                console.log(toDoData);
                render()
            })
        }
    })
}

todoControl.addEventListener('submit', function(event) {
    event.preventDefault()

    if (headerInput.value != '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }
    
        toDoData.push(newToDo)
        headerInput.value = ''
    
        render()
    } else {
        alert('Вы не ввели название дела')
    }
})

render()