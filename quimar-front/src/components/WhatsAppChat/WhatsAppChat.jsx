import React from "react";
import style from "./WhatsAppChat.module.css";

// LOGO ----->
import logoWhatsApp from '../../assets/WhatsApp.svg';
//-------<

const WhatsAppChat = () => {

    return (
        <a href='https://wa.me/5492914438409' className={style.whatsappicon} target="_blank">
            <img src={logoWhatsApp} alt="WhatsApp"/>
        </a>
    )
};

export default WhatsAppChat;