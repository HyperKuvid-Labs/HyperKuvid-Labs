"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const express_1 = __importDefault(require("express"));
const personal_bot_1 = require("./personal_bot");
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'SeCr3tKeyHkL789';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.HKL_GMAIL,
        pass: process.env.HKL_GMAIL_PASS
    }
});
app.get("/", (req, res) => {
    res.send("Welcome to HyperKuvid-Lab's Kitchen").status(200);
});
app.get("/health", (req, res) => {
    res.json({ status: "OK" }).status(200);
});
//user signup route
app.post("/register/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(400).json({ error: 'User already exists.' });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10); //10 is the salting rounds
    const newUser = yield prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            lastSeen: new Date(),
        }
    });
    const token = jsonwebtoken_1.default.sign({
        userId: newUser.id,
        email: newUser.email,
        level: newUser.level
    }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            level: newUser.level
        },
        token: token
    });
}));
app.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //so here are gonna check the level of the user and login
    const { email, password } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(400).json({ error: 'User not found.' });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password.' });
    }
    //update the last login time
    yield prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            lastSeen: new Date()
        }
    });
    if (user.level == "ADMIN") {
        return res.status(400).json({ message: "Please Login with admin page" });
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
        level: user.level
    }, JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({
        message: "User Logged in Successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            level: user.level
        },
        token: token
    });
}));
app.post("/admin/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //so here are gonna check the level of the user and login
    const { email, password } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(400).json({ error: 'User not found.' });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password.' });
    }
    //update the last login time
    yield prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            lastSeen: new Date()
        }
    });
    if (user.level == "GENERAL" || user.level == "CORE_GENERAL") {
        return res.status(400).json({ message: "Please Login with user page" });
    }
    // Generate JWT token for admin
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
        level: user.level
    }, JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({
        message: "Admin Logged in Successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            level: user.level
        },
        token: token
    });
}));
app.post("/project/add/:userId", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId || userId === 'undefined') {
            return res.status(400).json({ error: 'Invalid user ID provided' });
        }
        if (req.user.userId !== userId) {
            return res.status(403).json({ error: 'Access denied. You can only add projects for yourself.' });
        }
        if (req.body.githubLink) {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(400).json({
                    message: "Please register before adding a project.",
                });
            }
            const techStackArray = [
                req.body.domain || 'General',
                req.body.techstack || 'Not specified'
            ];
            yield prisma.project.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    githubLink: req.body.githubLink,
                    story: req.body.story,
                    documentation: req.body.documentation,
                    techstack: techStackArray,
                    ownerId: userId,
                },
            });
            //here we are getting the project id that we just created above
            const getProjectId = yield prisma.project.findFirst({
                where: {
                    ownerId: userId,
                    title: req.body.title,
                },
                select: {
                    id: true,
                },
            });
            if (!getProjectId) {
                return res.status(500).json({ error: "Failed to create project." });
            }
            const creators = req.body.creators || [];
            if (!creators.includes(userId)) {
                creators.push(userId);
            }
            for (const creatorid of creators) {
                yield prisma.userProject.create({
                    data: {
                        userId: creatorid,
                        projectId: getProjectId.id,
                    },
                });
            }
            const mailData = {
                from: process.env.HKL_GMAIL,
                to: process.env.HKL_GMAIL,
                cc: [
                    process.env.ADMIN1_GMAIL,
                    process.env.ADMIN2_GMAIL,
                    process.env.ADMIN3_GMAIL,
                ],
                subject: "🔗 GitHub Project Submission - Auto Review",
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
            Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
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
Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    `,
            };
            try {
                yield transporter.sendMail(mailData);
            }
            catch (error) {
                console.error("Error sending email:", error);
            }
            return res.status(201).json({
                message: "Your project will be added after evaluation . Please wait for a while.",
            });
        }
        else {
            const { title, description, story, documentationLink, techStack, ownerId } = req.body;
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return res.status(400).json({
                    message: "Please register before adding a project."
                });
            }
            const owner = yield prisma.user.findUnique({
                where: {
                    id: ownerId
                }
            });
            if (ownerId !== userId && !owner) {
                return res.status(400).json({
                    message: "Owner not registered. Please provide a valid owner ID."
                });
            }
            const mailData = {
                from: process.env.HKL_GMAIL,
                to: process.env.HKL_GMAIL,
                cc: [
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
                yield transporter.sendMail(mailData);
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
            return res.status(201).json({
                message: "Your project will be added after evaluation. Please wait for a while."
            });
        }
    }
    catch (err) {
        // Log error to erroinproject.txt
        fs_1.default.appendFileSync('erroinproject.txt', `[${new Date().toISOString()}] ${(err === null || err === void 0 ? void 0 : err.stack) || err}\n\n`);
        console.error("Error in /project/add/:userId route:", err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
}));
//the ask senior route
app.post('/ask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'No message provided.' });
    }
    try {
        const answer = yield (0, personal_bot_1.queryFromServer)(message.senior, message.prompt);
        res.json({ response: answer });
    }
    catch (error) {
        console.error('Error in /ask route:', error);
        res.status(500).json({ error: 'Failed to get response from chatbot.' });
    }
}));
//admin approving the project
app.post('/admin/approveProjects/:projectId', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    let builderidarray = [];
    let nonBuilderCreators = [];
    let builderMails = [];
    for (const creatorMail of creators) {
        //here gonna check with mail
        const isUserBuilder = yield prisma.builderProfile.findUnique({
            where: {
                mail: creatorMail
            }
        });
        if (isUserBuilder) {
            builderidarray.push(isUserBuilder);
            builderMails.push(creatorMail);
        }
        if (!isUserBuilder) {
            const user = yield prisma.user.findUnique({
                where: {
                    email: creatorMail
                }
            });
            if (!user) {
                return res.status(400).send({
                    message: "User not found."
                });
            }
            const builderData = {
                userId: user.id,
                mail: creatorMail,
            };
            yield prisma.builderProfile.create({
                data: builderData
            });
            const getBuilderProfile = yield prisma.builderProfile.findUnique({
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
    yield prisma.project.update({
        where: {
            id: projectId
        },
        data: {
            status: "Approved"
        }
    });
    yield prisma.builderProject.create({
        data: {
            builder: builderidarray,
            projectId: projectId,
        }
    });
    const project = yield prisma.project.findUnique({
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
              <p style="margin: 5px 0;"><strong>Title:</strong> ${(project === null || project === void 0 ? void 0 : project.title) || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Description:</strong> ${(project === null || project === void 0 ? void 0 : project.description) || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Domain:</strong> ${(project === null || project === void 0 ? void 0 : project.domain) || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Tech Stack:</strong> ${(project === null || project === void 0 ? void 0 : project.techstack) || 'N/A'}</p>
              ${(project === null || project === void 0 ? void 0 : project.githubLink) ? `<p style="margin: 5px 0;"><strong>GitHub:</strong> <a href="${project.githubLink}" style="color: #007bff;">${project.githubLink}</a></p>` : ''}
              ${(project === null || project === void 0 ? void 0 : project.documentation) ? `<p style="margin: 5px 0;"><strong>Documentation:</strong> <a href="${project.documentation}" style="color: #007bff;">${project.documentation}</a></p>` : ''}
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
Title: ${(project === null || project === void 0 ? void 0 : project.title) || 'N/A'}
Description: ${(project === null || project === void 0 ? void 0 : project.description) || 'N/A'}
Domain: ${(project === null || project === void 0 ? void 0 : project.domain) || 'N/A'}
Tech Stack: ${(project === null || project === void 0 ? void 0 : project.techstack) || 'N/A'}
${(project === null || project === void 0 ? void 0 : project.githubLink) ? `GitHub: ${project.githubLink}` : ''}
${(project === null || project === void 0 ? void 0 : project.documentation) ? `Documentation: ${project.documentation}` : ''}

---
This email was sent by HyperKuvid Labs.
Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `
        };
        try {
            yield transporter.sendMail(builderMailData);
        }
        catch (error) {
            console.error('Error sending email to builders:', error);
        }
    }
    // email for new builders (non-builder creators)
    if (nonBuilderCreators.length > 0) {
        for (const creatorMail of nonBuilderCreators) {
            const user = yield prisma.user.findUnique({
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
                <p style="margin: 5px 0;"><strong>Title:</strong> ${(project === null || project === void 0 ? void 0 : project.title) || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${(project === null || project === void 0 ? void 0 : project.description) || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>Domain:</strong> ${(project === null || project === void 0 ? void 0 : project.domain) || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>Tech Stack:</strong> ${(project === null || project === void 0 ? void 0 : project.techstack) || 'N/A'}</p>
                ${(project === null || project === void 0 ? void 0 : project.githubLink) ? `<p style="margin: 5px 0;"><strong>GitHub:</strong> <a href="${project.githubLink}" style="color: #007bff;">${project.githubLink}</a></p>` : ''}
                ${(project === null || project === void 0 ? void 0 : project.documentation) ? `<p style="margin: 5px 0;"><strong>Documentation:</strong> <a href="${project.documentation}" style="color: #007bff;">${project.documentation}</a></p>` : ''}
              </div>
              
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #28a745;">
                <p style="margin: 0; color: #155724;">
                  <strong>🎊 Congratulations on becoming a builder by adding your project!</strong><br>
                  Now you can update your profile at <a href="https://hyperkuvidlabs.tech/people/${user === null || user === void 0 ? void 0 : user.id}" style="color: #007bff; text-decoration: none;">hyperkuvidlabs.tech/people/${user === null || user === void 0 ? void 0 : user.id}</a>
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
Title: ${(project === null || project === void 0 ? void 0 : project.title) || 'N/A'}
Description: ${(project === null || project === void 0 ? void 0 : project.description) || 'N/A'}
Domain: ${(project === null || project === void 0 ? void 0 : project.domain) || 'N/A'}
Tech Stack: ${(project === null || project === void 0 ? void 0 : project.techstack) || 'N/A'}
${(project === null || project === void 0 ? void 0 : project.githubLink) ? `GitHub: ${project.githubLink}` : ''}
${(project === null || project === void 0 ? void 0 : project.documentation) ? `Documentation: ${project.documentation}` : ''}

🎊 Congratulations on becoming a builder by adding your project!
Now you can update your profile at https://hyperkuvidlabs.tech/people/${user === null || user === void 0 ? void 0 : user.id}

---
This email was sent by HyperKuvid Labs.
Approved on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        `
            };
            try {
                yield transporter.sendMail(newBuilderMailData);
            }
            catch (error) {
                console.error(`Error sending email to new builder ${creatorMail}:`, error);
            }
        }
    }
    res.status(200).send({
        message: "Project approved and linked to existing builder profile."
    });
}));
app.post("/admin/rejectProjects/:projectId", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const creators = req.body.creators;
    const message = req.body.message;
    yield prisma.project.update({
        where: {
            id: projectId
        },
        data: {
            status: "Rejected"
        }
    });
    const project = yield prisma.project.findUnique({
        where: {
            id: projectId
        }
    });
    yield prisma.project.delete({
        where: {
            id: projectId
        }
    });
    for (const creatorMail of creators) {
        const user = yield prisma.user.findUnique({
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
              <p style="margin: 5px 0;"><strong>Title:</strong> ${(project === null || project === void 0 ? void 0 : project.title) || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Description:</strong> ${(project === null || project === void 0 ? void 0 : project.description) || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Domain:</strong> ${(project === null || project === void 0 ? void 0 : project.domain) || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Tech Stack:</strong> ${(project === null || project === void 0 ? void 0 : project.techstack) || 'N/A'}</p>
              ${(project === null || project === void 0 ? void 0 : project.githubLink) ? `<p style="margin: 5px 0;"><strong>GitHub:</strong> <a
                href="${project.githubLink}" target="_blank">${project.githubLink}</a></p>` : ''}
              ${(project === null || project === void 0 ? void 0 : project.documentation) ? `<p style="margin: 5px 0;"><strong>Documentation:</strong> <a
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
            yield transporter.sendMail(mailData);
            console.log('Email sent successfully');
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
    res.status(200).send({
        message: "Project rejected and email sent to creators."
    });
}));
app.post("/user/addProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //req.body template
    // {
    //   ownerId : Mail,
    //   title, description, githubLink, story, documentation, cretors: mails of other contributors, owner user
    // }
    const { ownerId, title, description, githubLink, story, documentation, creators } = req.body;
    if (!githubLink && (!story || !documentation)) {
        return res.status(400).send({
            message: "Either gitub linkt or story and documentation should be provided."
        });
    }
    yield prisma.project.create({
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
    if (githubLink) {
        yield prisma.project.create({
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
    }
    else {
        yield prisma.project.create({
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
}));
app.get("/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma.builderProject.findMany({
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
}));
app.get("/projects/:projectId", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const project = yield prisma.builderProject.findUnique({
        where: {
            id: projectId
        },
        include: {
            owner: true,
            contributors: true
        }
    });
    const projectDetails = yield prisma.project.findUnique({
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
}));
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
app.get("/projects/notApproved", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectsArray = yield prisma.project.findMany({
        where: {
            status: "Waiting"
        }
    });
    res.status(200).send({
        projects: projectsArray
    });
}));
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
exports.default = app; //exporting the app for testing purposes
