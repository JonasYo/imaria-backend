import { Router } from 'express';

// controllers do projeto
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import ScheduleController from './app/controllers/ScheduleController';
import ServicesController from './app/controllers/ServicesController';
import DeviceController from './app/controllers/DeviceController';

// validadores de dados
import authMiddleware from './app/middlewares/auth/auth';
import validateAuthFields from './app/middlewares/global/validateAuthFields';
import validateUserCreateFields from './app/middlewares/user/validateCreateFields';

const routes = new Router();

// rotas do projeto
routes.post('/auth/singin', validateAuthFields, AuthController.singin);

routes.post('/auth/singin/alternative', AuthController.singinAlternative);

routes.post('/auth/forgot', AuthController.forgot);

routes.post('/auth/reset', AuthController.reset);

routes.post('/device', DeviceController.create);

routes.put('/device', DeviceController.update);

routes.post('/users', validateUserCreateFields, UserController.create);

routes.put('/users/:flag', authMiddleware, UserController.update);

routes.get(
  '/services',
  authMiddleware,
  ServicesController.listServicesAvailable
);

routes.get(
  '/services/:date/schedule/:service_id',
  authMiddleware,
  ServicesController.listHoursAvailable
);

routes.get(
  '/schedule/user/:user_id',
  authMiddleware,
  ScheduleController.listUserSchedule
);

routes.get(
  '/schedule/:date/accredited/',
  authMiddleware,
  ScheduleController.listAccreditedSchedule
);

routes.post(
  '/services/:user_id/schedule',
  authMiddleware,
  ScheduleController.create
);

// routes.put('/schedules', AuthController.singin);

// routes.get('/feed', AuthController.singin);

// routes.post('/feed', AuthController.singin);

// routes.put('/feed', AuthController.singin);

// routes.delete('/feed', AuthController.singin);

// routes.delete('/device', AuthController.singin);

export default routes;
