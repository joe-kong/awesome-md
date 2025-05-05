import React, { createContext, useState, useEffect, useContext } from 'react';

const EditorContext = createContext({
  content: '',
  setContent: () => {},
  currentFile: null,
  setCurrentFile: () => {},
  isModified: false,
  setIsModified: () => {},
  exportHtml: () => {},
  exportPdf: () => {},
  isEditorVisible: true,
  toggleEditorVisibility: () => {}
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [content, setContent] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(true);

  // エディタの表示/非表示を切り替える関数
  const toggleEditorVisibility = () => {
    setIsEditorVisible(prev => !prev);
  };

  // ファイル操作イベントリスナーの設定
  useEffect(() => {
    if (window.electron) {
      // 新規ファイル作成
      window.electron.onNewFile(() => {
        setContent('');
        setCurrentFile(null);
        setIsModified(false);
      });

      // ファイルを開く
      window.electron.onFileOpened((data) => {
        setContent(data.content);
        setCurrentFile(data.filePath);
        setIsModified(false);
      });

      // ファイル保存
      window.electron.onSaveFile((filePath) => {
        window.electron.saveFileContent(filePath, content);
        setCurrentFile(filePath);
        setIsModified(false);
      });

      // ファイル保存完了
      window.electron.onFileSaved((filePath) => {
        setCurrentFile(filePath);
        setIsModified(false);
      });

      // HTMLエクスポート
      window.electron.onExportAsHtml((filePath) => {
        window.electron.exportContent(filePath, htmlContent, 'html');
      });

      // PDFエクスポート
      window.electron.onExportAsPdf((filePath) => {
        window.electron.exportContent(filePath, htmlContent, 'pdf');
      });

      // エクスポート完了
      window.electron.onExportComplete((data) => {
        console.log(`${data.type}のエクスポートが完了しました:`, data.filePath);
      });
    }

    // クリーンアップ
    return () => {
      if (window.electron) {
        window.electron.removeAllListeners('new-file');
        window.electron.removeAllListeners('file-opened');
        window.electron.removeAllListeners('save-file');
        window.electron.removeAllListeners('file-saved');
        window.electron.removeAllListeners('export-as-html');
        window.electron.removeAllListeners('export-as-pdf');
        window.electron.removeAllListeners('export-complete');
      }
    };
  }, [content, htmlContent]);

  // コンテンツが変更されたらisModifiedをtrueに
  const handleContentChange = (newContent) => {
    setContent(newContent);
    setIsModified(true);
  };

  // HTMLコンテンツを設定する関数
  const setHtmlContentHandler = (html) => {
    setHtmlContent(html);
  };

  return (
    <EditorContext.Provider
      value={{
        content,
        setContent: handleContentChange,
        currentFile,
        setCurrentFile,
        isModified,
        setIsModified,
        setHtmlContent: setHtmlContentHandler,
        htmlContent,
        isEditorVisible,
        toggleEditorVisibility
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}; 