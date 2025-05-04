import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useEditor } from '../contexts/EditorContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';

const PreviewContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Preview = () => {
  const { content, setHtmlContent } = useEditor();
  const { themeName } = useTheme();
  const previewRef = useRef(null);

  // プレビューのHTMLを更新
  useEffect(() => {
    if (previewRef.current) {
      setHtmlContent(previewRef.current.innerHTML);
    }
  }, [content, setHtmlContent]);

  // シンタックスハイライトのスタイルをテーマに応じて変更
  const getSyntaxHighlighterStyle = () => {
    return themeName === 'dark' ? dracula : prism;
  };

  return (
    <PreviewContainer ref={previewRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={getSyntaxHighlighterStyle()}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </PreviewContainer>
  );
};

export default Preview; 