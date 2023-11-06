import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from '../../domain';


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly todoDataSource: TodoDataSource
    ) {}
    create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDataSource.create(todoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.todoDataSource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.todoDataSource.findById(id);
    }
    update(todoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDataSource.update(todoDto);
    }
    delete(id: number): Promise<TodoEntity> {
        return this.todoDataSource.delete(id);
    }

}