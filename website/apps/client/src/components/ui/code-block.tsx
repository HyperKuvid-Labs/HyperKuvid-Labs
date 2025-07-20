"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy, IconTerminal, IconMarkdown, IconCode, IconEye, IconEyeOff } from "@tabler/icons-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  theme?: 'dark' | 'light';
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  maxHeight?: string;
} & (
  | { code: string; tabs?: never; }
  | { code?: never; tabs: Array<{
      name: string;
      code: string;
      language?: string;
      highlightLines?: number[];
    }>; }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  theme = 'dark',
  showLineNumbers = true,
  wrapLines = false,
  maxHeight = '400px',
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [showRendered, setShowRendered] = React.useState(true);

  const tabsExist = tabs.length > 0;

  const getLanguageConfig = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'md':
      case 'markdown':
        return {
          icon: <IconMarkdown size={16} className="text-blue-500" />,
          label: 'Markdown',
          style: theme === 'dark' ? atomDark : prism,
          showLineNumbers: false,
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
          supportsRendering: true,
        };
      case 'bash':
      case 'sh':
      case 'shell':
        return {
          icon: <IconTerminal size={16} className="text-green-500" />,
          label: 'Bash',
          style: theme === 'dark' ? atomDark : prism,
          showLineNumbers: showLineNumbers,
          backgroundColor: theme === 'dark' ? '#0d1117' : '#f6f8fa',
          supportsRendering: false,
        };
      case 'javascript':
      case 'js':
        return {
          icon: <IconCode size={16} className="text-yellow-500" />,
          label: 'JavaScript',
          style: theme === 'dark' ? atomDark : prism,
          showLineNumbers: showLineNumbers,
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
          supportsRendering: false,
        };
      case 'typescript':
      case 'ts':
      case 'tsx':
        return {
          icon: <IconCode size={16} className="text-blue-600" />,
          label: 'TypeScript',
          style: theme === 'dark' ? atomDark : prism,
          showLineNumbers: showLineNumbers,
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
          supportsRendering: false,
        };
      default:
        return {
          icon: <IconCode size={16} className="text-gray-500" />,
          label: lang.toUpperCase(),
          style: theme === 'dark' ? atomDark : prism,
          showLineNumbers: showLineNumbers,
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
          supportsRendering: false,
        };
    }
  };

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist ? tabs[activeTab].language || language : language;
  const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines;
  
  const langConfig = getLanguageConfig(activeLanguage);

  const scrollbarStyles = `
    .code-block-scrollable {
      scrollbar-width: thin;
      scrollbar-color: ${theme === 'dark' ? '#4b5563 #1f2937' : '#9ca3af #f3f4f6'};
    }
    
    .code-block-scrollable::-webkit-scrollbar {
      width: 12px;
      height: 12px;
      min-width: 12px;
    }
    
    .code-block-scrollable::-webkit-scrollbar-track {
      background: ${theme === 'dark' ? '#1f2937' : '#f3f4f6'};
      border-radius: 6px;
    }
    
    .code-block-scrollable::-webkit-scrollbar-thumb {
      background: ${theme === 'dark' ? '#4b5563' : '#9ca3af'};
      border-radius: 6px;
      border: 2px solid ${theme === 'dark' ? '#1f2937' : '#f3f4f6'};
      min-height: 40px;
    }
    
    .code-block-scrollable::-webkit-scrollbar-thumb:hover {
      background: ${theme === 'dark' ? '#6b7280' : '#6b7280'};
    }
    
    .code-block-scrollable::-webkit-scrollbar-thumb:active {
      background: ${theme === 'dark' ? '#9ca3af' : '#4b5563'};
    }
    
    .code-block-scrollable::-webkit-scrollbar-corner {
      background: ${theme === 'dark' ? '#1f2937' : '#f3f4f6'};
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {langConfig.icon}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {filename}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {langConfig.label}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Render toggle for Markdown */}
            {langConfig.supportsRendering && (
              <button
                onClick={() => setShowRendered(!showRendered)}
                className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                aria-label={showRendered ? "Show source" : "Show rendered"}
              >
                {showRendered ? (
                  <>
                    <IconEyeOff size={14} />
                    <span>Source</span>
                  </>
                ) : (
                  <>
                    <IconEye size={14} />
                    <span>Preview</span>
                  </>
                )}
              </button>
            )}
            
            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <IconCheck size={14} className="text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        {tabsExist && (
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-x-auto code-block-scrollable">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === index
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div 
          className="relative overflow-auto code-block-scrollable"
          style={{ 
            maxHeight,
            scrollBehavior: 'smooth'
          }}
        >
          {langConfig.supportsRendering && showRendered ? (
            // Rendered Markdown
            <div className={`p-6 prose prose-sm max-w-none ${
              theme === 'dark' 
                ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-800' 
                : 'prose-headings:text-gray-900 prose-p:text-gray-700'
            }`}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom code block rendering within markdown
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const lang = match ? match[1] : '';
                    
                    if (!inline && lang) {
                      return (
                        <SyntaxHighlighter
                          style={langConfig.style}
                          language={lang}
                          PreTag="div"
                          customStyle={{
                            margin: '1rem 0',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      );
                    } else {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  },
                  // Style links
                  a: ({children, href}) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                    >
                      {children}
                    </a>
                  ),
                  // Style headings
                  h1: ({children}) => (
                    <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0 text-gray-900 dark:text-white">
                      {children}
                    </h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white">
                      {children}
                    </h3>
                  ),
                  // Style lists
                  ul: ({children}) => (
                    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                      {children}
                    </ul>
                  ),
                  ol: ({children}) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                      {children}
                    </ol>
                  ),
                  // Style paragraphs
                  p: ({children}) => (
                    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                      {children}
                    </p>
                  ),
                }}
              >
                {activeCode || ''}
              </ReactMarkdown>
            </div>
          ) : (
            // Syntax highlighted code
            <div className="overflow-auto">
              <SyntaxHighlighter
                language={activeLanguage === 'md' ? 'markdown' : activeLanguage}
                style={langConfig.style}
                showLineNumbers={langConfig.showLineNumbers}
                wrapLines={wrapLines}
                wrapLongLines={activeLanguage === 'md' ? true : wrapLines}
                lineNumberStyle={{
                  minWidth: '3em',
                  paddingRight: '1em',
                  textAlign: 'right' as const,
                  userSelect: 'none' as const,
                  color: theme === 'dark' ? '#6b7280' : '#9ca3af',
                  backgroundColor: 'transparent',
                }}
                customStyle={{
                  margin: 0,
                  padding: activeLanguage === 'md' ? '1.5rem' : '1rem',
                  background: langConfig.backgroundColor,
                  fontSize: activeLanguage === 'md' ? '0.925rem' : '0.875rem',
                  lineHeight: activeLanguage === 'md' ? '1.7' : '1.5',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                }}
                lineProps={(lineNumber) => {
                  const style: React.CSSProperties = {};
                  if (activeHighlightLines.includes(lineNumber)) {
                    style.backgroundColor = theme === 'dark' 
                      ? 'rgba(59, 130, 246, 0.1)' 
                      : 'rgba(59, 130, 246, 0.1)';
                    style.display = 'block';
                    style.width = '100%';
                    style.margin = '0 -1rem';
                    style.padding = '0 1rem';
                  }
                  return { style };
                }}
              >
                {activeCode || ''}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Language-specific footer for bash */}
        {activeLanguage === 'bash' && (
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <IconTerminal size={12} />
              <span>Executable shell script</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
