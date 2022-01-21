import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const todos: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
	const text = (req.body as { text: string }).text;
	const newTodo = new Todo(Math.random().toString(), text);
	todos.push(newTodo);
	res.status(201).json({ message: 'Created Todo', todo: newTodo });
};

export const getTodo: RequestHandler = (req, res, next) => {
	res.status(200).json({ todos: todos });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const id = req.params.id;
	const text = (req.body as { text: string }).text;
	const index = todos.findIndex(todo => todo.id === id);

	if (index < 0) {
		throw new Error('Cloud not find todo');
	}

	todos[index] = new Todo(id, text);

	res.status(201).json({ message: 'Updated Todo', todo: todos[index] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const id = req.params.id;
	const index = todos.findIndex(todo => todo.id === id);

	if (index < 0) {
		throw new Error('Cloud not find todo');
	}

	todos.splice(index, 1);

	res.status(201).json({ message: 'Deleted Todo' });
};