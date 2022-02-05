'use strict'
// setCounterTask -----
let counterTask = 0
const noTask = `<div class="no-task"><p class="no-task__text">No task</p></div>`
// add task -----
let itemId = 1
const list = document.querySelector('.list')
const taskInputTextarea = document.querySelector('.task-input__input')
const taskInputButton = document.querySelector('.task-input__button')
// filter select -----
const filterSelectCurrent = document.querySelector('.filter-select-current')
const filterSelectBody = document.querySelector('.filter-select-body')
const filterSelectValueArray = document.querySelectorAll('.filter-select-value')

// setCounterTask -----
setCounterTask()
function setCounterTask() {
	if (counterTask === 0) {
		list.insertAdjacentHTML('afterbegin', noTask)
	}
	if (counterTask !== 0 && document.querySelector('.no-task') !== null) {
		document.querySelector('.no-task__text').closest('.no-task').remove()
	}
}

// add task -----
taskInputTextarea.addEventListener('keydown', event => {
	if (event.code == 'Enter') {
		addNewTask()
	}
})

taskInputButton.addEventListener('click', addNewTask)

function addNewTask() {
	let newTask = `
    <div class="list-item">
      <div class="item" id=${itemId++}>
        <div class="item-important">
            <button class="item-btn-important">
                <span>
                    <i class="fas fa-star"></i>
                </span>
            </button>
        </div>
        <div class="item-label-completed">
            <p>
                completed!
            </p>
        </div>
        <div class="item-body">
            <div class="item-description">
                <p class="item-description__text">
                    ${taskInputTextarea.value}
                </p>
            </div>
            <div class="item-btn-task-status">
                <button class="item-btn-task-status__completed">
                    <span>
                        <i class="fas fa-check"></i>
                    </span>
                </button>
                <button class="item-btn-task-status__delete">
                    <span>
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
      </div>
    </div>`
	if (taskInputTextarea.value.length) {
		list.insertAdjacentHTML('afterbegin', newTask)
		counterTask++
		setCounterTask()
	} else {
		alert('Enter task!')
	}
	taskInputTextarea.value = null
}

//item-btn-task-status -----
list.addEventListener('click', event => {
	if (event.target.className === 'item-btn-task-status__completed') {
		event.target.closest('.item').classList.add('task-completed')
	}
	if (event.target.className === 'item-btn-task-status__delete') {
		let confirmRemove = confirm('After deleting it will not be possible to resume the task!')
		if (confirmRemove) {
			event.target.closest('.list-item').remove()
			counterTask--
			setCounterTask()
		}
	}
	if (event.target.className === 'item-btn-important') {
		event.target.closest('.item-important').classList.toggle('active-important')
	}
})

// filter select -----
filterSelectCurrent.addEventListener('click', () => {
	;(filterSelectCurrent && filterSelectBody).classList.toggle('active-select')

	filterSelectValueArray.forEach(filterSelectValueElement => {
		filterSelectValueElement.addEventListener('click', () => {
			filterSelectCurrent.innerHTML = filterSelectValueElement.innerHTML
			;(filterSelectCurrent && filterSelectBody).classList.remove('active-select')
			filterTask(filterSelectCurrent)
		})
	})
})

function filterTask(currentFilter) {
	let objItem = list.children
	for (const item of objItem) {
		if (counterTask !== 0) {
			item.classList.remove('task-none')
			if (currentFilter.innerText === 'Important') {
				item.classList.add('task-none')
				if (item.querySelector('.active-important')) {
					item.classList.remove('task-none')
				}
			}
			if (currentFilter.innerText === 'Completed') {
				if (!item.querySelector('.task-completed')) {
					item.classList.add('task-none')
				}
			}
			if (currentFilter.innerText === 'Unfulfilled') {
				if (item.querySelector('.task-completed')) {
					item.classList.add('task-none')
				}
			}
		}
	}
}

//dark-theme -----
document.querySelector('.color-modes-toggle-track').addEventListener('click', () => {
	let arrayDarkTheme = ['.notes-body', '.color-modes-toggle-track', '.title__text', '.filter-select', '.task-input', '.list']
	arrayDarkTheme.forEach(elementDarkTheme => {
		addDarkTheme(elementDarkTheme)
	})

	function addDarkTheme(el) {
		document.querySelector(el).classList.toggle('dark-theme')
	}
})
