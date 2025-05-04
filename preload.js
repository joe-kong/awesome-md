const { contextBridge, ipcRenderer } = require('electron');

// レンダラープロセスに公開するAPI
contextBridge.exposeInMainWorld('electron', {
  // ファイル操作
  newFile: () => ipcRenderer.on('new-file', () => {}),
  onNewFile: (callback) => ipcRenderer.on('new-file', callback),
  onFileOpened: (callback) => ipcRenderer.on('file-opened', (_, data) => callback(data)),
  onSaveFile: (callback) => ipcRenderer.on('save-file', (_, filePath) => callback(filePath)),
  saveFileContent: (filePath, content) => ipcRenderer.send('save-file-content', { filePath, content }),
  onFileSaved: (callback) => ipcRenderer.on('file-saved', (_, filePath) => callback(filePath)),
  
  // エクスポート
  onExportAsHtml: (callback) => ipcRenderer.on('export-as-html', (_, filePath) => callback(filePath)),
  onExportAsPdf: (callback) => ipcRenderer.on('export-as-pdf', (_, filePath) => callback(filePath)),
  exportContent: (filePath, content, type) => ipcRenderer.send('export-content', { filePath, content, type }),
  onExportComplete: (callback) => ipcRenderer.on('export-complete', (_, data) => callback(data)),
  
  // テーマ設定
  onChangeTheme: (callback) => ipcRenderer.on('change-theme', (_, themeName) => callback(themeName)),
  saveTheme: (themeName) => ipcRenderer.send('save-theme', themeName),
  getTheme: () => ipcRenderer.invoke('get-theme'),
  
  // リスナー削除ヘルパー
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
}); 