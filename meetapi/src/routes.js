import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetController from './app/controllers/MeetController';
import OrganizerController from './app/controllers/OrganizerController';
import SubscriberController from './app/controllers/SubscriberController';

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
routes.get('/meets?date&page', MeetController.index);
// Create meet
routes.post('/meets', OrganizerController.store);
// Update meet
routes.put('/meets/:id', OrganizerController.update);
// Delete meet
routes.delete('/meets/:id', OrganizerController.delete);
// Create Subscription
routes.post('/subscriptions', SubscriberController.store);
// List User's Meets
routes.get('/subscriptions', SubscriberController.index);
// Cancel Subscription
routes.delete('/subscriptions/:id', SubscriberController.delete);
// Store file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
