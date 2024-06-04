import { atom } from 'jotai'

export const countriesAtom = atom([])
export const codesAtom = atom([])
export const mapDataAtom = atom({})
export const newSurveyAtom = atom({
  type: 'survey',
  config: 'easy',
  countryCodes: [],
  countryNames: [],
  wantedRespondents: 1000,
  wantedQuestions: 50,
  targetGroups: []
})
//
export const newSurveyDataAtom = atom({
  question: '',
  type: 'multiple',
  category: '',
  possibleAnswers: [],
  answers: []
})

export const surveyData1Atom = atom({
  question: 'T1 În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?',
  type: 'simple',
  possibleAnswers: [
    '5 ore sau mai puțin',
    '6 - 10 ore',
    '11 - 20 ore',
    'Mai mult de 20 ore',
    'Nu ma uit la TV',
    'Prefer sa nu raspund'
  ],
  answers: []
})

export const surveyData2Atom = atom({
  question: 'T2 În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?',
  type: 'simple',
  possibleAnswers: [
    '5 ore sau mai puțin',
    '6 - 10 ore',
    '11 - 20 ore',
    'Mai mult de 20 ore',
    'Nu ma uit la TV',
    'Prefer sa nu raspund'
  ],
  answers: []
})

export const surveyData3Atom = atom({
  question: 'T3 În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?',
  type: 'multiple',
  possibleAnswers: [
    '5 ore sau mai puțin',
    '6 - 10 ore',
    '11 - 20 ore',
    'Mai mult de 20 ore',
    'Nu ma uit la TV',
    'Prefer sa nu raspund'
  ],
  answers: []
})

export const newArConnectGlobalIsConnected = atom({connected: false})

export const surveyData4Atom = atom({
  question: 'T4 În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?',
  type: 'multiple',
  possibleAnswers: [
    '5 ore sau mai puțin',
    '6 - 10 ore',
    '11 - 20 ore',
    'Mai mult de 20 ore',
    'Nu ma uit la TV',
    'Prefer sa nu raspund'
  ],
  answers: []
})

export const newTargetGroupAtom = atom({
  dob: new Date(),
  gender: 'both',
  country: '',
  surveyData: [surveyData1Atom, surveyData2Atom, surveyData3Atom, surveyData4Atom]
})
export const newProfileSurveyAtom = atom({
  type: 'respondent-survey',
  respondentOthentSub: '',
  targetGroups: [newTargetGroupAtom]
})
