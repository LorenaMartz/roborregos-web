// @flow
import React from "react";
import "./HomeMisionVision.css";

const HomeMisionVision = () => (
  <div className="home-mision-vision-container">
    <div className="home-mision row">
      <div className="mision-overlay row">
        <div className="col-sm-7 text-mision">
          <h1>Aprende con nosotros</h1>
          <p>
            Conoce las bases de la robótica y desarrolla habilidades de
            relevancia. ¡Prepárate para el desafío y diviertete en el proceso!
          </p>
        </div>
      </div>
    </div>
    <div className="home-vision row">
      <div className="vision-overlay row">
        <div className="col-sm-7 offset-sm-5 text-vision">
          <h1> Colabora </h1>
          <p>
            {" "}
            Trabaja con personas con intereses similares para llegar más lejos.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HomeMisionVision;
