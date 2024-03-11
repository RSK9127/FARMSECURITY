import React from "react";
import image from './animations/temp.png';
import styles from './styles/accordion.css';
import {  useState } from 'react';
const UltrasonicAccordion = React.memo(() => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const handleAccordionToggle = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };
    
  
  return (
    <div className='button_bg'>
      <button className='learnmore'style={styles} onClick={handleAccordionToggle}>{isAccordionOpen ? 'Close Details' : 'Learn More'}</button>

      {isAccordionOpen && (
        <div className='para' style={styles}  data-aos="fade-in">
            <ul className='content' style={styles}>
              <li>
                <img src={image} alt="ultrasonic sensor" style={{height:'350px',width:'270px',backgroundSize:'cover'}} />
              </li>
              <li>
                <h2 style={{textAlign:'center',fontFamily:"Times new roman",fontStyle:"normal"}}>Temperature Sensor</h2>
                <br/>
                <p style={{textAlign:'left',padding:'10px 30px',fontFamily:"poppins"}}>
                  <b>1. Measurement Range and Accuracy :</b> 
                        - Temperature sensors measure the ambient temperature of their surroundings. They come in various types such as thermocouples, thermistors, resistance temperature detectors (RTDs), and semiconductor-based sensors. Each type has its own measurement range and accuracy specifications, so it's important to choose the right sensor for the application.
                   <br/>
                  <b>2. Calibration and Stability :</b> 
                        - Temperature sensors require calibration to ensure accurate temperature measurements. Calibration involves comparing the sensor readings with known temperature standards. Additionally, sensor stability over time is crucial for maintaining accuracy. Some sensors may drift or degrade over time, requiring periodic recalibration or replacement.
                    <br/>
                  <b>3. Response Time and Thermal Inertia :</b> 
                        - Temperature sensors differ in their response time, which is the time taken to detect and report changes in temperature. Faster response times are important for applications that require real-time temperature monitoring and control. Additionally, thermal inertia, or the ability of a sensor to respond to rapid temperature changes, is a key consideration for dynamic environments.
                    <br/>
                  <b>4. Environmental Considerations :</b> 
                       - Temperature sensors may be exposed to various environmental factors such as humidity, pressure, vibration, and electromagnetic interference. It's important to select sensors that are designed to withstand these conditions and provide accurate measurements in challenging environments. Additionally, factors like sensor packaging, mounting options, and signal conditioning may affect sensor performance in different environments.
                </p>
              </li>
            </ul>
        </div>
      )}
    </div>
  );
});
export default UltrasonicAccordion;