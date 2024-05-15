'use client'

import React, {Suspense} from "react";

import {VectorMap} from "react-jvectormap";
import './world-map.css'
import {useAtom} from 'jotai'
import {mapDataAtom, newSurveyAtom} from '../../src/app/store/atoms';

const {getName} = require("country-list");

const WorldMap = () => {
  const [newSurvey, setNewSurvey] = useAtom(newSurveyAtom)
  const [mapData, setMapData] = useAtom(mapDataAtom)

  const mapClick = (e, countryCode) => {
    const index = newSurvey.countryCodes.indexOf(countryCode)
    if (index !== -1) {
      newSurvey.countryCodes.splice(index, 1)
      const namesIndex = newSurvey.countryNames.indexOf(getName(countryCode))
      newSurvey.countryNames.splice(namesIndex, 1)
    } else {
      newSurvey.countryCodes.push(countryCode)
      newSurvey.countryNames.push(getName(countryCode));
    }

    setNewSurvey(prev => ({
      ...prev,
      countryCodes: newSurvey.countryCodes,
      countryNames: newSurvey.countryNames
    }))

    let obj = {};
    if (newSurvey.countryCodes.length > 0) {
      newSurvey.countryCodes && newSurvey.countryCodes.forEach(countryCode => (obj[countryCode] = 5))
      setMapData(obj)
    }
  };

  return (<Suspense fallback={<>Loading...</>}>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent" // change it to ocean blue: #0077be
        zoomOnScroll={true}
        containerStyle={{
          "width": "100%",
        }}
        containerClassName="map"

        onRegionTipShow={function (event, el, code) {
          event.preventDefault()
        }}

        onRegionClick={mapClick} // gets the country code

        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.6,
            cursor: "pointer"
          },
          selected: {
            fill: "#D28484FF" // color for the clicked country
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
              scale: ["#D28484FF"], // your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
    </Suspense>
  )
}
export default WorldMap

