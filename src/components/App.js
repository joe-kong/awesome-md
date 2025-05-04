import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Editor from './Editor';
import Preview from './Preview';
import { ThemeProvider } from '../contexts/ThemeContext';
import { EditorProvider } from '../contexts/EditorContext';
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
`;

const PreviewPane = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
`;

const App = () => {
  return (
    <ThemeProvider>
      <EditorProvider>
        <AppContainer>
          <GlobalStyle />
          <Header />
          <MainContent>
            <EditorPane>
              <Editor />
            </EditorPane>
            <PreviewPane>
              <Preview />
            </PreviewPane>
          </MainContent>
        </AppContainer>
      </EditorProvider>
    </ThemeProvider>
  );
};

export default App; 