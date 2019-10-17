import { Router } from 'express';

// controllers do projeto
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import ServicesController from './app/controllers/ServicesController';

// validadores de dados
import authMiddleware from './app/middlewares/global/auth';
import validateAuthFields from './app/middlewares/auth/validateAuthFields';
import validateUserCreateFields from './app/middlewares/user/validateCreateFields';
import validateUserUpdateFields from './app/middlewares/user/validateUpdateFields';

const routes = new Router();

// rotas do projeto
routes.post('/auth/singin', validateAuthFields, AuthController.singin);

routes.post('/auth/forgot', validateAuthFields, AuthController.forgot);

routes.post('/users', validateUserCreateFields, UserController.create);

routes.put(
  '/users',
  authMiddleware,
  validateUserUpdateFields,
  UserController.update
);

routes.get('/services', ServicesController.list);

routes.post('/services', ServicesController.create);

// routes.put('/services', AuthController.update);

// routes.delete('/services', AuthController.delete);

// routes.get('/feed', AuthController.singin);

// routes.post('/feed', AuthController.singin);

// routes.put('/feed', AuthController.singin);

// routes.delete('/feed', AuthController.singin);

// routes.get('/schedule', AuthController.singin);

// routes.post('/schedule', AuthController.singin);

// routes.put('/schedule', AuthController.singin);

// routes.delete('/device', AuthController.singin);

// routes.post('/device', AuthController.singin);

// routes.put('/device', AuthController.singin);

export default routes;
