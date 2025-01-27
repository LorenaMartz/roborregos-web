import React from 'react'
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

class AboutSingleTimelineEvent extends React.Component<Props, *> {
  date: string;

  year: string;

  backgroundColor: string;

  contentColor: string;

  displayContent: string;

  displayImg: string;

  constructor(props: Props) {
    super(props)
    const { event } = this.props
    // this.event = event

    this.date = event.date
    this.year = this.date.substr(this.date.length - 4)
    this.backgroundColor = this.resolveColor()

    this.state = defaultState
  }

  handleHover() {
    const { hover } = this.state
    this.setState({ hover: !hover })
  }

  resolvePosition = (year: string) => (parseInt(year, 10) % 2 ? 'right' : 'left')

  resolveColor = () => 'rgb(255, 117, 73)'

  tryRequire = (img_path: string) => {
    try {
      return require(`../../../../images/about/timeline/${img_path}.jpg`) 
    } catch (err) {
      return placeholder
    }
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
    const { event } = this.props
    return (
      <VerticalTimelineElement
        date={event.date}
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
            src={this.tryRequire(event.img_path)}
            alt={event.description}
          />
          <div className="timeline-element-img-title">
            <h3>
              { event.title }
            </h3>
          </div>
        </div>
        <div
          test-id="2"
          className="timeline-element-content"
          style={{ background: this.contentColor }}
        >
          <div>
            <h3 className="event-title">
              { event.title }
            </h3>
            <p>
              { event.description }
            </p>
          </div>
        </div>
      </VerticalTimelineElement>
    )
  }
}

export default AboutSingleTimelineEvent
