import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const transporter = nodemailer.createTransport({
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Lunare - Contacto',
      text: `Nombre: ${req.body.name} \nEmail: ${req.body.email} \nTeléfono: ${req.body.phone} \nMensaje: ${req.body.message}`,
      html: `Nombre: ${req.body.name} <br/>Email: ${req.body.email} <br/>Teléfono: ${req.body.phone} <br/>Mensaje: ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    res.status(200).json({ message: 'Email sent' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
