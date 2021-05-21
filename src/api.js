const express = require("express");
const nodemailer = require("nodemailer");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

// instantiate an express app
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
// const router = express.Router;

app.get("/.netlify/functions/api/", (req, res) => {
  res.json({ message: "home" });
});

app.post("/.netlify/functions/api/hello", (req, res) => {
  res.json({ message: "working" });
});

app.get("/.netlify/functions/api/hello", (req, res) => {
  res.json({ message: "hello" });
});

app.post("/.netlify/functions/api/contact", (req, res) => {
  const output = `
    <p>You have a new mail from ImperoTechne contact form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${req.body.name}</li>
      <li style="margin-bottom: 10px;">Email: ${req.body.email}</li>
      <li style="margin-bottom: 10px;">Phone: ${req.body.phone}</li>
      <li style="margin-bottom: 10px;">Message: ${req.body.message}</li>
    </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.AUTHEMAIL}`,
      pass: `${process.env.AUTHPASSWORD}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: `"ImperoTechne Contact Form" <${process.env.AUTHEMAIL}>`,
    to: `${process.env.COMPANYEMAIL}`,
    subject: "New Mail",
    text: "Hello world?",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
//       return console.log(error);
      return res.json(error);
    }

    console.log("Message sent: ", info.messageId);
    console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));

    res.json(info);
  });
  // res.json({ message: "Email has been sent" });
});

app.post("/.netlify/functions/api/quote", (req, res) => {
  const output = `
    <p>You have a new mail from ImperoTechne Get Quote Form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${req.body.name}</li>
      <li style="margin-bottom: 10px;">Email: ${req.body.email}</li>
      <li style="margin-bottom: 10px;">Message: ${req.body.message}</li>
    </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.AUTHEMAIL}`,
      pass: `${process.env.AUTHPASSWORD}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: `"ImperoTechne Get Quote Form" <${process.env.AUTHEMAIL}>`,
    to: `${process.env.EMAIL2}, ${process.env.EMAIL1}`,
    subject: "New Mail",
    text: "Hello world?",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: ", info.messageId);
    console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
  });
  res.json({ message: "Email has been sent" });
});

// app.use("/.netlify/functions/server", router);

// //port will be 5000 for testing
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });

module.exports.handler = serverless(app);
