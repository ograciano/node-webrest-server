import { Request, Response } from 'express';
import { prisma } from '../../data/postgresdb';
import { TodoRepository, CreateTodoDto, UpdateTodoDto } from '../../domain';

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() },
//     { id: 2, text: 'Buy bread', completedAt: null },
//     { id: 3, text: 'Buy butter', completedAt: new Date() },
// ]

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public  getTodos = async (req:Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        console.log(todos)
        return res.json(todos);
    }

    public  getTodo = async (req:Request, res: Response) => {
        const id = +req.params.id
        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
            
        } catch (error) {
            return res.status(400).json({error })
        }
    }

    public createTodo = async (req:Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error })
        const todo = await this.todoRepository.create(createTodoDto!);
        return res.status(201).json(todo);
    }

    public updateTodo = async(req:Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if (error) return res.status(400).json({ message: error })
        const todo = await this.todoRepository.update(updateTodoDto!);
        return res.json(todo);
    }

    public  deleteTodo = async (req:Request, res: Response) => {
        const id = +req.params.id
        const todo = await this.todoRepository.delete(id);
        return res.json(todo);
    }
}