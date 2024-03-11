// Footer.js
import React from 'react';
import styles from './styles/footer.css';

const Footer = () => {
  return (
    <footer style={styles} className='footer-container'>
        <div className='footer-padding'>
            <div className='footer-links'>
                <div className='footer-links-div'>
                    <h3>Our Website</h3>
                    <hr />
                    <a href='/'className='a' ><h1>FARM SECURITY</h1></a>
                </div>
                <div className='footer-links-div'>
                    <h3>Services</h3>
                    <hr></hr>
                    <a href='/sensors' className='a' >Sensors </a>
                    <a href='/AboutUs' className='a'>About Us</a>
                    <a href="https://docs.google.com/document/d/e/2PACX-1vQuzN4-MPPtJomidDvibMbMLiskbCbesAusYBKSC3etqVieYLyJ8xeVdVchppkspVhK1HCucm6B2pBi/pub" className='a' >Documentation</a>
                </div>
                <div className='footer-links-div'>
                    <h3>Contact Us</h3>
                    <hr></hr>
                    <h6>Phone : +91 9014517595</h6>
                    <h6>Email : 2024iot_project@gmail.com</h6>
                    <h6>Location : CyberTowers, Hyderabad</h6>
                    <h6></h6>
                </div>
            </div>
        </div>
        
    <p className='copyright' style={{textAlign:'center', letterSpacing:'20px'}}>&copy; 2024 All Rights Reserved</p>
    </footer>
  );
};


export default Footer;
