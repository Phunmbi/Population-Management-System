import express from 'express';
import subLocationsValidator from './subLocationsValidator';
import subLocationsController from './subLocationsController';

const subLocationsRouter = express.Router();

subLocationsRouter.post(
  '/sublocations/:location',
  subLocationsValidator.checkForEmptyInputField,
  subLocationsValidator.checkForExistingLocation,
  subLocationsValidator.checkIfSubLocationExists,
  subLocationsController.createSubLocation
);

subLocationsRouter.put(
  '/sublocations/:id',
  subLocationsValidator.checkForEmptyInputField,
  subLocationsValidator.checkIfSubLocationExistsForEdit,
  subLocationsController.editSubLocation
);

subLocationsRouter.get(
  '/sublocations/:id',
  subLocationsController.retrieveSingleSubLocation
);

subLocationsRouter.delete(
  '/sublocations/:id',
  subLocationsController.deleteSingleSubLocation
);

export default subLocationsRouter;
