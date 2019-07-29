import { Location } from '../../database/models';
import errorHandler from '../../helpers/errorHandler';

/**
 * Locations Controller
 *
 * @function locationsController
 * @type {{createLocation: createLocation, editLocation:editLocation, retrieveAllLocations:retrieveAllLocations, retrieveSingleLocation:retrieveSingleLocation}}
 */
const locationsController = (() => {
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf locationsController
   * @function createLocation
   * @returns {Promise<void>}
   */
  const createLocation = async (req, res) => {
    try {
      const {reqBody} = req;
      const newLocation = await Location.create({
        location_name: reqBody.location,
        male_population: reqBody.male_population,
        female_population: reqBody.female_population,
        total_population: reqBody.female_population + reqBody.male_population
      });

      res.status(201).json({
        success: true,
        newLocation,
        message: 'Successfully created the population data for new Location',
      });
    } catch (e) {
      /* istanbul ignore next */
      errorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf locationsController
   * @function editLocation
   * @returns {Promise<void>}
   */
  const editLocation = async (req, res) => {
    try {
      const {reqBody} = req;
      const updatedLocation = await reqBody.existingLocation.update({
        location_name: reqBody.location,
        male_population: reqBody.male_population,
        female_population: reqBody.female_population,
        total_population: reqBody.female_population + reqBody.male_population
      });

      res.status(200).json({
        success: true,
        updatedLocation,
        message: 'Successfully updated population data for this Location',
      });
    } catch (e) {
      /* istanbul ignore next */
      errorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf locationsController
   * @function retrieveAllLocations
   * @returns {Promise<void>}
   */
  const retrieveAllLocations = async (req, res) => {
    try {
      const locations = await Location.findAll();

      if (locations.length === 0) {
        return errorHandler.handleError("There's no location data available", 404, res);
      }
      res.status(200).json({
        success: true,
        locations,
        message: 'Successfully retrieved the population data for all Locations',
      });
    } catch (e) {
      /* istanbul ignore next */
      errorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf locationsController
   * @function retrieveSingleLocation
   * @returns {Promise<void>}
   */
  const retrieveSingleLocation = async (req, res) => {
    try {
      const singleLocation = await Location.findByPk(req.params.id);

      if (!singleLocation || singleLocation.length === 0) {
        return errorHandler.handleError("This no location does not exist", 404, res);
      }
      res.status(200).json({
        success: true,
        singleLocation,
        message: 'Successfully retrieved the population data for a single Location',
      });
    } catch (e) {
      /* istanbul ignore next */
      errorHandler.handleError("Server Error",500,res);
    }
  };

  return {
    createLocation,
    editLocation,
    retrieveAllLocations,
    retrieveSingleLocation
  }
})();

export default locationsController;
