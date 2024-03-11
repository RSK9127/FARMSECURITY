import React from "react";
import image from './animations/humidity.png';
import styles from './styles/accordion.css';
import {  useState } from 'react';
const TemperatureAccordion = React.memo(() => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const handleAccordionToggle = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };
    
  
    return (
      <div className='button_bg1'>
        <button className='learnmore'style={styles} onClick={handleAccordionToggle}>{isAccordionOpen ? 'Close Details' : 'Learn More'}</button>
  
        {isAccordionOpen && (
          <div className='para' style={styles}  data-aos="fade-in">
            {/* Detailed information about the ultrasonic sensor */}
              <ul className='content' style={styles}>
                <li>
                  <img src={image} alt="Temperature sensor" style={{height:'350px',width:'250px',backgroundSize:'cover'}} />
                </li>
                <li>
                  <h2 style={{textAlign:'center',fontFamily:"Times new roman",fontStyle:"normal"}}>Humidity Sensor</h2>
                  <br/>
                  <p style={{textAlign:'left',padding:'10px 30px',fontFamily:"poppins"}}>
                    <b>1.Measurement Principle : </b> 
                    Humidity sensors measure the amount of moisture or water vapor present in the air. They work based on various principles such as capacitive, resistive, or thermal conductivity. Capacitive humidity sensors are commonly used due to their accuracy and reliability.
                    <br/>
                    <b>2.Applications : </b> 
                    Humidity sensors find applications in various fields including weather monitoring, HVAC systems, industrial processes, agriculture, and automotive. They are essential for maintaining optimal humidity levels in indoor environments to ensure comfort, prevent mold growth, and preserve sensitive equipment.
                      <br/>
                    <b>3.Calibration : </b> 
                    Humidity sensors require periodic calibration to maintain accuracy. Calibration involves comparing the sensor readings with known humidity levels using calibration chambers or reference instruments. Some sensors come with built-in calibration features, while others may need external calibration.
                      <br/>
                    <b>4.Operating Conditions : </b> 
                    Humidity sensors have specific operating conditions such as temperature range, humidity range, and environmental conditions. It's important to select a sensor that meets the requirements of the intended application. Additionally, factors like response time, stability, and power consumption should be considered when choosing a humidity sensor for a particular use case
                  </p>
                </li>
              </ul>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    );
  });

export default TemperatureAccordion;