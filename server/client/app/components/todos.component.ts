import { Component, OnInit } from '@angular/core';
import {TodosService} from '../services/todos.service';
import {Todo} from '../models/todo';
import 'rxjs/add/operator/map';

@Component({
  selector: 'todos',
  templateUrl: 'app/components/todos.component.html',
  providers:[TodosService]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor (private todoService: TodosService ) {

  };

  ngOnInit() {
    this.todos = [];
    this.todoService.getTodos()
        .map(res => res.json())
        .subscribe(todos => this.todos = todos);
  }

  addTodo($event, todoText) {

    if($event.which === 1) {
      var result;
      var newTodo = {
        text: todoText.value,
        isCompleted: false
      }
    }
    console.log("component todo is:" + newTodo);
    result = this.todoService.saveTodo(newTodo);
    result.subscribe( x => {
      this.todos.push(newTodo)
      todoText.value = '';
    })

  }

  updateStatus(todo) {
    var editingTodo = {
    _id: todo._id,
    text : todo.text,
    isCompleted : !todo.isCompleted
    };
    console.log("component todo is:" + editingTodo);
    this.todoService.updateTodo(editingTodo)
        .map( res => res.json())
        .subscribe( data => {
          console.log(data);
          todo.isCompleted = !todo.isCompleted;
        })

  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateTodoText($event, todo) {

    if($event.which === 13) {
      console.log(todo);
      console.log($event.target.value);
      todo.text = $event.target.value;

      var editingTodo = {
        _id : todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this.todoService.updateTodo(editingTodo)
          .map( res => res.json())
          .subscribe( data => {
            this.setEditState(todo, false);
          })

      }
    }

    deleteTodo(todo) {
      var todos = this.todos;

      this.todoService.deleteTodo(todo._id)
          .map(res => res.json())
          .subscribe(data => {
            if(data.n == 1) {
              for (var i = 0;i < todos.length; i++) {
                if (todos[i]._id == todo._id) {
                  todos.splice(i,1);
                }
              }
            }
          })
    }

}
