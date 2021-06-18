import React from 'react'
import AboutTimeline from './AboutTimeline/AboutTimeline'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import './About.css'
import Carousel from './AboutCarousel/carousel'
import AboutHeader from './AboutHeader/AboutHeader'
import RoborregosVideo from './VideoPlayer/Responsive-Video-Player'

const About = () => {
  const headerTitle = 'About us'
  const headerMainText = ['In 2015, four students organized themselves to compete in the Mexican National Robotics Tournament, reaching a pass to the international. There, they met people from other countries and noticed the potential that Mexico could have.','Motivated, they started RoBorregos, with the intention of sharing knowledge and experiences through generations.']
  const headerSubText = ['Our journey']
  document.title = 'RoBorregos | About'
  return (
    <>
      <HeaderBanner
        title={headerTitle}
        mainText={headerMainText}
        subText={headerSubText}
        bgColorScheme={{ primary: '#FF7549', secondary: '#141213E6' }}
        iconColorScheme={{ primary: '#FF7549', secondary: '#C43F65' }}
      />
      <RoborregosVideo />
      <Carousel />
      <AboutTimeline />
    </>
  )
}

export default About
