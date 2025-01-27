import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './HorizontalTimeline.css'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { MEDIUM_WIDTH } from '../../../../constants'
import useWindowSize from '../../../../hooks/useWindowSize'

const eventsPerView = 3
const eventsPerScroll = 3

type Event = {
    date: string,
    img_path: string,
    title: string,
    description: string,
    year: number,
    month: number
};

type Props = {
  events: Array<Event>,
  years: Array<number>
 };

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../../images/about/timeline/${imgPath}.jpg`)
  } catch (err) {
    return imgPath
  }
}
const singleItem = (event: Event, height: number) => (
  <Card className="myCard">
    <CardMedia
      component="img"
      height={height}
      image={tryRequire(event.img_path)}
      alt={event.title}
      title={event.title}
    />
    <div className="my-info">
      {event.title}
    </div>
    <Row id="event-content" className="justify-content-center">
      <h3 className="mt-4">
        { event.date }
      </h3>
      <p className="col-11">
        { event.description }
      </p>
    </Row>
  </Card>
)

function HorizontalTimeline(props: Props) {
  const { events, years } = props
  events.sort((a, b) => new Date(a.year, a.month, 1) - new Date(b.year, b.month, 1))
  const [selectedYear, setSelectedYear] = React.useState(years[years.length - 1])
  const [mySlider, setSlider] = React.useState(null)
  const { height } = useWindowSize()

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    const selectedIndexFromYear = events.findIndex(
      (roborregosEvent) => roborregosEvent.year === year,
    )
    mySlider?.slickGoTo(selectedIndexFromYear)
  }

  const SamplePrevArrow = () => (
    <div
      role="button"
      tabIndex={0}
      key={0}
      className="slick-prev"
      onMouseDown={mySlider?.slickPrev}
      aria-label="Previous"
    />
  )

  const SampleNextArrow = () => (
    <div
      role="button"
      tabIndex={0}
      key={0}
      className="slick-next"
      onMouseDown={mySlider?.slickNext}
      aria-label="Next"
    />
  )

  const Timeline = () => {
    const totalItems = years.length
    const numberOfActiveItems = years.findIndex((year) => year === selectedYear) + 1
    const progressBarWidth = totalItems > 1
      ? (100 * (numberOfActiveItems - 1)) / (totalItems - 1) : 0

    return (
      <div className="timeline">
        <div className="timeline-progress" style={{ width: `${progressBarWidth}%` }} />
        <div className="timeline-items">
          {years.map((item, i) => (
            <div role="button" onMouseDown={() => handleYearChange(item)} tabIndex={i} key={i} className={`timeline-item${i < numberOfActiveItems ? ' active' : ''}`}>
              <div className="timeline-content">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 1300,
    slidesToShow: eventsPerView,
    slidesToScroll: eventsPerScroll,
    initialSlide: events.length - 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => {
      setSelectedYear(events[current].year)
    },
    responsive: [
      {
        breakpoint: MEDIUM_WIDTH,
        settings: {
          slidesToShow: eventsPerView - 1,
          slidesToScroll: eventsPerScroll > 1 ? eventsPerScroll - 1 : eventsPerScroll,
          infinite: true,
          dots: false,
        },
      },
    ],
  }
  return (
    <Row className="justify-content-center">
      <Col id="horizontal-timeline" xs={11}>
        <Slider ref={setSlider} {...settings}>
          { events.map((e) => singleItem(e, height * 0.6)) }
        </Slider>
      </Col>
      <Timeline />
    </Row>
  )
}

export default HorizontalTimeline
