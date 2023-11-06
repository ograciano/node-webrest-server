import { prisma } from '../../data/postgresdb';
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain';

export class TodoDataSourceIImpl implements TodoDataSource {
    async create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({data: todoDto!});
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(todo => TodoEntity.fromObject(todo));
    }
    async findById(id: number): Promise<TodoEntity> {
        if(!id) throw new Error('Id is required');
        const todo = await prisma.todo.findFirst({where: {id}});
        if(!todo) throw new Error('Todo not found');
        return TodoEntity.fromObject(todo);
    }
    async update(todoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(todoDto.id);
        const updatedTodo = await prisma.todo.update({where: {id: todoDto.id}, data: todoDto.values});
        return TodoEntity.fromObject(updatedTodo);
    }
    async delete(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deletedTodo = await prisma.todo.delete({where: {id}});
        return TodoEntity.fromObject(deletedTodo);
    }

}