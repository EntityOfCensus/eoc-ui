// MUI Imports
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import { useAtomValue } from 'jotai/index'
import { newSurveyAtom } from '@/app/store/atoms'
// import { encrypt, sign, signMessage } from '@othent/kms'
// import Arweave from 'arweave/web'
import { useEffect } from 'react'

import { createDataItemSigner, message } from '@permaweb/aoconnect'

// const TESTING_CENSUS_PROCESS_ID = 'taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8'

const StepReview = ({ activeStep, handleNext, handlePrev, steps }) => {
  const newSurvey = useAtomValue(newSurveyAtom)
  // Hooks
  const theme = useTheme()
  const arweave = null
  // Arweave.init({
  //   host: 'arweave.net',
  //   protocol: 'https',
  //   port: 443
  // })

  const sendToArweave = async () => {
    console.log('survey to send to Arweave ', newSurvey)
    // const res = await signMessage({
    //   d: 'ROJuwTBQwZkw1KP9e98MrdoY3cMOaPM5leDnw1ooPQBsTwUjUQu_zi0J8O6fVLnksHhfWWPruPBKk2mWfcN2yAEJT73R3gwalwOSQLi5FB66uwPoWHbeeFKc08NVw6qlnCokmwHLQlCzKRteLGkO6sGNFH-OMXEanTZEA_vRgBtqZGQNkhaSrI-WV5GjuhDAccQBi_49adjX4yUid0_LrsTnLp0yE48kM7ZFSnOLKunCjESxhqirVNdE1NTMLuR8mtu2T8iLPdRPJklZcSVowGa-L6hb3KvN6BjL4UGMffdiz7hQRbRl6WFxn7TmbsiqoSjwNQLYEEOVgi56FqeiV9FyS2x9ObQ2Vad70kr9Ca1MAUIY-0e5gFo2qvUIcyWOizl7E2bZSnsz1IBATZK_Ee2r0GkFIllgAt2KeC09kuYiBmiM5-gxdIeS3YxDbkHD76CXKBBuPlYCiLGJsILhi9mnM_2KfjfmKw-M5d_9euwlO2sfdkb75042dt3mwjfFrEoIn44axTdAWs1hnw-W14z23_Ki2VXpQrfJ0Vx7PTIoIHZF4CtOu7sY1QCsxc9TDet7-csfOkc5CJ8FFopw2McMPuUnxdymiDWCmTPsOlv1IgaV3RIEds7g5aulvnFZoPrnJepksrssMJUd1lWrBOWE_8gabt78F30yHIMSZIE',
    //   dp: '6ZBV8Vji0y8YR3J_uGqqN0Na_Q9dxlSzLkiVhfAgFwm53Iq7AGzbyQMTuQCp8WFC6nu2MFMr8D9hzwb7htQOaA3eLQKGaz9X-3yWuvd5ayw2oMX5XM2QPfXhjbywUF9YiaCl-FFPV_ayV9OK2oktvs5cMa5NbDPh2VhTmD96_ELuVy6Mtok9jEJXUU_P4c3vmpFRQOlAZ7uG0WkyZapnZICZvvc8TISMSY1ne5J_dhK8TtCurf1P7D9HZ7tKl1drfYa2Wdqtz7m4uBGK9n4C0-fFG29nMmy3zEr2B6IXqEgrYC114p3ZJDsc4d2Lkcv-Pw3c5A-22RL-t7CQDv2e-Q',
    //   dq: 'EbJQy1iXpCSdjapSAy-FFgp2HupI_q8TO9qTDpKH7S0F-h-9Co2G7mNAUCvFZjJRAjo3HaitDpIagdevTFBUbD50Yk9p4Rjgcto_MNNshIff7E89H9-mBWNqzvKuM_hVIUtZVowYdvXcxSgaBx3LqCvr5j3hNLF7o2h-QHNeAudD2Ohh-fTiSZYLrnOVIJ0_FD5o_JHFQqe5Wn6qLmd1U3LlpUY797ngKHu2NY2A4VYXlMDBPUVomii2z_mjmXJ0ZkaiZC3GW6jvfqZb1vm6EO4Am1943XPsN-aIoRtTN_OVx0Ja6NGDKnQ37lLReg2NzG3oxIeYuJRYReTVvFsDNQ',
    //   e: 'AQAB',
    //   ext: true,
    //   kty: 'RSA',
    //   n: 'lI-3g3I3nfTmeQPCIVTSPxJJdZqJygfFk-tbdQwx7sCgQru2_vKP1lLDF2ytO8GJZ5hYTWWkHTdChDJcMOC7uW-VYzta2O1wI0ysKb4aUynxl5f4a9NO4QqF97Y3Hudx_RmVOObQN8TfkIQn1B6O15nCp3LDQHUZbWxZDDsVkNbxnApCtJYPurypws4fKu9GAsz55pcciuLvBC_l0h9_qvPRZGv4_0139BeHgPeoGphb18I_YSsdqqHlnZ3y45lAhnSrr0BJYSVpmJ7Hx6XoqbJIGWVKaawuq5OpjKpbC-2KUh0MFKmHaV3fdTihPWxIMgmDo49Kdsff9_I4UW193JWBcnZnUDrLaFow2fT_6-IziGMq0Yi4S57HeLCKFMD-Y87sUy4K4tgaa16r46vCU77HuHHc_4OsjSW8HudOET5EGO_Dy5faMr0jIlyylafycRXGKowuYaqVe7Jnat7lY-Wze943P9mZN0vvjBSYZIOGwnVoJaZvYtUuDnmlwn82QKNXcyIC0KRtN9Tph7ESmLrvQum_tjwj4LQKsxli0uiJaxoaQvsxG3TsP_IwGL0h9g0MKbcGj8PKqY1W0aDzjMUxnUWqludI5MU32HS3T1gRAGfPQ94T4KLmeDo6sBkXcUbOTKi-TiZDYy404lyE4UDiJmFpXsyE4kycrovz_JU',
    //   p: '7Hb4r74VaTr_hgw_ll8OzVu49ZSsLcYNwB1f8ns-nI7lHvSxEpUmDDct0MpNgy2skAZkufzAEeNucdfiufz5v3_0lxafY7uYqrQE4uHe4MCd_IvEjEr8QMVKW9xiVYHfSFkfJaptPe9P9leXbhJLq1aLd4JdBEW0swe-OkPWBAyeLkgP7xDV5GtgYv2ixzSrntQfMA49_W3eLNapI2bYqICJbqcRTwvKyzUYlRWd1qqLVJdUK7EKPKuBnpcmcDP10QDJWCB1eugOVsRtKnUmypgUChATDZeMlwBomrVmSjqpqorHX3QlElzaXe8SVdrdkAbhh1gkYuwietaW2r3PWQ',
    //   q: 'oNWqEyYgwiFcRyPhYV0PAF_b-sKdcn6GFgEGwB5V-UnZIZwR1P4ZoQFEdibAjtjihIjMe63gF9O7jTIP1WKdAdd604J5XJQql4tYHen3Q9tg9exiGBjrDjdRauBWk0dKSn-vaIgBh06gN9bKHeLGPPnuigVylUWhPj0M2Xew-9IWg5N35mYKGVwZlB7xM_OieK-0RmP3NfYhhWEMkeXKWq2j6mky8WdE67lggIErTlCe3Oav8gkVdoO-j17PFQ3gJVAmcPiZaqgIgW6--TQwO-28YiDh9pWpcQcDN8VdBfUOVkXfYWUkh5faURySS94OMy66CuBXe0NOJZmHsVsLnQ',
    //   qi: 'v6ENxtXvkKhfPR9PWaUw_7xujlOxePZVoiZdAkH-YDW8rBvixXjgi9O6wHxAzUhM_uXZ1IM6wSrbrja88GOwsjYV5cFF-_fcbXQ9uDK3meN2hEHqxZ1W9PkwHiSBKxhnOJADRA-Ovp0K65yxKEIqRSlGprNziwUh6cyUDjctX1ABqfjjYbBB_VEOxEG49byh-xit5hynFloCgua752SYLpQ7iLAbvy88YQsVH9yFf2QEzN8UPXNKIiWlsUH4xoJ6j_hxQ6WB5TT5L1OD_CHNlUYCco-iPGb1--W9gXQOM7gdf0GhR_EhB68zqhDblXaVxg_Cj5KKKH-pu801MPFe7w'
    // })
    // console.log('res', JSON.stringify(res))
    try {
      const messageId = await message({
        process: 'taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8',
        signer: createDataItemSigner({
          d: 'ROJuwTBQwZkw1KP9e98MrdoY3cMOaPM5leDnw1ooPQBsTwUjUQu_zi0J8O6fVLnksHhfWWPruPBKk2mWfcN2yAEJT73R3gwalwOSQLi5FB66uwPoWHbeeFKc08NVw6qlnCokmwHLQlCzKRteLGkO6sGNFH-OMXEanTZEA_vRgBtqZGQNkhaSrI-WV5GjuhDAccQBi_49adjX4yUid0_LrsTnLp0yE48kM7ZFSnOLKunCjESxhqirVNdE1NTMLuR8mtu2T8iLPdRPJklZcSVowGa-L6hb3KvN6BjL4UGMffdiz7hQRbRl6WFxn7TmbsiqoSjwNQLYEEOVgi56FqeiV9FyS2x9ObQ2Vad70kr9Ca1MAUIY-0e5gFo2qvUIcyWOizl7E2bZSnsz1IBATZK_Ee2r0GkFIllgAt2KeC09kuYiBmiM5-gxdIeS3YxDbkHD76CXKBBuPlYCiLGJsILhi9mnM_2KfjfmKw-M5d_9euwlO2sfdkb75042dt3mwjfFrEoIn44axTdAWs1hnw-W14z23_Ki2VXpQrfJ0Vx7PTIoIHZF4CtOu7sY1QCsxc9TDet7-csfOkc5CJ8FFopw2McMPuUnxdymiDWCmTPsOlv1IgaV3RIEds7g5aulvnFZoPrnJepksrssMJUd1lWrBOWE_8gabt78F30yHIMSZIE',
          dp: '6ZBV8Vji0y8YR3J_uGqqN0Na_Q9dxlSzLkiVhfAgFwm53Iq7AGzbyQMTuQCp8WFC6nu2MFMr8D9hzwb7htQOaA3eLQKGaz9X-3yWuvd5ayw2oMX5XM2QPfXhjbywUF9YiaCl-FFPV_ayV9OK2oktvs5cMa5NbDPh2VhTmD96_ELuVy6Mtok9jEJXUU_P4c3vmpFRQOlAZ7uG0WkyZapnZICZvvc8TISMSY1ne5J_dhK8TtCurf1P7D9HZ7tKl1drfYa2Wdqtz7m4uBGK9n4C0-fFG29nMmy3zEr2B6IXqEgrYC114p3ZJDsc4d2Lkcv-Pw3c5A-22RL-t7CQDv2e-Q',
          dq: 'EbJQy1iXpCSdjapSAy-FFgp2HupI_q8TO9qTDpKH7S0F-h-9Co2G7mNAUCvFZjJRAjo3HaitDpIagdevTFBUbD50Yk9p4Rjgcto_MNNshIff7E89H9-mBWNqzvKuM_hVIUtZVowYdvXcxSgaBx3LqCvr5j3hNLF7o2h-QHNeAudD2Ohh-fTiSZYLrnOVIJ0_FD5o_JHFQqe5Wn6qLmd1U3LlpUY797ngKHu2NY2A4VYXlMDBPUVomii2z_mjmXJ0ZkaiZC3GW6jvfqZb1vm6EO4Am1943XPsN-aIoRtTN_OVx0Ja6NGDKnQ37lLReg2NzG3oxIeYuJRYReTVvFsDNQ',
          e: 'AQAB',
          ext: true,
          kty: 'RSA',
          n: 'lI-3g3I3nfTmeQPCIVTSPxJJdZqJygfFk-tbdQwx7sCgQru2_vKP1lLDF2ytO8GJZ5hYTWWkHTdChDJcMOC7uW-VYzta2O1wI0ysKb4aUynxl5f4a9NO4QqF97Y3Hudx_RmVOObQN8TfkIQn1B6O15nCp3LDQHUZbWxZDDsVkNbxnApCtJYPurypws4fKu9GAsz55pcciuLvBC_l0h9_qvPRZGv4_0139BeHgPeoGphb18I_YSsdqqHlnZ3y45lAhnSrr0BJYSVpmJ7Hx6XoqbJIGWVKaawuq5OpjKpbC-2KUh0MFKmHaV3fdTihPWxIMgmDo49Kdsff9_I4UW193JWBcnZnUDrLaFow2fT_6-IziGMq0Yi4S57HeLCKFMD-Y87sUy4K4tgaa16r46vCU77HuHHc_4OsjSW8HudOET5EGO_Dy5faMr0jIlyylafycRXGKowuYaqVe7Jnat7lY-Wze943P9mZN0vvjBSYZIOGwnVoJaZvYtUuDnmlwn82QKNXcyIC0KRtN9Tph7ESmLrvQum_tjwj4LQKsxli0uiJaxoaQvsxG3TsP_IwGL0h9g0MKbcGj8PKqY1W0aDzjMUxnUWqludI5MU32HS3T1gRAGfPQ94T4KLmeDo6sBkXcUbOTKi-TiZDYy404lyE4UDiJmFpXsyE4kycrovz_JU',
          p: '7Hb4r74VaTr_hgw_ll8OzVu49ZSsLcYNwB1f8ns-nI7lHvSxEpUmDDct0MpNgy2skAZkufzAEeNucdfiufz5v3_0lxafY7uYqrQE4uHe4MCd_IvEjEr8QMVKW9xiVYHfSFkfJaptPe9P9leXbhJLq1aLd4JdBEW0swe-OkPWBAyeLkgP7xDV5GtgYv2ixzSrntQfMA49_W3eLNapI2bYqICJbqcRTwvKyzUYlRWd1qqLVJdUK7EKPKuBnpcmcDP10QDJWCB1eugOVsRtKnUmypgUChATDZeMlwBomrVmSjqpqorHX3QlElzaXe8SVdrdkAbhh1gkYuwietaW2r3PWQ',
          q: 'oNWqEyYgwiFcRyPhYV0PAF_b-sKdcn6GFgEGwB5V-UnZIZwR1P4ZoQFEdibAjtjihIjMe63gF9O7jTIP1WKdAdd604J5XJQql4tYHen3Q9tg9exiGBjrDjdRauBWk0dKSn-vaIgBh06gN9bKHeLGPPnuigVylUWhPj0M2Xew-9IWg5N35mYKGVwZlB7xM_OieK-0RmP3NfYhhWEMkeXKWq2j6mky8WdE67lggIErTlCe3Oav8gkVdoO-j17PFQ3gJVAmcPiZaqgIgW6--TQwO-28YiDh9pWpcQcDN8VdBfUOVkXfYWUkh5faURySS94OMy66CuBXe0NOJZmHsVsLnQ',
          qi: 'v6ENxtXvkKhfPR9PWaUw_7xujlOxePZVoiZdAkH-YDW8rBvixXjgi9O6wHxAzUhM_uXZ1IM6wSrbrja88GOwsjYV5cFF-_fcbXQ9uDK3meN2hEHqxZ1W9PkwHiSBKxhnOJADRA-Ovp0K65yxKEIqRSlGprNziwUh6cyUDjctX1ABqfjjYbBB_VEOxEG49byh-xit5hynFloCgua752SYLpQ7iLAbvy88YQsVH9yFf2QEzN8UPXNKIiWlsUH4xoJ6j_hxQ6WB5TT5L1OD_CHNlUYCco-iPGb1--W9gXQOM7gdf0GhR_EhB68zqhDblXaVxg_Cj5KKKH-pu801MPFe7w'
        }),
        // the survey as stringified JSON
        data: JSON.stringify(newSurvey),
        tags: [{ name: 'Action', value: 'AddSurvey' }]
      })

      console.log(messageId)
      return { messageId }
    } catch (error) {
      console.log(error)
      return { messageId: false }
    }
    // // let encryptedSurvey = await encrypt(JSON.stringify(newSurvey))
    // // console.log('encrypted survey ', encryptedSurvey)
    // const transaction = await arweave.createTransaction({
    //   data: JSON.stringify(newSurvey)
    // })
    // const tags = [
    //   { name: 'AppName', value: 'EoC Test' },
    //   { name: 'Content-Type', value: 'application/json' }
    // ]
    // transaction.addTag('Content-Type', 'application/json')
    // const start = performance.now()
    // //
    // // console.log('JWK.n field is:', publicKey)
    // const res = await sign(transaction, tags)
    // const end = performance.now()
    // console.log(`Sign: time taken: ${(end - start) / 1000} seconds,\n`, res)
    // const txn = await arweave.transactions.post(transaction)
    // console.log(txn)
    // handleNext()
  }

  useEffect(() => {
    console.log(newSurvey)
  }, [])

  const sendToArweaveEncrypted = async () => {
    const encryptedData = await encrypt(JSON.stringify(newSurvey))
    const transaction = await arweave.createTransaction({
      data: encryptedData
    })

    const tags = [
      { name: 'AppName', value: 'EoC Test' },
      { name: 'Content-Type', value: 'application/json' }
    ]
    transaction.addTag('Content-Type', 'application/json')
    const start = performance.now()
    const res = await sign(transaction, tags)
    const end = performance.now()
    console.log(`Sign: time taken: ${(end - start) / 1000} seconds,\n`, res)
    const txn = await arweave.transactions.post(transaction)
    console.log(txn)

    handleNext()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <Typography variant='h4' className='mb-4'>
          Almost done! 🚀
        </Typography>
        <Typography className='mb-4'>Confirm your target groups information.</Typography>

        {newSurvey.targetGroups
          .filter(item => item.visible)
          .map((item, index) => (
            <Grid key={index} item xs={12} lg={6}>
              <Typography variant='h5'>{`${item.country}  -  ${item.ir}%, ${item.loi} min`}</Typography>

              <table className='is-full border-collapse'>
                <tbody>
                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>Wanted Completes</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>{item.wantedCompletes}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>Feasible Completes</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>???</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>CPI</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>??? EUR</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>CPTG</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>??? EUR</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          ))}
        <FormControlLabel control={<Switch />} label='I have confirmed the deal details.' />
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className='flex justify-center items-end border rounded is-full bs-auto pbs-3'>
          <img
            alt='review-illustration'
            src='/images/illustrations/characters/6.png'
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' }, 'bs-[230px] lg:bs-[257px]')}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={sendToArweave}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check' />
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepReview
