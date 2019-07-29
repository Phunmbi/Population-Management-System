import express from 'express';
import locationsValidator from './locationsValidator';
import locationsController from './locationsController';

const locationsRouter = express.Router();

locationsRouter.post(
  '/locations',
  locationsValidator.checkForEmptyInputField,
  locationsValidator.checkIfLocationExists,
  locationsController.createLocation
);

locationsRouter.put(
  '/locations/:id',
  locationsValidator.checkForEmptyInputField,
  locationsValidator.checkForExistingLocation,
  locationsController.editLocation
);

locationsRouter.get(
  '/locations',
  locationsController.retrieveAllLocations
);

locationsRouter.get(
  '/locations/:id',
  locationsController.retrieveSingleLocation
);

export default locationsRouter;
