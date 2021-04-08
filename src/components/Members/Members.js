import React from 'react'
import MembersGrid from './MembersGrid/MembersGrid'
import MembersJoinUs from './MembersJoinUs/MembersJoinUs'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'

function Members() {
  const headerTitle = 'Members'
  const headerMainText = ['RoBorrego’s community is made by students with different skills in robotics, logistics and networking, all joined with a passion for exploring new technologies and sharing their knowledge with everybody.']
  const headerSubText = ['Scroll down and meet the us!']

  return (
    <>
      <HeaderBanner
        title={headerTitle}
        mainText={headerMainText}
        subText={headerSubText}
        bgColorScheme={{ primary: '#005E69E6', secondary: '#141213E6' }}
        iconColorScheme={{ primary: '#00FFFA', secondary: '#C43F65' }}
      />
      <MembersGrid />
      <MembersJoinUs />
    </>
  )
}

export default Members
