import { Request, Response } from 'express';
import { prisma } from '../../data/postgresdb';
import { TodoRepository, CreateTodoDto, UpdateTodoDto, GetTodosUseCaseImpl, GetTodoUseCaseImpl, CreateTodoUseCaseImpl, UpdateTodoUseCaseImpl, DeleteTodoUseCaseImpl } from '../../domain';

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() },
//     { id: 2, text: 'Buy bread', completedAt: null },
//     { id: 3, text: 'Buy butter', completedAt: new Date() },
// ]

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public  getTodos = (req:Request, res: Response) => {
        new GetTodosUseCaseImpl(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error => res.status(400).json({error}));
    }

    public  getTodo = (req:Request, res: Response) => {
        const id = +req.params.id
        new GetTodoUseCaseImpl(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    }

    public createTodo = (req:Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error })
        new CreateTodoUseCaseImpl(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    }

    public updateTodo = (req:Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if (error) return res.status(400).json({ error })
        new UpdateTodoUseCaseImpl(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    }

    public  deleteTodo = (req:Request, res: Response) => {
        const id = +req.params.id
        new DeleteTodoUseCaseImpl(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    }
}