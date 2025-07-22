"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  User, 
  Shield, 
  Crown, 
  FileText, 
  Mail, 
  Image as ImageIcon,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const ProjectApprovalFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const nodeVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 400
      }
    }
  };

  const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        pathLength: { duration: 1 },
        opacity: { duration: 0.5 }
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 overflow-hidden min-w-screen">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Project Approval Process
        </h1>
        <p className="text-gray-400 text-lg">
          From submission to gallery - your journey as a builder
        </p>
      </motion.div>

      {/* Flow Container */}
      <motion.div 
        className="max-w-6xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Step 1: User Submission */}
        <motion.div 
          className="flex justify-center mb-8"
          whileHover="hover"
        >
          <Card className="bg-white border-2 border-purple-500 w-80 cursor-pointer">
            <CardContent className="p-6 text-center">
              <motion.div 
                className="flex items-center justify-center mb-4"
                animate={activeStep === 0 ? "pulse" : ""}
              >
                <User className="w-8 h-8 text-purple-600 mr-2" />
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  User
                </Badge>
              </motion.div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Project Submission
              </h3>
              <p className="text-gray-600 text-sm">
                User submits project with documentation, code, and details
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <FileText className="w-4 h-4 text-gray-500" />
                <ImageIcon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">Files & Images</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Arrow Down */}
        <motion.div className="flex justify-center mb-8">
          <motion.svg 
            width="40" 
            height="60" 
            viewBox="0 0 40 60"
            className="text-purple-500"
          >
            <motion.path
              d="M20 5 L20 45 M10 35 L20 45 L30 35"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        {/* Step 2: Admin Review */}
        <motion.div 
          className="flex justify-center mb-8"
          whileHover="hover"
        >
          <Card className="bg-purple-600 border-none w-80 cursor-pointer">
            <CardContent className="p-6 text-center">
              <motion.div 
                className="flex items-center justify-center mb-4"
                animate={activeStep === 1 ? "pulse" : ""}
              >
                <Shield className="w-8 h-8 text-white mr-2" />
                <Badge className="bg-purple-800 text-white hover:bg-purple-700">
                  Admin
                </Badge>
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Senior/Admin Review
              </h3>
              <p className="text-purple-100 text-sm">
                Careful evaluation of project quality, innovation, and completeness
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Arrow Down to Decision */}
        <motion.div className="flex justify-center mb-8">
          <motion.svg 
            width="40" 
            height="60" 
            viewBox="0 0 40 60"
            className="text-purple-500"
          >
            <motion.path
              d="M20 5 L20 45 M10 35 L20 45 L30 35"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        {/* Step 3: Decision Diamond */}
        <motion.div 
          className="flex justify-center mb-12"
          whileHover="hover"
        >
          <motion.div 
            className="relative"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="w-32 h-32 bg-white border-2 border-purple-500 transform rotate-45 flex items-center justify-center cursor-pointer">
              <div className="transform -rotate-45 text-center">
                <h3 className="text-lg font-bold text-black">Approved?</h3>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decision Branches */}
        <div className="flex justify-between items-start mb-12">
          
          {/* Rejection Branch - Left */}
          <motion.div 
            className="flex flex-col items-center w-1/2"
          >
            {/* Rejection Arrow */}
            <motion.div className="flex items-center mb-4">
              <motion.svg 
                width="120" 
                height="40" 
                viewBox="0 0 120 40"
                className="text-red-500"
              >
                <motion.path
                  d="M10 20 L100 20 M90 10 L100 20 L90 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <Badge className="bg-red-500 text-white ml-2">
                <XCircle className="w-4 h-4 mr-1" />
                Rejected
              </Badge>
            </motion.div>

            {/* Rejection Node */}
            <motion.div whileHover="hover">
              <Card className="bg-purple-600 border-none w-72">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-white mr-2" />
                    <Badge className="bg-purple-800 text-white">
                      Admin Action
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Send Constructive Feedback
                  </h3>
                  <p className="text-purple-100 text-sm">
                    Detailed email with improvement suggestions and resubmission guidance
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Curved Return Arrow */}
            <motion.div className="mt-8">
              <motion.svg 
                width="200" 
                height="100" 
                viewBox="0 0 200 100"
                className="text-red-400"
              >
                <motion.path
                  d="M100 10 Q50 50 10 90 M20 80 L10 90 L20 100"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="5,5"
                  variants={arrowVariants}
                />
              </motion.svg>
              <p className="text-red-400 text-xs text-center mt-2">
                Resubmission Opportunity
              </p>
            </motion.div>
          </motion.div>

          {/* Approval Branch - Right */}
          <motion.div 
            className="flex flex-col items-center w-1/2"
          >
            {/* Approval Arrow */}
            <motion.div className="flex items-center mb-4">
              <Badge className="bg-green-500 text-white mr-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                Approved
              </Badge>
              <motion.svg 
                width="120" 
                height="40" 
                viewBox="0 0 120 40"
                className="text-green-500"
              >
                <motion.path
                  d="M10 20 L100 20 M90 10 L100 20 L90 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={arrowVariants}
                />
              </motion.svg>
            </motion.div>

            {/* Builder Promotion */}
            <motion.div 
              className="mb-8"
              whileHover="hover" 
            >
              <Card className="bg-white border-2 border-purple-500 w-72 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-purple-500"></div>
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="flex items-center justify-center mb-4"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Crown className="w-8 h-8 text-purple-600 mr-2" />
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Builder
                    </Badge>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    User Becomes Builder
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Congratulations! You're now a verified builder in our community
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Final Arrow */}
            <motion.div className="mb-8">
              <motion.svg 
                width="40" 
                height="60" 
                viewBox="0 0 40 60"
                className="text-green-500"
              >
                <motion.path
                  d="M20 5 L20 45 M10 35 L20 45 L30 35"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={arrowVariants}
                />
              </motion.svg>
            </motion.div>

            {/* Gallery Addition */}
            <motion.div whileHover="hover" >
              <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-none w-72">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="flex items-center justify-center mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ImageIcon className="w-8 h-8 text-white mr-2" />
                    <Badge className="bg-white text-purple-600 font-semibold">
                      Gallery
                    </Badge>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Project Added to Gallery
                  </h3>
                  <p className="text-purple-100 text-sm">
                    Your project is now showcased for the entire community to see and admire
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Legend */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex gap-8 bg-gray-900 rounded-lg p-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-6 h-6 bg-white border-2 border-purple-500 rounded flex items-center justify-center">
                <User className="w-3 h-3 text-purple-600" />
              </div>
              <span className="text-white text-sm font-medium">User</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-white text-sm font-medium">Admin</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-6 h-6 bg-white border-2 border-purple-500 border-l-4 rounded flex items-center justify-center">
                <Crown className="w-3 h-3 text-purple-600" />
              </div>
              <span className="text-white text-sm font-medium">Builder</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Demo Button */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Button 
            onClick={() => setShowAnimation(!showAnimation)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {showAnimation ? 'Reset Animation' : 'Watch Flow Animation'}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectApprovalFlow;
