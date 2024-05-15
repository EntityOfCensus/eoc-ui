import {atom} from 'jotai'

export const countriesAtom = atom([])
export const codesAtom = atom([])
export const mapDataAtom = atom({})
export const newSurveyAtom = atom(
  {
    type: 'survey',
    config: 'easy',
    countryCodes: [],
    countryNames: [],
    wantedRespondents: 1000,
    wantedQuestions: 50,
    targetGroups: []
  })



