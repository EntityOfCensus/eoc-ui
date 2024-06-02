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
import RespondentProfileSurveyApiClient from '../RespondentProfileSurveyApiClient';

/**
 * The QuestionStatistic model module.
 * @module model/QuestionStatistic
 * @version 1.0.0
 */
export default class QuestionStatistic {
  /**
   * Constructs a new <code>QuestionStatistic</code>.
   * @alias module:model/QuestionStatistic
   * @class
   * @param profileSurveyStatisticId {String}
   * @param question {String}
   * @param answer {String}
   * @param dateOfBirth {Date}
   * @param country {String}
   */
  constructor(profileSurveyStatisticId, question, answer, dateOfBirth, country) {
    this.profileSurveyStatisticId = profileSurveyStatisticId;
    this.question = question;
    this.answer = answer;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
  }

  /**
   * Constructs a <code>QuestionStatistic</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QuestionStatistic} obj Optional instance to populate.
   * @return {module:model/QuestionStatistic} The populated <code>QuestionStatistic</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new QuestionStatistic();
      if (data.hasOwnProperty('profileSurveyStatisticId'))
        obj.profileSurveyStatisticId = RespondentProfileSurveyApiClient.convertToType(data['profileSurveyStatisticId'], 'String');
      if (data.hasOwnProperty('question'))
        obj.question = RespondentProfileSurveyApiClient.convertToType(data['question'], 'String');
      if (data.hasOwnProperty('answer'))
        obj.answer = RespondentProfileSurveyApiClient.convertToType(data['answer'], 'String');
      if (data.hasOwnProperty('dateOfBirth'))
        obj.dateOfBirth = RespondentProfileSurveyApiClient.convertToType(data['dateOfBirth'], 'Date');
      if (data.hasOwnProperty('country'))
        obj.country = RespondentProfileSurveyApiClient.convertToType(data['country'], 'String');
      if (data.hasOwnProperty('count'))
        obj.count = RespondentProfileSurveyApiClient.convertToType(data['count'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} profileSurveyStatisticId
 */
QuestionStatistic.prototype.profileSurveyStatisticId = undefined;

/**
 * @member {String} question
 */
QuestionStatistic.prototype.question = undefined;

/**
 * @member {String} answer
 */
QuestionStatistic.prototype.answer = undefined;

/**
 * @member {Date} dateOfBirth
 */
QuestionStatistic.prototype.dateOfBirth = undefined;

/**
 * @member {String} country
 */
QuestionStatistic.prototype.country = undefined;

/**
 * @member {Number} count
 */
QuestionStatistic.prototype.count = undefined;
