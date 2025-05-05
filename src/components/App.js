import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Editor from './Editor';
import Preview from './Preview';
import { ThemeProvider } from '../contexts/ThemeContext';
import { EditorProvider, useEditor } from '../contexts/EditorContext';
import { GlobalStyle } from '../themes/GlobalStyle';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const EditorPane = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  transition: width 0.3s ease, flex 0.3s ease;
  width: ${({ isVisible }) => isVisible ? '50%' : '0'};
  flex: ${({ isVisible }) => isVisible ? 1 : 0};
  overflow: ${({ isVisible }) => isVisible ? 'auto' : 'hidden'};
`;

const PreviewPane = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  transition: width 0.3s ease, flex 0.3s ease;
  flex: ${({ isFullWidth }) => isFullWidth ? 2 : 1};
`;

// レイアウトコンポーネント
const Layout = () => {
  const { isEditorVisible } = useEditor();

  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <MainContent>
        <EditorPane isVisible={isEditorVisible}>
          <Editor />
        </EditorPane>
        <PreviewPane isFullWidth={!isEditorVisible}>
          <Preview />
        </PreviewPane>
      </MainContent>
    </AppContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <EditorProvider>
        <Layout />
      </EditorProvider>
    </ThemeProvider>
  );
};

export default App; 