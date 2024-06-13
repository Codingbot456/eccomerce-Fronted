import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className='Main-footer'>
    <footer className="footer-container">
      <div className="social">
        <div>
        <h4>Socials</h4>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://twitter.com/">Twitter</a>
        <a href="https://www.facebook.com/">Facebook</a>
        <a href="https://www.youtube.com/">YouTube</a>
        </div>
      </div>

      <div className="contact">
        <div>
        <h4>Contact us</h4>
        <a href="#">Contact Us</a>
        <a href="mailto:yourexample@email.com">ye@email</a>
        <a href="mailto:example@email.com">example</a>
        </div>
      </div>

      <div className="categories">
        <div>
        <h4>Top Categories:</h4>
        <a href="#">Men's Wear</a>
        <a href="#">Women's Wear</a>
        <a href="#">Kid's Wear</a>
        <a href="#">Sports Wear</a>
        </div>
      </div>

      <div className="about">
        <div>
        <h4>About us</h4>
        <a href="#">About Us</a>
        <a href="#">Copyright</a>
        </div>
      </div>
        
      <div className="customercare">
        <div>
        <h4>Customer care</h4>
        <a href="#">FAQ & Helps</a>
        <a href="#">Shipping & Delivery</a>
        <a href="#">Return & Exchanges</a>
        </div>
      </div>

      <div className="info"> 
        <div>
        <h4>Our Information</h4>
        <a href="#">Privacy Policy Update</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Return Policy</a>
        <a href="#">Site Map</a>
        </div>
      </div>
    </footer>

    <div className='sub-footer'>
      <div className='sub-footer-2'>
      <img src='images/mpesa.png' alt='Mpesa Logo'/>
      <img src='images/paypal.svg' alt='Paypal Logo'/>
      <img src='images/visa.svg' alt='visa Logo'/>
      <img src='images/mastercard.svg' alt='Mastercard Logo'/>
      </div>
      <div className='sub-footer-1'>
        <p1>Copyright © 2024 Design Genius Webworks All rights reserved</p1>
         </div>
    </div>
    </div>
  );
};

export default Footer;
