// ANCHOR -- Require Modules --
const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

// ANCHOR -- Create Email Class --
module.exports = class Email {
  // 1) create the constructor
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Jake Nichols <${process.env.EMAIL_FROM}>`;
  }

  // 2) Create Transporter
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Production mode = SendGrid
      return nodemailer.createTransport({
        service: "sendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    // Development Mode = MailTrap
    return nodemailer.createTransport({
      hose: process.allowedNodeEnvironmentFlags.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // 3) Send Email
  async send(template, subject) {
    // A) render HTML based on the chosen pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject: subject,
      }
    );
    // B) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.fromString(html),
    };
    // C) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  // SECTION -- Email Types --

  // ANCHOR -- Signup Email --
  async sendWelcome() {
    await this.send("welcome", "Welcome to uPlow!");
  }

  // ANCHOR -- Password Reset Email --
  async sendPasswordReset() {
    await this.send("passwordReset", "Password Reset Request");
  }
  // !SECTION
};
