'use client'

import React, { Suspense, useEffect } from 'react'

import { VectorMap } from 'react-jvectormap'
import './world-map.css'
import { useAtom } from 'jotai'
import { mapDataAtom } from '@/app/store/atoms'
const { getName } = require('country-list')
import { respondentSurveyData } from '@/app/store/consts'

const toIsoString = date => {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num
    }

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  )
}

const WorldMap = ({ surveyData, onChangeSurveyData }) => {
  const [mapData, setMapData] = useAtom(mapDataAtom)

  const mapClick = (e, countryCode) => {
    let countryCodes = surveyData.countryCodes ? surveyData.countryCodes : []
    let countryNames = surveyData.countryNames ? surveyData.countryNames : []
    let changeTargetGroup = false
    let targetGroup = {}
    if (!surveyData.targetGroups) {
      changeTargetGroup = true
      targetGroup = {
        minimumAge: 18,
        maximumAge: 64,
        gender: 'both',
        country: '',
        visible: true,
        wantedCompletes: '1',
        ir: '',
        loi: '',
        daysInField: '',
        startDate: toIsoString(new Date()).substring(0, 10),
        time: toIsoString(new Date()).substring(0, 10),
        surveyData: JSON.parse(JSON.stringify(respondentSurveyData))
      }
    }
    const index = countryCodes.indexOf(countryCode)
    if (index !== -1) {
      countryCodes.splice(index, 1)
      const namesIndex = countryNames.indexOf(getName(countryCode))
      countryNames.splice(namesIndex, 1)
    } else {
      countryCodes.push(countryCode)
      countryNames.push(getName(countryCode))
    }
    if (changeTargetGroup) {
      onChangeSurveyData(prev => ({
        ...prev,
        countryCodes: countryCodes,
        countryNames: countryNames,
        targetGroups: [targetGroup]
      }))
    } else {
      onChangeSurveyData(prev => ({
        ...prev,
        countryCodes: countryCodes,
        countryNames: countryNames
      }))
    }

    let obj = {}
    if (countryCodes.length > 0) {
      countryCodes && countryCodes.forEach(countryCode => (obj[countryCode] = 5))
      setMapData(obj)
    }
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <VectorMap
        map={'world_mill'}
        backgroundColor='transparent' // change it to ocean blue: #0077be
        zoomOnScroll={true}
        containerStyle={{
          width: '100%'
        }}
        containerClassName='map'
        onRegionTipShow={function (event, el, code) {
          event.preventDefault()
        }}
        onRegionClick={mapClick} // gets the country code
        regionStyle={{
          initial: {
            fill: '#e4e4e4',
            'fill-opacity': 0.9,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 0
          },
          hover: {
            'fill-opacity': 0.6,
            cursor: 'pointer'
          },
          selected: {
            fill: '#D28484FF' // color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        zoomButtons={false}
        zoomAnimate={true}
        series={{
          regions: [
            {
              values: mapData, // this is the map data
              scale: ['#D28484FF'], // your color game's here
              normalizeFunction: 'polynomial'
            }
          ]
        }}
      />
    </Suspense>
  )
}
export default WorldMap
