import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useEditor } from '../contexts/EditorContext';

const EditorContainer = styled.div`
  height: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Editor = () => {
  const { content, setContent } = useEditor();
  const textareaRef = useRef(null);

  // タブキー入力の処理
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      // 選択範囲にタブを挿入
      const newValue = content.substring(0, start) + '  ' + content.substring(end);
      setContent(newValue);
      
      // カーソル位置を調整
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <EditorContainer>
      <StyledTextArea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="マークダウンを入力してください..."
        autoFocus
      />
    </EditorContainer>
  );
};

export default Editor; 