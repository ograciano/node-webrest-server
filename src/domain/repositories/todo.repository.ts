import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import { TodoEntity } from '../entities/todo.entity';


export abstract class TodoRepository {
    abstract create(todoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract update(todoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract delete(id: number): Promise<TodoEntity>;
}