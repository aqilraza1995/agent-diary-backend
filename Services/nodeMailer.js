import nodemailer from 'nodemailer'

const  sendEmail= async(options)=>{
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        // port: 587,
        secure:true,
        auth:{
            user:process.env.USER,
            password:process.env.PASSWORD
        }
    })

    let message = {
        from:process.env.USER,
        to:options?.email,
        subject:options?.subject,
        text:options?.text
    }

    const info = await transporter.sendMail(message)
    console.log("Message sent %s", info.messageId)
}

export default sendEmail