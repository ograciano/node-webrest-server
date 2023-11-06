
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface GetTodoUseCase {
    execute: (id: number) => Promise<TodoEntity>
}

export class GetTodoUseCaseImpl implements GetTodoUseCase {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(id: number): Promise<TodoEntity> {
        return await this.todoRepository.findById(id);
    }
}