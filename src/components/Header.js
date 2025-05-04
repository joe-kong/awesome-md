import React from 'react';
import styled from 'styled-components';
import { useEditor } from '../contexts/EditorContext';
import { useTheme } from '../contexts/ThemeContext';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FileName = styled.span`
  font-weight: 500;
  margin-right: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.text};
  
  // ファイルが変更されていたら、アスタリスクを表示
  ${({ isModified }) => isModified && `
    &::after {
      content: '*';
      margin-left: 4px;
      color: ${({ theme }) => theme.colors.accent};
    }
  `}
`;

const FilePath = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ThemeSelector = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 4px 8px;
  margin-left: 8px;
  color: ${({ theme, active }) => active ? theme.colors.accent : theme.colors.text};
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
  
  &:active {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const Header = () => {
  const { currentFile, isModified } = useEditor();
  const { themeName, setThemeName } = useTheme();
  
  // ファイル名を表示（パスから抽出）
  const getFileName = () => {
    if (!currentFile) return '無題';
    return currentFile.split('/').pop();
  };

  return (
    <HeaderContainer>
      <FileInfo>
        <FileName isModified={isModified}>{getFileName()}</FileName>
        {currentFile && <FilePath>{currentFile}</FilePath>}
      </FileInfo>
      
      <ThemeSelector>
        <ThemeButton 
          active={themeName === 'light'} 
          onClick={() => setThemeName('light')}
        >
          ライト
        </ThemeButton>
        <ThemeButton 
          active={themeName === 'dark'} 
          onClick={() => setThemeName('dark')}
        >
          ダーク
        </ThemeButton>
        <ThemeButton 
          active={themeName === 'sepia'} 
          onClick={() => setThemeName('sepia')}
        >
          セピア
        </ThemeButton>
      </ThemeSelector>
    </HeaderContainer>
  );
};

export default Header; 