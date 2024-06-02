/*
 * Respondent Profile Survey API
 * Respondent Profile Survey API
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
import RespondentProfileSurveyApiClient from "../RespondentProfileSurveyApiClient";
import Error from '../model/Error';
import NewRespondentProfileSurveyIndex from '../model/NewRespondentProfileSurveyIndex';
import RespondentProfileSurveyIndex from '../model/RespondentProfileSurveyIndex';

/**
* RespondentProfileSurveyIndex service.
* @module api/RespondentProfileSurveyIndexApi
* @version 1.0.0
*/
export default class RespondentProfileSurveyIndexApi {

    /**
    * Constructs a new RespondentProfileSurveyIndexApi.
    * @alias module:api/RespondentProfileSurveyIndexApi
    * @class
    * @param {module:RespondentProfileSurveyApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:RespondentProfileSurveyApiClient#instance
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || RespondentProfileSurveyApiClient.instance;
    }

    /**
     * Callback function to receive the result of the addRespondentProfileSurveyIndex operation.
     * @callback moduleapi/RespondentProfileSurveyIndexApi~addRespondentProfileSurveyIndexCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RespondentProfileSurveyIndex{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a new RespondentProfileSurveyIndex in the store.  Duplicates are not allowed
     * Creates a new RespondentProfileSurveyIndex in the store.  Duplicates are not allowed
     * @param {module:model/NewRespondentProfileSurveyIndex} body RespondentProfileSurveyIndex to add to the store
     * @param {module:api/RespondentProfileSurveyIndexApi~addRespondentProfileSurveyIndexCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    addRespondentProfileSurveyIndex(body, callback) {

      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addRespondentProfileSurveyIndex");
      }

      let pathParams = {

      };
      let queryParams = {

      };
      let headerParams = {

      };
      let formParams = {

      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RespondentProfileSurveyIndex;

      return this.apiClient.callApi(
        '/suvery-index', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the findRespondentProfileSurveyIndexById operation.
     * @callback moduleapi/RespondentProfileSurveyIndexApi~findRespondentProfileSurveyIndexByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RespondentProfileSurveyIndex{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a RespondentProfileSurveyIndex based on a single ID
     * Returns a RespondentProfileSurveyIndex based on a single ID
     * @param {String} id ID of RespondentProfileSurveyIndex to fetch
     * @param {module:api/RespondentProfileSurveyIndexApi~findRespondentProfileSurveyIndexByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    findRespondentProfileSurveyIndexById(id, callback) {

      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling findRespondentProfileSurveyIndexById");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {

      };
      let headerParams = {

      };
      let formParams = {

      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = RespondentProfileSurveyIndex;

      return this.apiClient.callApi(
        '/suvery-index/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the updateRespondentProfileSurveyIndex operation.
     * @callback moduleapi/RespondentProfileSurveyIndexApi~updateRespondentProfileSurveyIndexCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RespondentProfileSurveyIndex{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update RespondentProfileSurveyIndex in the store based on a single ID
     * Update RespondentProfileSurveyIndex in the store based on a single ID
     * @param {module:model/NewRespondentProfileSurveyIndex} body RespondentProfileSurveyIndex to update to the store
     * @param {String} id ID of RespondentProfileSurveyIndex to update
     * @param {module:api/RespondentProfileSurveyIndexApi~updateRespondentProfileSurveyIndexCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateRespondentProfileSurveyIndex(body, id, callback) {

      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateRespondentProfileSurveyIndex");
      }
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateRespondentProfileSurveyIndex");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {

      };
      let headerParams = {

      };
      let formParams = {

      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RespondentProfileSurveyIndex;

      return this.apiClient.callApi(
        '/suvery-index/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}