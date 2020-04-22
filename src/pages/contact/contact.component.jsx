import React from 'react';
import './contact.styles.scss';

const ContactPage = () => (
    <div className='contact-page'>
        <div className='area'>
            <h2 className='title'>About Us</h2>
            <p className='content'>
                Crown Clothing is one of the best known fashion companies.<br />
                With our unique and innovative business model, we're creating a seamless customer experience to let our customers shop anytime and anywhere online.
            </p>
        </div>
        <div className='area'>
            <h2 className='title'>Contact Us</h2>
            <p className='content'>
                <span className='info-first'>Crown Clothing Ltd.</span><br />
                <span className='info-second'>info@crown.com</span><br />
                <span className='info-second'>(888)222-1155 #111</span>
            </p>
            <p className='content'>
                Customer Service Hour:<br />
                <span className='info-third'>
                    Mon–Fri 10a.m.–5p.m. EST　（＊ Office will be closed for national holidays）
                </span>
            </p>
        </div>
    </div>
);

export default ContactPage;