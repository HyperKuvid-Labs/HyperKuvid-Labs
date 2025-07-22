"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowUp, Users } from 'lucide-react';

type MemberId = 'pradheep' | 'kb' | 'yuvanesh';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AskSenior = () => {
  const [selectedMember, setSelectedMember] = useState<MemberId>('pradheep');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const members = [
    { id: 'pradheep' as const, name: 'pradheep://ai', color: 'bg-purple-900/30 text-purple-300 border-purple-500/50' },
    { id: 'kb' as const, name: 'kb://ai', color: 'bg-purple-900/20 text-purple-400 border-purple-500/30' },
    { id: 'yuvanesh' as const, name: 'yuvi://ai', color: 'bg-purple-900/20 text-purple-400 border-purple-500/30' }
  ];

  const memberPersonas = {
    pradheep: {
      greeting: "Hi! I'm Pradheep's AI persona. Ask me anything about his work, projects, or experiences. I'll be happy to assist you.",
      sampleMessages: [
        {
          id: 2,
          sender: 'user' as const,
          content: "What are your main skills?",
          timestamp: new Date(Date.now() - 300000)
        },
        {
          id: 3,
          sender: 'ai' as const,
          content: "Pradheep specializes in full-stack development, with expertise in React, Node.js, and modern web technologies. He's passionate about creating scalable solutions and has experience in both frontend and backend development.",
          timestamp: new Date(Date.now() - 240000)
        }
      ]
    },
    kb: {
      greeting: "Hello! I'm KB's AI persona. Feel free to ask me about his expertise, projects, or anything you'd like to know about him.",
      sampleMessages: [
        {
          id: 2,
          sender: 'user' as const,
          content: "What's your background?",
          timestamp: new Date(Date.now() - 300000)
        },
        {
          id: 3,
          sender: 'ai' as const,
          content: "KB is a skilled developer with a strong background in software engineering. He focuses on building robust applications and has experience across multiple technology stacks.",
          timestamp: new Date(Date.now() - 240000)
        }
      ]
    },
    yuvanesh: {
      greeting: "Hi there! I'm Yuvanesh's AI persona. Ask me anything about his work, skills, or projects. I'm here to help you learn more about him.",
      sampleMessages: [
        {
          id: 2,
          sender: 'user' as const,
          content: "What do you enjoy working on?",
          timestamp: new Date(Date.now() - 300000)
        },
        {
          id: 3,
          sender: 'ai' as const,
          content: "Yuvanesh enjoys working on innovative projects that challenge conventional thinking. He has a keen interest in modern development practices and loves solving complex problems with elegant solutions.",
          timestamp: new Date(Date.now() - 240000)
        }
      ]
    }
  };

  const suggestedQuestions = [
    { text: "What is your design philosophy?", color: "bg-purple-900/40 text-purple-200 border-purple-500/50 hover:bg-purple-800/60" },
    { text: "Are you available for hire?", color: "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700" },
    { text: "How much time does it take for you to design & code a website?", color: "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700" }
  ];

  // Update chat messages when member changes
  useEffect(() => {
    const persona = memberPersonas[selectedMember];
    if (persona) {
      const initialMessages = [
        {
          id: 1,
          sender: 'ai' as const,
          content: persona.greeting,
          timestamp: new Date(Date.now() - 600000)
        },
        ...persona.sampleMessages
      ];
      setChatMessages(initialMessages);
    }
  }, [selectedMember]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'user',
      content: message,
      timestamp: new Date()
    }]);
    setMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const handleTabChange = (value: string) => {
    setSelectedMember(value as MemberId);
  };

const ChatInterface = ({ member }: { member: MemberId }) => (
  <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-white bg-black">
    <div className="mb-4">
      <p className="text-gray-300 mb-6">
        have a chat with my AI to know more about me!
      </p>
    </div>

    {/* Chat Container with Custom Scrollbar */}
    <Card className="border-2 border-purple-500/30 rounded-lg mb-4 p-4 min-h-80 bg-black/20 backdrop-blur-sm">
      <ScrollArea className="h-80 w-full pr-4">
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-lg transition-all duration-200 ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white border border-purple-500 shadow-purple-500/20'
                    : 'bg-gray-800/80 text-gray-100 border border-gray-700/50 backdrop-blur-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" className="w-2">
          <div className="relative flex w-full touch-none select-none items-center">
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-purple-500/10">
              <div className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-200 rounded-full shadow-sm" />
            </div>
          </div>
        </ScrollBar>
      </ScrollArea>
    </Card>

    {/* Enhanced Suggested Questions */}
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestedQuestions.map((question, index) => (
        <Badge
          key={index}
          variant="outline"
          className={`${question.color} cursor-pointer transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg px-3 py-2 text-sm border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10`}
          onClick={() => handleSuggestedQuestion(question.text)}
        >
          {question.text}
        </Badge>
      ))}
    </div>

    {/* Enhanced Input Area */}
    <div className="flex gap-3 mb-4">
      <div className="relative flex-1">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about me or my work!"
          className="bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-purple-300 focus:ring-purple-300/20 focus:ring-2 transition-all duration-200 backdrop-blur-sm h-12 rounded-xl"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
      </div>
      <Button
        onClick={handleSendMessage}
        size="icon"
        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border border-purple-500/50 shadow-lg shadow-purple-500/20 h-12 w-12 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-purple-500/30"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>

    {/* Enhanced Footer */}
    <div className="relative">
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Everyone makes mistakes, including this AI powered by{' '}
        <span className="text-purple-400 font-medium">Google's Gemini 2.5 Flash Lite</span>{' '}
        and <span className="text-purple-400 font-medium">Vercel AI SDK</span>. 
        Make sure to double-check important information.
      </p>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent rounded-lg -z-10" />
    </div>
  </div>
);


  const tabs = [
    {
      title: "pradheep://ai",
      value: "pradheep",
      content: <ChatInterface member="pradheep" />,
    },
    {
      title: "kb://ai",
      value: "kb", 
      content: <ChatInterface member="kb" />,
    },
    {
      title: "yuvi://ai",
      value: "yuvanesh",
      content: <ChatInterface member="yuvanesh" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black min-h-screen text-white">
      <div className="h-[600px] [perspective:1000px] relative flex flex-col max-w-4xl mx-auto w-full items-start justify-start">
        <Tabs defaultValue="pradheep" onValueChange={handleTabChange}>
          <div className="flex space-x-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedMember === tab.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          {tabs.find(tab => tab.value === selectedMember)?.content}
        </Tabs>
      </div>
    </div>
  );
};

export default AskSenior;
