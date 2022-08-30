let todoInput, errorInfo, addBtn, ulList, tools, newTodos
let popup, popupInfo, toodoToEdit, popupInput, popupAddBtn, popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}
const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodos = document.createElement('li')
		newTodos.textContent = todoInput.value
		crearteToolsArea()
		ulList.append(newTodos)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}
const crearteToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodos.append(toolsPanel)
	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const removeBtn = document.createElement('button')
	removeBtn.classList.add('delete')
	removeBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(compliteBtn, editBtn, removeBtn)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
		closePopup()
	
	}
}

const editTodo = e => {
	popup.style.display = 'flex'
	toodoToEdit = e.target.closest('li')
	popupInput.value = toodoToEdit.firstChild.textContent
}
const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		toodoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = e => {
	e.target.closest('div').parentElement.remove()
	const allTodos = ulList.querySelectorAll('li')
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście...'
	}
}
const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)
