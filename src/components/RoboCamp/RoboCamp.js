// @flow
import React, { useState } from 'react'
import RoboCampCarousel from './RoboCampCarousel/RoboCampCarousel'
import HeaderBanner from './RoboCampBanner/RoboCampBanner'
import RoboCampBanner from './HomeMisionVision/HomeMisionVision'
import RoboCampVideo from './RoboCampVideo/RoboCampVideo'
import RoboCampClasses from './RoboCampClasses/RoboCampClasses'
import RoboCampLinks from './RoboCampLinks/RoboCampLinks'
import RoboCampContact from './RoboCampContact/RoboCampContact'

function RoboCamp() {
  document.title = 'RoBorregos | RoboCamp'
  const headerTitle = 'RoboCamp'
  const headerMainText = ["Campamento de robótica para edades entre los 6 y 12 años, en las instalaciones del Tecnológico de Monterrey, Campus Monterrey."]
  const headerSubText = ['Más información']
  const dateText = ['Iniciamos del ** de julio al ** de agosto.']
  const hourText = ['De 8:00 am a 1:00 pm.']
  const placeText = ['Tec de Monterrey, campus Monterrey.']
  const [language, setLanguage] = useState(0)
  return (
    <>
      <HeaderBanner
        title={headerTitle}
        mainText={headerMainText}
        subText={headerSubText}
        date={dateText}
        hour={hourText}
        place={placeText}
        bgColorScheme={{ primary: '#E84B77E6', secondary: '#141213E6' }}
        iconColorScheme={{ primary: '#E84B77', secondary: '#CC2759' }}
      />
      
      <RoboCampContact language={language} />
      <RoboCampBanner />
      <RoboCampLinks />
    </>
  )
}

export default RoboCamp
