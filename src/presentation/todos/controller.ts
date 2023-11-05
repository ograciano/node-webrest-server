import { Request, Response } from 'express';
import { prisma } from '../../data/postgresdb';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() },
//     { id: 2, text: 'Buy bread', completedAt: null },
//     { id: 3, text: 'Buy butter', completedAt: new Date() },
// ]

export class TodosController {

    constructor() { }

    public  getTodos = async (req:Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        return res.json(todos)
    }

    public  getTodo = async (req:Request, res: Response) => {
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ message: 'Id is not a Number' })
        const todo = await prisma.todo.findUnique({where: {id: id}})
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        return res.json(todo)
    }

    public createTodo = async (req:Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error })
        const todo = await prisma.todo.create({
            data: createTodoDto!
        
        })
        console.log(req.body)
        const text = req.body.text
        if (!text) return res.status(400).json({ message: 'Text is required' })
        return res.status(201).json(todo)
    }

    public updateTodo = async(req:Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if (error) return res.status(400).json({ message: error })
        const todo = await prisma.todo.findUnique({where: {id: id}})
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        const updateTodo = await prisma.todo.update({
            where: { id: id },
            data: updateTodoDto!.values
        })
        return res.status(204).json(updateTodo)
    }

    public  deleteTodo = async (req:Request, res: Response) => {
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ message: 'Id is not a Number' })
        const todo = await prisma.todo.findUnique({where: {id: id}})
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        const deleted = await prisma.todo.delete({where: {id: id}})
        deleted ? res.status(204).json(deleted) : res.status(400).json({ message: 'Todo with id not found' })
    }
}