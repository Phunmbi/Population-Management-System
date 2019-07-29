import _ from "lodash";
import { Location } from '../../database/models'
import errorHandler from "../../helpers/errorHandler";

/**
 * * Locations Validations
 *
 * @function UserValidator
 * @type {{checkForEmptyInputField: checkForEmptyInputField, checkIfLocationExists: checkIfLocationExists, checkForExistingLocation:checkForExistingLocation}}
 */
const locationsValidator = (() => {
  let errors = [];
  /**
   * Validate request body for locations
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf locationsValidator
   * @function checkUserDetailsSignUp
   */
  const checkForEmptyInputField = (req, res, next) => {
    const reqBody = {
      location: req.body.location,
      male_population: req.body.male_population,
      female_population: req.body.female_population,
      id: req.params.id
    };
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
   * @memberOf locationsValidator
   * @function checkIfLocationExists
   */
  const checkIfLocationExists = async (req, res, next) => {
    const existingLocation = await Location.findAll({
      where: {location_name: req.reqBody.location}
    });

    if (existingLocation.length > 0) {
      errorHandler.handleError("This Location already exists", 401, res);
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
   * @memberOf locationsValidator
   * @function checkForExistingLocation
   */
  const checkForExistingLocation = async (req, res, next) => {
    try {
      const existingLocation = await Location.findByPk(req.reqBody.id);
      if (!existingLocation || existingLocation.length === 0) {
        errorHandler.handleError("This Location does not exist", 401, res);
      } else {
        req.reqBody.existingLocation = existingLocation;
        next();
      }
    } catch (e) {
      errorHandler.handleError("Bad query", 500, res);
    }
  };

  /**
   * Validates for if input field is empty or not
   *
   * @param field - field to be checked
   * @param input - value of field being checked
   * @memberOf locationsValidator
   * @function checkNotEmpty
   * @returns {number|*}
   */
  const checkNotEmpty = (field, input) => {
    switch (field) {
      case "Location":
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
    checkIfLocationExists,
    checkForExistingLocation,
  }
})();

export default locationsValidator;
