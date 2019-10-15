import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetsController from './app/controllers/MeetsController';
import OrganizerController from '.app/controllers/OrganizerController';
import SubscriberController from '.app/controllers/SubscriberController';


import auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Create user
routes.post('/users', UserController.store);
// Login user
routes.post('/sessions', SessionController.store);
// Auth user
routes.use(auth);
// Modify user
routes.put('/users', UserController.update);
// List meets by date
routes.get('/meets?date&page',MeetsController.index);
// Create meet
routes.post('/meets',OrganizerController.store);
// Update meet
route.update('/meets/:id',OrganizerController.update);
// Delete meet
route.delete('/meets/:id',OrganizerController.delete);
// List User's Meets
route.get('/meets',SubscriberController.index);
// Create Subscription
route.post('/meets',SubscriberController.store);
// Cancel Subscription
route.delete('/meets/:id', SubscriberController.delete);
// Store file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
