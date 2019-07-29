import {Location, SubLocation} from '../../database/models';
import errorHandler from '../../helpers/errorHandler';

/**
 * Sub Locations Controller
 *
 * @function subLocationsController
 * @type {{createSubLocation: createSubLocation, editSubLocation:editSubLocation, retrieveSingleSubLocation:retrieveSingleSubLocation, deleteSingleSubLocation:deleteSingleSubLocation}}
 */
const subLocationsController = (() => {
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf subLocationsController
   * @function createLocation
   * @returns {Promise<void>}
   */
  const createSubLocation = async (req, res) => {
    try {
      const {reqBody} = req;
      const newSubLocation = await SubLocation.create({
        sub_location_name: reqBody.subLocation,
        male_population: reqBody.male_population,
        female_population: reqBody.female_population,
        total_population: reqBody.female_population + reqBody.male_population,
        location_reference: reqBody.location
      });

      res.status(201).json({
        success: true,
        newSubLocation,
        message: 'Successfully created the population data for this new Sub-Location',
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
   * @memberOf subLocationsController
   * @function editSubLocation
   * @returns {Promise<void>}
   */
  const editSubLocation = async (req, res) => {
    try {
      const {reqBody} = req;
      const updatedSubLocation = await reqBody.existingSubLocation.update({
        sub_location_name: reqBody.subLocation,
        male_population: reqBody.male_population,
        female_population: reqBody.female_population,
        total_population: reqBody.female_population + reqBody.male_population,
      });

      res.status(200).json({
        success: true,
        updatedSubLocation,
        message: 'Successfully updated population data for this Sub-Location',
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
   * @memberOf subLocationsController
   * @function retrieveSingleSubLocation
   * @returns {Promise<void>}
   */
  const retrieveSingleSubLocation = async (req, res) => {
    try {
      const singleLocation = await SubLocation.findByPk(req.params.id);

      if (!singleLocation || singleLocation.length === 0) {
        return errorHandler.handleError("This location does not exist", 404, res);
      }
      res.status(200).json({
        success: true,
        singleLocation,
        message: 'Successfully retrieved the population data for a single sub Location',
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
   * @memberOf subLocationsController
   * @function deleteSingleSubLocation
   * @returns {Promise<void>}
   */
  const deleteSingleSubLocation = async (req, res) => {
    try {
      const {id} = req.params;
      const singleSubLocation = await Location.findByPk(id);

      if (!singleSubLocation) {
        return errorHandler.handleError("Sub Location does not exist",404,res);
      }

      await singleSubLocation.destroy();

      res.status(200).json({
        success: true,
        contact: singleSubLocation,
        message: 'Successfully deleted Sub Location',
      });
    } catch (e) {
      /* istanbul ignore next */
      errorHandler.handleError("Server Error",500,res);
    }
  };

  return {
    createSubLocation,
    editSubLocation,
    retrieveSingleSubLocation,
    deleteSingleSubLocation
  }
})();

export default subLocationsController;
