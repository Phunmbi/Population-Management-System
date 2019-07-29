import _ from "lodash";
import { Location, SubLocation } from '../../database/models'
import errorHandler from "../../helpers/errorHandler";

/**
 * * Sub Locations Validations
 *
 * @function subLocationsValidator
 * @type {{checkForEmptyInputField: checkForEmptyInputField, checkIfSubLocationExists: checkIfSubLocationExists, checkForExistingLocation:checkForExistingLocation, checkIfSubLocationExistsForEdit:checkIfSubLocationExistsForEdit}}
 */
const subLocationsValidator = (() => {
  let errors = [];
  /**
   * Validate request body for locations
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf subLocationsValidator
   * @function checkUserDetailsSignUp
   */
  const checkForEmptyInputField = (req, res, next) => {
    const reqBody = {
      subLocation: req.body.sub_location,
      male_population: req.body.male_population,
      female_population: req.body.female_population,
      location: req.params.location || req.params.id
    };
    checkNotEmpty('Sub Location', reqBody.subLocation);
    checkNotEmpty('Location', reqBody.location);
    checkNotEmpty('Male Population', reqBody.male_population);
    checkNotEmpty('Female Population', reqBody.female_population);

    if(errors.length > 0) {
      res.status(400).json({
        success: false,
        error: errors
      });
      errors = []
    }
    else {
      req.reqBody = reqBody;
      next()
    }
  };

  /**
   * Validate request body for whether location already exists
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf subLocationsValidator
   * @function checkIfLocationExists
   */
  const checkIfSubLocationExistsForEdit = async (req, res, next) => {
    const existingSubLocation = await SubLocation.findByPk(req.reqBody.location);

    if (!existingSubLocation || existingSubLocation.length === 0) {
      errorHandler.handleError("This Sub Location does not exist", 401, res);
    } else {
      req.reqBody.existingSubLocation = existingSubLocation;
      next();
    }
  };

  /**
   * Validate request body for whether location already exists
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf subLocationsValidator
   * @function checkIfLocationExists
   */
  const checkIfSubLocationExists = async (req, res, next) => {
    const existingLocation = await SubLocation.findAll({
      where: {sub_location_name: req.reqBody.subLocation}
    });

    if (existingLocation.length > 0) {
      errorHandler.handleError("This Sub Location already exists", 401, res);
    } else {
      next();
    }
  };

  /**
   * Validate request body for whether location already exists
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf subLocationsValidator
   * @function checkForExistingLocation
   */
  const checkForExistingLocation = async (req, res, next) => {
    try {
      const existingLocation = await Location.findByPk(req.reqBody.location);
      if (!existingLocation || existingLocation.length === 0) {
        errorHandler.handleError("This Location does not exist", 401, res);
      } else {
        next();
      }
    } catch (e) {
      /* istanbul ignore next */
      errorHandler.handleError("Bad query", 500, res);
    }
  };

  /**
   * Validates for if input field is empty or not
   *
   * @param field - field to be checked
   * @param input - value of field being checked
   * @memberOf subLocationsValidator
   * @function checkNotEmpty
   * @returns {number|*}
   */
  const checkNotEmpty = (field, input) => {
    switch (field) {
      case "Sub Location":
        if (_.isString(input)) {
          return input.trim().length > 0 ? errors : errors.push({[field]: `${field} cannot be empty`});
        }
        return errors.push({[field]: `${field} must be a string`});
      case "Male Population":
      case "Female Population":
        if (!_.isNumber(input)) {
          return errors.push({[field]: `${field} must be a Number`});
        }
        break
    }
  };

  return {
    checkForEmptyInputField,
    checkIfSubLocationExists,
    checkForExistingLocation,
    checkIfSubLocationExistsForEdit
  }
})();

export default subLocationsValidator;
