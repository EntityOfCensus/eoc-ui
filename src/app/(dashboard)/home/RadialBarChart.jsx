'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import {useColorScheme, useTheme} from '@mui/material/styles'

// Util Imports
import {rgbaToHex} from '@/utils/rgbaToHex'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const RadialBarChart = ({serverMode, title, status, percentage}) => {
  // Hooks
  const theme = useTheme()
  const {mode} = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode
  const options = {
    chart: {
      sparkline: {enabled: true},
      parentHeightOffset: 0
    },
    grid: {
      padding: {
        bottom: 5
      }
    },
    stroke: {
      lineCap: 'round',
      curve: 'smooth'
    },
    colors: ['#ff9f9f'],
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: {size: '60%'},
        track: {background: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`), strokeWidth: '40%'},
        dataLabels: {
          name: {show: false},
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '1.5rem',
            color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.9)`)
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 190,
            height: 132
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '1.5rem'
                }
              }
            }
          }
        }
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            width: 195,
            height: 232
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '1.5rem'
                }
              }
            }
          }
        }
      }
    ]
  }
  const buttonText = percentage == 100 ? 'See Results' : 'Open';

  return (
    <Card>
      <CardHeader title={title} subheader={status} className='pbe-0'/>
      <CardContent className='flex flex-col gap-3 items-center'>
        <AppReactApexCharts type='radialBar' height={148} width={'100%'} options={options} series={percentage}/>
        <Button variant='tonal'>{buttonText}</Button>
      </CardContent>
    </Card>
  )
}

export default RadialBarChart
