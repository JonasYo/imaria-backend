import { Router } from 'express';

// controllers do projeto
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import ScheduleController from './app/controllers/ScheduleController';
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

routes.get('/services', ServicesController.listServicesAvailable);

routes.get(
  '/services/:date/schedule/:service_id',
  ServicesController.listHoursAvailable
);

// routes.post('/services', ServicesController.create);

// routes.put('/services', AuthController.update);

// routes.delete('/services', AuthController.delete);

routes.get('/schedule/:user_id', ScheduleController.listSchedule);

routes.post('/services/:user_id/schedule', ScheduleController.create);

// routes.put('/schedules', AuthController.singin);

// routes.get('/feed', AuthController.singin);

// routes.post('/feed', AuthController.singin);

// routes.put('/feed', AuthController.singin);

// routes.delete('/feed', AuthController.singin);

// routes.delete('/device', AuthController.singin);

// routes.post('/device', AuthController.singin);

// routes.put('/device', AuthController.singin);

export default routes;
