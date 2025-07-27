//@ts-nocheck
import express from 'express';
import { queryFromServer } from './personal_bot';
import { v4 as uuidv4 } from 'uuid';
import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { stat } from 'fs';
import { get } from 'http';
import {bcrypt} from 'bcrypt';

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
    user : process.env.HKL_GMAIL,
    pass : 'zpmq rbgs rbls gpwk'
  }
}) 

app.get("/", (req, res) => {
  res.send("Welcome to HyperKuvid-Lab's Kitchen").status(200);
});

app.get("/health", (req, res) => {
  res.json({status: "OK"}).status(200);
});

//user signup route
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

  const hashedPassword = await bcrypt.hash(password, 10); //10 is the salting rounds

  const newUser = await prisma.user.create({
    data: {
      name : name, 
      email: email,
      password: hashedPassword,
      lastSeen: new Date(),
    }
  });

  res.send({message: "User registered successfully", user: newUser.name}).status(201);
});

app.post("/user/login", async (req, res) => {
  //so here are gonna check the level of the user and login
  const {email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if(!user) {
    return res.status(400).json({ error: 'User not found.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({ error: 'Invalid password.' });
  }

  //update the last login time
  await prisma.user.update({
    where:{
      id: user.id
    },
    data: {
      lastSeen: new Date()
    }
  });

  if(user.level == "ADMIN"){
    res.send({message: "Please Login with admin page"}).status(400);
  };

  res.send({message: "User Logged in Successfully"}).status(200);
});

app.post("/admin/login", async(requestAnimationFrame, res) => {
  //so here are gonna check the level of the user and login
  const {email, password } = requestAnimationFrame.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if(!user) {
    return res.status(400).json({ error: 'User not found.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({ error: 'Invalid password.' });
  }

  //update the last login time
  await prisma.user.update({
    where:{
      id: user.id
    },
    data: {
      lastSeen: new Date()
    }
  });

  if(user.level == "GENERAL" || user.level == "CORE_GENERAL"){
    res.send({message: "Please Login with user page"}).status(400);
  };

  res.send({message: "Admin Logged in Successfully"}).status(200);
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


  await prisma.project.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      githubLink:req.body.githubLink,
      story: req.body.story,
      documentation: req.body.documentation,
      domain: req.body.domain,
      techstack: req.body.techstack,
      ownerId: userId,

    }
  })

  //here we are getting the project id that we just created above 
  const getProjectId = await prisma.project.findFirst({
    where: {
      ownerId: userId,
      title: req.body.title,  
    },
    select: {
      id: true, 
    },
  });

  if (!getProjectId) {
    throw new Error("Builder profile not found for this user.");
  }

  const creators = req.body.creators;
  for(const creatorid of creators){
    await prisma.userProject.create({
      data:{
        userId:creatorid,
        projectId:getProjectId.id
      }
    })
  }

   const mailData = {
    from: process.env.HKL_GMAIL,
    to: process.env.HKL_GMAIL,
    cc:[
      process.env.ADMIN1_GMAIL,
      process.env.ADMIN2_GMAIL,
      process.env.ADMIN3_GMAIL
    ],
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
    message: "Your project will be added after evaluation . Please wait for a while."
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
    from: process.env.HKL_GMAIL,
    to: process.env.HKL_GMAIL,
    cc:[
      process.env.ADMIN1_GMAIL,
      process.env.ADMIN2_GMAIL,
      process.env.ADMIN3_GMAIL
    ],
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
  
      try {
        await trasnsporter.sendMail(mailData);
      } catch (error) {
        console.error('Error sending email:', error);
      }
  
      return res.status(201).send({
        message: "Your project will be added after evaluation. Please wait for a while."
      });
    }
  });

//the ask senior route
app.post('/ask', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided.' });
  }

  try {
    const answer = await queryFromServer(message.senior, message.prompt);
    res.json({ response: answer });
  } catch (error) {
    console.error('Error in /ask route:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot.' });
  }
});

//admin approving the project
app.post('/admin/approveProjects/:projectId', async (req, res) => {
  const { projectId } = req.params;
  //so here the req.bidy will come as
  // {
  //   creators: [mails of builders/users]
  // }
  // const status=req.body.status;
  const creators = req.body.creators; // array of mails from the frontend

  //here the projects we are getting for sure waiting, so why are we gonna keep this
  // if(status==="Waiting"){
  //   res.status(200).send({
  //     message: "Project is still waiting for approval."
  //   })
  // }

  let builderidarray=[];
  let nonBuilderCreators = [];
  let builderMails = [];
  
  for(const creatorMail of creators){
    //here gonna check with mail
    const isUserBuilder = await prisma.builderProfile.findUnique({
      where:{
        mail : creatorMail
      }
    })

    if(isUserBuilder){
      builderidarray.push(isUserBuilder)
      builderMails.push(creatorMail);
    }
    if (!isUserBuilder) {
      const user = await prisma.user.findUnique({
        where:{
          email : creatorMail
        }
      });

      if(!user){
        return res.status(400).send({
          message: "User not found."
        });
      }
      
      const builderData = {
        userId : user.id,
        mail : creatorMail,
      }
    
      await prisma.builderProfile.create({
        data: builderData
      });

      const getBuilderProfile = await prisma.builderProfile.findUnique({
        where: {
          mail: creatorMail,  
        }
      });
      if (!getBuilderProfile) {
        throw new Error("Builder profile not found for this user.");
      }
      nonBuilderCreators.push(creatorMail);
    }
  }

  await prisma.project.update({
    where:{
      id : projectId
    },
    data:{
      status: "Approved"
    }
  });

  await prisma.builderProject.create({
    data:{
      builder: builderidarray,
      projectId:projectId,
    }
  });

  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    }
  });

  //sending the email to the user/builder profile
  
  // emailfor existing builders
  if (builderMails.length > 0) {
    const builderMailData = {
      from: process.env.HKL_GMAIL,
      to: builderMails,
      subject: '🎉 Your Project Has Been Approved!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #28a745; border-bottom: 2px solid #28a745; padding-bottom: 10px; margin-bottom: 20px;">
              🎉 Project Approved Successfully!
            </h2>
            
            <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #28a745;">
              <p style="margin: 0; color: #155724;">
                <strong>Congratulations!</strong> Your project has been approved and is now live on HyperKuvid Labs.
              </p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="color: #495057; margin-top: 0;">📋 Project Details</h3>
              <p style="margin: 5px 0;"><strong>Title:</strong> ${project?.title || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Description:</strong> ${project?.description || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Domain:</strong> ${project?.domain || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Tech Stack:</strong> ${project?.techstack || 'N/A'}</p>
              ${project?.githubLink ? `<p style="margin: 5px 0;"><strong>GitHub:</strong> <a href="${project.githubLink}" style="color: #007bff;">${project.githubLink}</a></p>` : ''}
              ${project?.documentation ? `<p style="margin: 5px 0;"><strong>Documentation:</strong> <a href="${project.documentation}" style="color: #007bff;">${project.documentation}</a></p>` : ''}
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
            
            <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
              This email was sent by HyperKuvid Labs.<br>
              Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `,
      text: `
Project Approved Successfully!

Congratulations! Your project has been approved and is now live on HyperKuvid Labs.

PROJECT DETAILS:
Title: ${project?.title || 'N/A'}
Description: ${project?.description || 'N/A'}
Domain: ${project?.domain || 'N/A'}
Tech Stack: ${project?.techstack || 'N/A'}
${project?.githubLink ? `GitHub: ${project.githubLink}` : ''}
${project?.documentation ? `Documentation: ${project.documentation}` : ''}

---
This email was sent by HyperKuvid Labs.
Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `
    };

    try {
      await trasnsporter.sendMail(builderMailData);
    } catch (error) {
      console.error('Error sending email to builders:', error);
    }
  }

  // email for new builders (non-builder creators)
  if (nonBuilderCreators.length > 0) {
    for (const creatorMail of nonBuilderCreators) {
      const user = await prisma.user.findUnique({
        where: { email: creatorMail }
      });

      const newBuilderMailData = {
        from: process.env.HKL_GMAIL,
        to: creatorMail,
        subject: '🎉 Your Project Has Been Approved!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #28a745; border-bottom: 2px solid #28a745; padding-bottom: 10px; margin-bottom: 20px;">
                🎉 Project Approved Successfully!
              </h2>
              
              <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #28a745;">
                <p style="margin: 0; color: #155724;">
                  <strong>Congratulations!</strong> Your project has been approved and is now live on HyperKuvid Labs.
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="color: #495057; margin-top: 0;">📋 Project Details</h3>
                <p style="margin: 5px 0;"><strong>Title:</strong> ${project?.title || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${project?.description || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>Domain:</strong> ${project?.domain || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>Tech Stack:</strong> ${project?.techstack || 'N/A'}</p>
                ${project?.githubLink ? `<p style="margin: 5px 0;"><strong>GitHub:</strong> <a href="${project.githubLink}" style="color: #007bff;">${project.githubLink}</a></p>` : ''}
                ${project?.documentation ? `<p style="margin: 5px 0;"><strong>Documentation:</strong> <a href="${project.documentation}" style="color: #007bff;">${project.documentation}</a></p>` : ''}
              </div>
              
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #28a745;">
                <p style="margin: 0; color: #155724;">
                  <strong>🎊 Congratulations on becoming a builder by adding your project!</strong><br>
                  Now you can update your profile at <a href="https://hyperkuvidlabs.tech/people/${user?.id}" style="color: #007bff; text-decoration: none;">hyperkuvidlabs.tech/people/${user?.id}</a>
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
              
              <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
                This email was sent by HyperKuvid Labs.<br>
                Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          </div>
        `,
        text: `
Project Approved Successfully!

Congratulations! Your project has been approved and is now live on HyperKuvid Labs.

PROJECT DETAILS:
Title: ${project?.title || 'N/A'}
Description: ${project?.description || 'N/A'}
Domain: ${project?.domain || 'N/A'}
Tech Stack: ${project?.techstack || 'N/A'}
${project?.githubLink ? `GitHub: ${project.githubLink}` : ''}
${project?.documentation ? `Documentation: ${project.documentation}` : ''}

🎊 Congratulations on becoming a builder by adding your project!
Now you can update your profile at https://hyperkuvidlabs.tech/people/${user?.id}

---
This email was sent by HyperKuvid Labs.
Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        `
      };

      try {
        await trasnsporter.sendMail(newBuilderMailData);
      } catch (error) {
        console.error(`Error sending email to new builder ${creatorMail}:`, error);
      }
    }
  }

  res.status(200).send({
    message: "Project approved and linked to existing builder profile."
  });
});

app.post("/admin/rejectProjects/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const creators = req.body.creators; 
  const message = req.body.message;

  await prisma.project.update({
    where: {
      id: projectId
    },
    data: {
      status: "Rejected"
    }
  });

  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    }
  });

  await prisma.project.delete({
    where: {
      id: projectId
    }
  });

  for(const creatorMail of creators){
    const user = await prisma.user.findUnique({
      where: {
        email: creatorMail
      }
    });

    if (!user) {
      return res.status(400).send({
        message: `User with email ${creatorMail} not found.`
      });
    }

    const mailData = {
      from: process.env.HKL_GMAIL,
      to: creatorMail,
      subject: '❌ Your Project Has Been Rejected',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px; margin-bottom: 20px;">
              ❌ Project Rejected
            </h2>
            
            <div style="background-color: #f8d7da; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0; color: #721c24;">
                <strong>Unfortunately, your project has been rejected.</strong> Please review the feedback below and consider resubmitting.
              </p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="color: #495057; margin-top: 0;">📋 Project Details</h3>
              <p style="margin: 5px 0;"><strong>Title:</strong> ${project?.title || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Description:</strong> ${project?.description || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Domain:</strong> ${project?.domain || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Tech Stack:</strong> ${project?.techstack || 'N/A'}</p>
              ${project?.githubLink ? `<p style="margin: 5px 0;"><strong>GitHub:</strong> <a
                href="${project.githubLink}" target="_blank">${project.githubLink}</a></p>` : ''}
              ${project?.documentation ? `<p style="margin: 5px 0;"><strong>Documentation:</strong> <a
                href="${project.documentation}" target="_blank">${project.documentation}</a></p>` : ''}
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">

            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404;">
                <strong>Feedback:</strong> ${message || 'No specific feedback provided.'}
              </p>
            </div>
            
            <p style="color: #6c757d; font-size: 12px; margin: 0; text-align: center;">
              This email was sent by HyperKuvid Labs.<br>
              Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailData);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  res.status(200).send({
    message: "Project rejected and email sent to creators."
  });
});

app.post("/user/addProject", async(req, res) => {
  //req.body template
  // {
  //   ownerId : Mail,
  //   title, description, githubLink, story, documentation, cretors: mails of other contributors, owner user
  // }

  const { ownerId, title, description, githubLink, story, documentation, creators } = req.body;

  if(!githubLink && (!story || !documentation)) {
    return res.status(400).send({
      message: "Either gitub linkt or story and documentation should be provided."
    });
  }

  await prisma.project.create({
    data: {
      title: title,
      description: description,
      githubLink: githubLink,
      story: story,
      documentation: documentation,
      domain: req.body.domain,
      techstack: req.body.techStack,
      ownerId: ownerId,
      contributors: {
        connect: creators
      }
    }
  });

  if(githubLink){
    await prisma.project.create({
      data: {
        title: title,
        description: description,
        githubLink: githubLink,
        domain: req.body.domain,
        techstack: req.body.techStack,
        ownerId: ownerId,
        contributors: {
          connect: creators
        }
      }
    });
  }else{
    await prisma.project.create({
      data: {
        title: title,
        description: description,
        story: story,
        documentation: documentation,
        domain: req.body.domain,
        techstack: req.body.techStack,
        ownerId: ownerId,
        contributors: {
          connect: creators
        }
      }
    });
  }

  res.status(201).send({
    message: "Project added successfully. Wait for the admin to approve it."
  });
});

app.get("/projects", async(req, res) => {
  const projects = await prisma.builderProject.findMany({
    include: {
      projects: true
    }
  });

  if (projects.length === 0) {
    return res.status(404).send({
      message: "No projects found."
    });
  }

  res.status(200).send({
    projects: projects
  });
});

app.get("/projects/:projectId", async(req, res) => {
  const { projectId } = req.params;

  const project = await prisma.builderProject.findUnique({
    where: {
      id: projectId
    },
    include: {
      owner: true,
      contributors: true
    }
  });

  const projectDetails = await prisma.project.findUnique({
    where: {
      id: projectId
    }
  });

  if (!project) {
    return res.status(404).send({
      message: "Project not found."
    });
  }

  res.status(200).send({
    project: projectDetails
  });
});

app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  prisma.user.findUnique({
    where: {
      id: userId
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    res.status(200).send({
      user: user
    });
  }).catch(error => {
    console.error('Error fetching user:', error);
    res.status(500).send({
      message: "Internal server error."
    });
  });
});

//this route is about the projects that has not been approved yet
app.get("/projects/notApproved", async(req, res) => {
  const projectsArray = await prisma.project.findMany({
    where:{
      status : "Waiting"
    }
  });

  res.status(200).send({
    projects: projectsArray
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
