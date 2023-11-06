import { CreateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface CreateTodoUseCase {
    execute: (dto: CreateTodoDto) => Promise<TodoEntity>
}

export class CreateTodoUseCaseImpl implements CreateTodoUseCase {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return await this.todoRepository.create(dto);
    }
}