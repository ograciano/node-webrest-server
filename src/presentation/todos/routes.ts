import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceIImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const dataSource = new TodoDataSourceIImpl();
        const todoRepository = new TodoRepositoryImpl(dataSource);

        const todosController = new TodosController(todoRepository);

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodo);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);

        return router;
    }
}