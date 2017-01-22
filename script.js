


// Handles all of the todos, as well as the methods associated with them
let todoList = {
    todos: [],
    
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    
    toggleCompleted: function(position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    
    toggleAll: function(){
        let totalTodos = this.todos.length;
        let completedTodos = 0;
        
        // get number of completed todos
        this.todos.forEach(function(todo) {
            if (todo.completed === true){
                completedTodos++
            }
        });
        
        // if there are uncompleted todos, set all to true
        this.todos.forEach(function(todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
        
};


// Handles interaction between user input and todoList methods and objects.
let handlers = {
    addTodo: function() {
        todoList.addTodo($('#addTodoTextInput').val());
        $('#addTodoTextInput').val('');
        view.displayTodos();
    },

    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function(position) {
        todoList.toggleCompleted(position);
        //changeTodoPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};


// Handles user input, appearance, and modifies the page.
let view = {
    displayTodos: function() {
        $('ul').html('')
                
        todoList.todos.forEach(function(todo, position) {
            
            let todoLi = document.createElement('li');
            
            todoLi.id = position;
            todoLi.textContent = todo.todoText;
            todoLi.className = "listedTodo";
            todoLi.appendChild(view.createDeleteButton());
            $('ul').append(todoLi);

            // Checks if todo is completed. If it is, it adds the "checked" class to it,
            // which in turn styles it.
            if (todo.completed === true) {
                $('#' + position).toggleClass("checked");
            }
        });
    },
    
    // Creates a "delete" button
    createDeleteButton: function() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = '\u00D7';
        deleteButton.className = 'deleteButton btn btn-danger pull-right';
        return deleteButton;
    },
    
    
    
    
    
    setUpEventListeners: function(){let todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
        
            // Get the element that was clicked on.
            let elementClicked = event.target;
        
            // Check if the elementClicked is a delete button.
            if (elementClicked.className === 'deleteButton btn btn-danger pull-right') {
                // This gets the id of the item on the todo list, and passes it as an
                // argument to handlers.deleteTodo()
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            // Toggles todo between completed === true, and completed === false when clicked on
            } else if (elementClicked.className === 'listedTodo' || 'listedTodo checked') {
                handlers.toggleCompleted(parseInt(elementClicked.id));
            }
        });
    }
};


$(document).ready(function() {
    $("#addTodo").click(handlers.addTodo);
    $("#toggleAll").click(handlers.toggleAll);
});

view.setUpEventListeners();


