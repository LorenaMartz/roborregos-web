// @flow
import React, { useState, useEffect } from "react";
import "./RoboCampContact.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPhone,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Fade from "@material-ui/core/Fade";

type Props = {
  language: number,
};

function RoboCampContact({ language }: Props) {
  const RoboCampContact = [
    {
      title: ["Contacto", "Contact"],
      description: [
        "Si está interesado en participar en el programa de RoboCamp, por favor contáctenos a través de ...",
        "If you are interested in participating in the RoboCamp program, please contact us through...",
      ],
      icon: faPhone,
      color: "#CB6CE6",
    },
    {
      title: ["Costo", "Cost"],
      description: [
        "El curso tiene un costo de $",
        "The camp costs $",
      ],
      icon: faMoneyBill,
      color: "#FFDE59",
    },
  ];

  const button_description = ["", ""];

  /**
  Function to scroll down the window view towards the sponsor packages.
  */
  const scrollToPackages = () => {
    window.scrollBy(0, window.innerHeight * 2 - 85 * 1 - window.scrollY);
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.innerHeight / 2 < window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  return (
    <div className="supportUs-container">
      {visible || window.innerWidth < 992 ? (
        <>
          <Row className="supportUs-types">
            {RoboCampContact.map((support_type, index) => (
              <Fade in {...{ timeout: 1500 }}>
                <Col lg={6} xs={12} className="type-container">
                  <Row>
                    <Col
                      lg={{ span: 12, order: "first" }}
                      xs={{ order: index % 2, span: 6 }}
                    >
                      <Row className="d-flex justify-content-center align-items-center iconStyle">
                        <FontAwesomeIcon
                          className="icon-btn2"
                          icon={support_type.icon}
                          style={{ color: support_type.color }}
                        />
                      </Row>
                      <Row
                        style={{ color: support_type.color }}
                        className="supportUs-title"
                      >
                        {support_type.title[language]}
                      </Row>
                    </Col>
                    <Col lg={12} xs={6} className="supportUs-description">
                      {support_type.description[language]}
                    </Col>
                  </Row>
                </Col>
              </Fade>
            ))}
          </Row>
          <Fade in {...{ timeout: 1500 }}>
            <div className="see-packages-button">
              <p>{button_description[language]}</p>
              <FontAwesomeIcon
                onClick={scrollToPackages}
                icon={faAngleDown}
                className="see-packages-icon"
              />
            </div>
          </Fade>
        </>
      ) : null}
    </div>
  );
}

export default RoboCampContact;
