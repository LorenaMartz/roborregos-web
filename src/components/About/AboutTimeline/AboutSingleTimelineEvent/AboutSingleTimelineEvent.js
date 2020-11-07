// @flow
import React, { Component } from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import placeholder from '../../../../images/placeholder-rectangle.png'
import 'react-vertical-timeline-component/style.min.css'
import './AboutSingleTimelineEvent.css'

type StateProperties = {
  hover: boolean
};

const defaultState: StateProperties = {
  hover: false,
}

type Event = {
  date: string,
  img_path: string,
  title: string,
  description: string
};

type Props = {
  event: Event
};

class AboutSingleTimelineEvent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.resolvePropsValues = this.resolvePropsValues.bind(this)
    this.handleHover = this.handleHover.bind(this)
    const { event } = this.props
    this.event = event

    this.date = this.event.date
    this.year = this.date.substr(this.date.length - 4)
    this.backgroundColor = this.resolveColor(this.year)

    this.state = defaultState
  }

  tryRequire = (img_path: string) => {
    try {
      // $FlowFixMe
      return require(`images/about/timeline/${img_path}`) // eslint-disable-line import/no-dynamic-require, global-require
    } catch (err) {
      return placeholder
    }
  }

  resolveColor = (year: number) => {
    const colors = ['rgb(0, 178, 154)', 'rgb(238, 77, 122)', 'rgb(255, 130, 0)', 'rgb(155, 0, 250)']
    return colors[year % 4]
  }

  resolvePosition = (year: number) => (parseInt(year, 10) % 2 ? 'right' : 'left')

  handleHover() {
    const { hover } = this.state
    this.setState({ hover: !hover })
  }

  resolvePropsValues() {
    const { hover } = this.state
    if (hover) {
      this.contentColor = this.backgroundColor
      this.displayContent = 'block'
      this.displayImg = 'none'
    } else {
      this.contentColor = this.backgroundColor
      this.displayContent = 'none'
      this.displayImg = 'block'
    }
  }

  render() {
    this.resolvePropsValues()

    return (
      <VerticalTimelineElement
        date={this.event.date}
        position={this.resolvePosition(this.year)}
        iconStyle={{ background: this.backgroundColor, color: '#fff' }}
        contentStyle={{
          background: this.contentColor,
          color: '#fff',
          boxShadow: '0 0',
          padding: '0',
        }}
        contentArrowStyle={{ borderRight: `7px solid ${this.contentColor}` }}
      >
        <div className="timeline-element-img-container" test-id="1">
          <img
            className="timeline-element-img"
            src={this.tryRequire(this.event.img_path)}
            alt={this.event.img_description}
          />
          <div className="timeline-element-img-title">
            <h3>
              { this.event.title }
            </h3>
          </div>
        </div>
        <div
          test-id="2"
          className="timeline-element-content"
          style={{ background: this.contentColor }}
        >
          <div>
            <h3>
              { this.event.title }
            </h3>
            <p>
              { this.event.description }
            </p>
          </div>
        </div>
      </VerticalTimelineElement>
    )
  }
}

export default AboutSingleTimelineEvent
