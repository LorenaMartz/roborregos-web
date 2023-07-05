// @flow
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCalendar,
  faHourglass,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../../images/github_pattern.svg";
import "./RoboCampBanner.css";

type ColorScheme = {
  primary: string,
  secondary: string,
};

type AdditionalButton = {
  text: string,
  bgColor: string,
  borderColor: string,
  onClick: () => void,
};

type Props = {
  title: string,
  mainText: Array<string>,
  subText: Array<string>,
  date: Array<string>,
  hour: Array<string>,
  place: Array<string>,
  bgColorScheme: ColorScheme,
  iconColorScheme: ColorScheme,
  additionalButton?: ?AdditionalButton,
};

function HeaderBanner({
  title,
  mainText,
  subText,
  date,
  hour,
  place,
  bgColorScheme,
  iconColorScheme,
  additionalButton,
}: Props) {
  const [iconColor, setIconColor] = useState(iconColorScheme.primary);

  const styles = {
    mainContainer: {
      background: `linear-gradient( 45deg, ${bgColorScheme.secondary} 10%, ${bgColorScheme.primary} 100%), url(${backgroundImage}) top left/auto repeat fixed`,
    },
    iconBtnColor: {
      color: iconColor,
    },
  };

  /**
  Function to scroll down the window view towards th end of the component.
  */
  const scrollToInfo = () => {
    window.scrollBy(0, window.innerHeight - 48 - window.scrollY);
  };

  /**
   * Function to parse array of strings into lines of text in jsx using <br/> tags.
   * @param {text} text: Array of strings, representing each line of text.
   */
  const parseText = (text) =>
    text.map((textLine) => (
      <>
        {textLine}
        <br />
      </>
    ));

  return (
    <div className="main-container" style={styles.mainContainer}>
      <div className="container-legend">
        <h2 className="title-text-banner">{title}</h2>
        <div className="main-text">
          <p>{parseText(mainText)}</p>
          <p>
            <FontAwesomeIcon
              className="icon-btn2"
              onMouseEnter={() => setIconColor(iconColorScheme.secondary)}
              onMouseLeave={() => setIconColor(iconColorScheme.primary)}
              icon={faCalendar}
              style={styles.iconBtnColor}
            />
            {parseText(date)}
          </p>
          <p>
            <FontAwesomeIcon
              className="icon-btn2"
              onMouseEnter={() => setIconColor(iconColorScheme.secondary)}
              onMouseLeave={() => setIconColor(iconColorScheme.primary)}
              icon={faHourglass}
              style={styles.iconBtnColor}
            />
            {parseText(hour)}
          </p>
          <p>
            <FontAwesomeIcon
              className="icon-btn2"
              onMouseEnter={() => setIconColor(iconColorScheme.secondary)}
              onMouseLeave={() => setIconColor(iconColorScheme.primary)}
              icon={faBuilding}
              style={styles.iconBtnColor}
            />
            {parseText(place)}
          </p>
        </div>
        {additionalButton && additionalButton !== null ? (
          <button
            onClick={additionalButton.onClick}
            type="button"
            className="additional-button"
            style={{
              backgroundColor: additionalButton.bgColor,
              border: `1px solid ${additionalButton.borderColor}`,
            }}
          >
            {" "}
            {additionalButton.text}{" "}
          </button>
        ) : null}
      </div>
      <div className="footer">
        <p>{parseText(subText)}</p>
        <FontAwesomeIcon
          className="icon-btn"
          onClick={scrollToInfo}
          onMouseEnter={() => setIconColor(iconColorScheme.secondary)}
          onMouseLeave={() => setIconColor(iconColorScheme.primary)}
          icon={faAngleDown}
          style={styles.iconBtnColor}
        />
      </div>
    </div>
  );
}

HeaderBanner.defaultProps = {
  additionalButton: null,
};

export default HeaderBanner;
