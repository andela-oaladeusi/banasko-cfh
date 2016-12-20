'use strict';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
module.exports = (req, res) => {
  let link = `${req.body.link}&email=${req.body.email}`;
  const text = `<h3> Cards for Humanity </h3><br/>
      <strong>${req.body.name}</strong>
       You have been invited by <strong>${req.body.currentUser}</strong>
      to join a game in cards for humanity<br/>
      follow this <a href="${link}">link</a> to join the game now.<br/>
      <strong>Cards For Humanity</strong>`;
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_OWNER,
      pass: process.env.EMAIL_PASSWORD
      }
  };

  let transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
    transporter.sendMail({
      from: process.env.BANASKO_EMAIL,
      to: req.body.email,
      subject: 'Banasko Game Invitation!',
      html: text
    });
  };
