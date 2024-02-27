import { File } from 'buffer'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

import { ApiError } from '../exceptions/ApiError';
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
import path from 'path';
interface ISenderParams {
  sender: string;
  title: string;
  description: string;
  files: File[];
}


dotenv.config()

const { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT } = process.env
const supportMail = "testmailsmtpserver2@gmail.com"


async function saveAttachments(files) {
  const attachments = [];
  for (const file of files) {
    console.log(file)
    try {
      const data = await readFileAsync(file._writeStream.path);
      await writeFileAsync(`src/uploads/${file.name}`, data);
      attachments.push({ filename: file.name, path: file._writeStream.path });
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }
  return attachments;
}

async function clearSaveDirectory(){
  try {
    const files = await fs.readdir('src/uploads');
    const deleteFilePromises = files.map(file => 
      fs.unlink(path.join('src/uploads', file))  
    )
    await Promise.all(deleteFilePromises);
  }catch (err) {
    return err
  }
}


class MailService {
  #transporter = null
  constructor() {
    this.#transporter = this.#getTransporter()
    this.send = this.send.bind(this)
  }

  #getTransporter() {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_HOST_USER,
        pass: EMAIL_HOST_PASSWORD
      }
    })
  }

  async send(sender, title, description, files) {
    const mailOptions = {
      from: sender,
      to: supportMail,
      subject: title,
      text: title,
      html: ` 
                    ticket from ${sender}
                    <br></br>
                    ${description}
                  `,
      attachments: []
    }
    console.log(files)
    if(files.length > 0) {
      const attachments = await saveAttachments(files)  
      mailOptions.attachments = attachments
    } 
    try {
      const info = await this.#transporter.sendMail(mailOptions)
      await clearSaveDirectory()
      return info
    } catch (e) {
      return e
    }
  }

}



export default new MailService()