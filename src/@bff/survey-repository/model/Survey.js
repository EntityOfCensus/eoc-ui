/*
 * Client Survey Repository API
 * Client Survey Repository API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: apiteam@eoc.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.57
 *
 * Do not edit the class manually.
 *
 */
import SurveyRepositoryApiClient from '../SurveyRepositoryApiClient';

/**
 * The Survey model module.
 * @module model/Survey
 * @version 1.0.0
 */
export default class Survey {
  /**
   * Constructs a new <code>Survey</code>.
   * @alias module:model/Survey
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Survey</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Survey} obj Optional instance to populate.
   * @return {module:model/Survey} The populated <code>Survey</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Survey();
      if (data.hasOwnProperty('surveyId'))
        obj.surveyId = SurveyRepositoryApiClient.convertToType(data['surveyId'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = SurveyRepositoryApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('state'))
        obj.state = SurveyRepositoryApiClient.convertToType(data['state'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} surveyId
 */
Survey.prototype.surveyId = undefined;

/**
 * @member {String} name
 */
Survey.prototype.name = undefined;

/**
 * @member {String} state
 */
Survey.prototype.state = undefined;

