import React from "react";
import image from './animations/soil.jpg';
import styles from './styles/accordion.css';
import {  useState } from 'react';
const AirQualityAccordion = React.memo(() => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const handleAccordionToggle = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };
    
  
    return (
      <div className='button_bg2'>
        <button className='learnmore'style={styles} onClick={handleAccordionToggle}>{isAccordionOpen ? 'Close Details' : 'Learn More'}</button>
  
        {isAccordionOpen && (
          <div className='para' style={styles}  data-aos="fade-in">
            {/* Detailed information about the ultrasonic sensor */}
              <ul className='content' style={styles}>
                <li>
                  <img src={image} alt="Air filter sensor" style={{height:'350px',width:'250px',backgroundSize:'cover'}} />
                </li>
                <li>
                <h2 style={{textAlign:'center',fontFamily:"Times new roman",fontStyle:"normal"}}>Soil Moisture Sensor</h2>
                <br/>
                <p style={{textAlign:'left',padding:'10px 30px',fontFamily:"poppins"}}>
                  <b>1.Measurement Principle :</b> 
                  Soil moisture sensors measure the volumetric water content in soil, which is the amount of water present in the soil relative to its total volume. These sensors use various techniques to determine soil moisture, such as capacitance, resistance, or frequency domain measurements. Capacitance-based sensors are commonly used, where the dielectric constant of the soil is related to its moisture content.
                   <br/>
                  <b>2.Installation and Placement :</b> 
                  Proper installation and placement of soil moisture sensors are critical for accurate measurements. Sensors should be installed at appropriate depths within the root zone of the plants or crops being monitored. Placement depth may vary depending on the type of plant and soil conditions. Additionally, sensors should be installed in representative areas of the field or garden to ensure accurate readings.
                    <br/>
                  <b>3.Calibration and Accuracy :</b> 
                  Soil moisture sensors require calibration to provide accurate readings. Calibration involves correlating sensor measurements with actual soil moisture content determined through gravimetric or laboratory methods. Calibration may need to be performed for different soil types and conditions to ensure accuracy. Additionally, sensor accuracy can be affected by factors such as temperature, salinity, and soil compaction, so it's essential to consider these factors during calibration and operation.
                    <br/>
                  <b>4.Monitoring and Irrigation Management :</b> 
                  Soil moisture sensors play a crucial role in irrigation management by providing real-time data on soil moisture levels. This information helps farmers and gardeners optimize irrigation schedules, avoid overwatering or underwatering, and conserve water resources. By monitoring soil moisture continuously, users can make informed decisions about when and how much to irrigate, leading to improved crop yields, water efficiency, and environmental sustainability.
                </p>
                </li>
              </ul>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    );
  });

export default AirQualityAccordion;