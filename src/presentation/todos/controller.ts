import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
]

export class TodosController {

    constructor() { }

    public async getTodos(req:Request, res: Response) {
        return res.json(todos)
    }

    public async getTodo (req:Request, res: Response) {
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ message: 'Id is not a Number' })
        const todo = todos.find(todo => todo.id === Number(id))
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        return res.json(todo)
    }

    public async createTodo (req:Request, res: Response) {
        console.log(req.body)
        const text = req.body.text
        if (!text) return res.status(400).json({ message: 'Text is required' })
        const todo = { id: todos.length + 1, text, completedAt: new Date() }
        todos.push(todo)
        return res.status(201).json(todo)
    }

    public async updateTodo (req:Request, res: Response) {
        const id = +req.params.id
        const completedAt = req.body.completedAt
        const text = req.body.text
        if(isNaN(id)) return res.status(400).json({ message: 'Id is not a Number' })
        const todo = todos.find(todo => todo.id === Number(id))
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        if (!text) return res.status(400).json({ message: 'Text is required' })
        todo.text = text || todo.text;
        (completedAt === 'null') ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt) 
        return res.status(204).json(todo)
    }

    public async deleteTodo (req:Request, res: Response) {
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ message: 'Id is not a Number' })
        const todo = todos.find(todo => todo.id === Number(id))
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        todos.splice(todos.indexOf(todo), 1)
        return res.status(204).json(todo)
    }
}