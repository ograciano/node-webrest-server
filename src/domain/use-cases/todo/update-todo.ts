import { UpdateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface UpdateTodoUseCase {
    execute: (dto: UpdateTodoDto) => Promise<TodoEntity>
}

export class UpdateTodoUseCaseImpl implements UpdateTodoUseCase {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return await this.todoRepository.update(dto);
    }
}