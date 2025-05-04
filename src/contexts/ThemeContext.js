import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, sepiaTheme } from '../themes';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');
  const [theme, setTheme] = useState(lightTheme);

  // 初期化時にテーマを読み込む
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await window.electron.getTheme();
        setThemeName(savedTheme);
      } catch (error) {
        console.error('テーマの読み込みに失敗しました:', error);
      }
    };
    
    loadTheme();
  }, []);

  // テーマ名が変更されたら、対応するテーマオブジェクトに変更
  useEffect(() => {
    switch (themeName) {
      case 'dark':
        setTheme(darkTheme);
        break;
      case 'sepia':
        setTheme(sepiaTheme);
        break;
      default:
        setTheme(lightTheme);
    }

    // 設定を保存
    if (window.electron) {
      window.electron.saveTheme(themeName);
    }
  }, [themeName]);

  // テーマの変更をElectronから受け取る
  useEffect(() => {
    if (window.electron) {
      window.electron.onChangeTheme((themeName) => {
        setThemeName(themeName);
      });
    }

    return () => {
      if (window.electron) {
        window.electron.removeAllListeners('change-theme');
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}; 