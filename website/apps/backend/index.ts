import express from 'express';
import { queryFromServer } from './personal_bot';
import { v4 as uuidv4 } from 'uuid';
import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const app = express();
app.use(cors());  
app.use(express.json());
const PORT = 3000;

const trasnsporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port : 587,
  secure : false,
  auth : {
    user : 'hyperkuvidlabs@gmail.com',
    pass : 'need to get a pass for our email'
  }
}) 

app.get("/", (req, res) => {
  res.send("Welcome to HYperKUvid-Labs' Kitechen").status(200);
});

app.get("/health", (req, res) => {
  res.json({status: "OK"}).status(200);
});

app.post("/register/user", async(req, res) => {
  const {name, email, password} = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if(user) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = await prisma.user.create({
    data: {
      name : name, 
      email: email,
      password: password,
      lastSeen: new Date(),
    }
  });

  res.send({message: "User registered successfully", user: newUser.name}).status(201);
});

app.post("/project/add/:userId", async(req, res) => {
  const { userId } = req.params;

if (req.body.githubLink) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  
  if (!user) {
    return res.status(400).send({
      message: "Please register before adding a project."
    });
  }

   const mailData = {
    from: 'hyperkuvidlabs@gmail.com',
    to: 'hyperkuvidlabs@gmail.com',
    subject: '🔗 GitHub Project Submission - Auto Review',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px; margin-bottom: 20px;">
            🔗 GitHub Project Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #495057; margin-top: 0;">📋 Submitter Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #28a745; margin-top: 0;">🚀 GitHub Repository</h3>
            <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #28a745;">
              <a href="${req.body.githubLink}" style="color: #007bff; text-decoration: none; font-family: monospace;">${req.body.githubLink}</a>
            </p>
          </div>
          
          <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724;">
              <strong>🔄 Status:</strong> Project will be automatically analyzed from the provided GitHub repository.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          
          <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
            This email was generated automatically by the HyperKuvid Labs project submission system.<br>
            Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      </div>
    `,
    text: `
GitHub Project Submission - Auto Review

SUBMITTER INFORMATION:
Name: ${user.name}
Email: ${user.email}
User ID: ${userId}

GITHUB REPOSITORY:
${req.body.githubLink}

STATUS: Project will be automatically analyzed from the provided GitHub repository.

---
This email was generated automatically by the HyperKuvid Labs project submission system.
Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `
  };
  return res.status(201).send({
    message: "Your project will be added after evaluation from the GitHub link you provided. Please wait for a while."
  });
} else {
  const { title, description, story, documentationLink, techStack, ownerId } = req.body;
  
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  
  if (!user) {
    return res.status(400).send({
      message: "Please register before adding a project."
    });
  }
  
  const owner = await prisma.user.findUnique({
    where: {
      id: ownerId
    }
  });
  
  if (ownerId !== userId && !owner) {
    return res.status(400).send({
      message: "Owner not registered. Please provide a valid owner ID."
    });
  }

  const mailData = {
    from: 'hyperkuvidlabs@gmail.com',
    to: 'hyperkuvidlabs@gmail.com',
    subject: '🚀 New Project Submission - Review Required',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;">
            🚀 New Project Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #495057; margin-top: 0;">📋 Submitter Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
          </div>
          
          <div style="background-color: #e9f7ff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #0066cc; margin-top: 0;">🔧 Project Details</h3>
            
            <div style="margin-bottom: 15px;">
              <h4 style="color: #333; margin: 10px 0 5px 0;">📝 Title:</h4>
              <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #007bff;">${title}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4 style="color: #333; margin: 10px 0 5px 0;">📄 Description:</h4>
              <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #28a745;">${description}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4 style="color: #333; margin: 10px 0 5px 0;">📖 Project Story:</h4>
              <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #ffc107;">${story}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4 style="color: #333; margin: 10px 0 5px 0;">🔗 Documentation Link:</h4>
              <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #17a2b8;">
                ${documentationLink ? `<a href="${documentationLink}" style="color: #007bff; text-decoration: none;">${documentationLink}</a>` : 'Not provided'}
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4 style="color: #333; margin: 10px 0 5px 0;">💻 Tech Stack:</h4>
              <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #6f42c1;">${techStack}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h4 style="color: #333; margin: 10px 0 5px 0;">👤 Owner Information:</h4>
              <p style="margin: 0; padding: 8px; background-color: #ffffff; border-left: 3px solid #dc3545;">
                Owner ID: ${ownerId}
                ${ownerId !== userId ? `<br><em>(Different from submitter)</em>` : `<br><em>(Same as submitter)</em>`}
              </p>
            </div>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">
              <strong>⏰ Action Required:</strong> This project submission requires manual review and approval.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          
          <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
            This email was generated automatically by the HyperKuvid Labs project submission system.<br>
            Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      </div>
    `,
    text: `
New Project Submission - Review Required

SUBMITTER INFORMATION:
Name: ${user.name}
Email: ${user.email}
User ID: ${userId}

PROJECT DETAILS:
Title: ${title}
Description: ${description}
Story: ${story}
Documentation Link: ${documentationLink || 'Not provided'}
Tech Stack: ${techStack}
Owner ID: ${ownerId}${ownerId !== userId ? ' (Different from submitter)' : ' (Same as submitter)'}

ACTION REQUIRED: This project submission requires manual review and approval.

---
This email was generated automatically by the HyperKuvid Labs project submission system.
Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `
  };
}
});


app.post('/ask', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided.' });
  }

  try {
    const answer = await queryFromServer(message);
    res.json({ response: answer });
  } catch (error) {
    console.error('Error in /ask route:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot.' });
  }
});


app.listen(PORT, () => {
  console.log(`Chatbot server running on http://localhost:${PORT}`);
});
