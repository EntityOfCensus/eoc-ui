'use client'

// React Imports

// Next Imports

// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import { newArConnectGlobalIsConnected } from '@/app/store/atoms'
import { useAtom } from 'jotai/index'

const ProfileQuestion = ({ questionItem, category }) => {
  const [arConnectGlobalIsConnected, setArConnectGlobalIsConnected] = useAtom(newArConnectGlobalIsConnected)

  const [question, setQuestion] = useState(questionItem)

  const [categoryTitle, setCategoryTitle] = useState(category)

  const handleAnswer = e => {
    let answers = question.answers
    if (question.type == 'simple') {
      if (answers.length > 0) {
        answers.pop()
      }
      answers.push(parseInt(e.target.value))
    } else {
      if (answers.includes(parseInt(e.target.value))) {
        answers.splice(answers.indexOf(parseInt(e.target.value)), 1)
      } else {
        answers.push(parseInt(e.target.value))
      }
    }
    setQuestion(prev => ({
      ...prev,
      answers: answers
    }))
  }

  return (
    categoryTitle == question.category && (
      <Grid item xs={12}>
        <form>
          <FormLabel>{question.question}</FormLabel>
          <RadioGroup row name='radio-buttons-group'>
            {question.possibleAnswers &&
              question.possibleAnswers.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  onChange={handleAnswer}
                  control={
                    question.type === 'simple' ? (
                      <Radio
                        checked={question.answers.includes(index)}
                        disabled={!arConnectGlobalIsConnected.connected}
                      />
                    ) : (
                      <Checkbox
                        checked={question.answers.includes(index)}
                        disabled={!arConnectGlobalIsConnected.connected}
                      />
                    )
                  }
                  label={item}
                />
              ))}
          </RadioGroup>
        </form>
      </Grid>
    )
  )
}
export default ProfileQuestion
