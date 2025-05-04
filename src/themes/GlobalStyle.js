import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary};
    transition: all 0.2s ease-in-out;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scrollbarTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollbarThumb};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollbarThumb}cc;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    font-family: ${({ theme }) => theme.fonts.code};
  }

  button, input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.75em;
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: 2em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 0.3em;
  }

  h2 {
    font-size: 1.5em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 0.3em;
  }

  h3 {
    font-size: 1.25em;
  }

  h4 {
    font-size: 1em;
  }

  h5 {
    font-size: 0.875em;
  }

  h6 {
    font-size: 0.85em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  p, ul, ol, blockquote, pre, table {
    margin-top: 0;
    margin-bottom: 16px;
  }

  ul, ol {
    padding-left: 2em;
  }

  li {
    margin: 0.25em 0;
  }

  blockquote {
    padding: 0 1em;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-left: 0.25em solid ${({ theme }) => theme.colors.blockquoteBorder};
    background-color: ${({ theme }) => theme.colors.blockquoteBackground};
    margin-left: 0;
    margin-right: 0;
  }

  hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: ${({ theme }) => theme.colors.border};
    border: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    overflow: auto;
  }

  table th, table td {
    padding: 6px 13px;
    border: 1px solid ${({ theme }) => theme.colors.tableBorder};
  }

  table th {
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.tableHeaderBg};
  }

  table tr {
    border-top: 1px solid ${({ theme }) => theme.colors.tableBorder};
  }

  img {
    max-width: 100%;
    box-sizing: content-box;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: ${({ theme }) => theme.colors.codeBackground};
    border-radius: 3px;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: ${({ theme }) => theme.colors.codeBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.codeBorder};
  }

  pre code {
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }
`; 