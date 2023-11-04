const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "mahmoud.gamal1191998@gmail.com",
    pass: "rjeztvyqmzosdlyi",
  },
});

module.exports=transporter