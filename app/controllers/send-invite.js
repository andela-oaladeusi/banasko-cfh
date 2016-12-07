'use strict';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
module.exports = (req, res) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'test@test.com',
      pass: 'test1234'
      }
  };

  let transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
    transporter.sendMail({
      from: 'test@test.com',
      to: req.body.email,
      subject: 'Game Invitation!',
      text: req.body.link
    });
  };