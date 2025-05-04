const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');

// 設定保存用のストア
const store = new Store();

let mainWindow;
let currentFile = null;

function createWindow() {
  // ウィンドウの作成
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // ローカル開発時はWebpackのDevServerから、本番ではビルドされたファイルを読み込む
  const startUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : `file://${path.join(__dirname, 'build', 'index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // 開発ツールを開く（開発時のみ）
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // メニューの設定
  setupMenu();
}

// アプリケーションの起動時
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 全てのウィンドウが閉じられたときのイベントハンドラ
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// メニューの設定
function setupMenu() {
  const template = [
    {
      label: 'ファイル',
      submenu: [
        {
          label: '新規作成',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('new-file');
            currentFile = null;
          }
        },
        {
          label: '開く',
          accelerator: 'CmdOrCtrl+O',
          click: openFile
        },
        {
          label: '保存',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            if (currentFile) {
              mainWindow.webContents.send('save-file', currentFile);
            } else {
              saveFileAs();
            }
          }
        },
        {
          label: '名前を付けて保存',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: saveFileAs
        },
        { type: 'separator' },
        {
          label: 'HTMLとしてエクスポート',
          click: () => exportAs('html')
        },
        {
          label: 'PDFとしてエクスポート',
          click: () => exportAs('pdf')
        },
        { type: 'separator' },
        {
          label: '終了',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: '編集',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: '表示',
      submenu: [
        {
          label: 'テーマの変更',
          submenu: [
            {
              label: 'ライト',
              click: () => mainWindow.webContents.send('change-theme', 'light')
            },
            {
              label: 'ダーク',
              click: () => mainWindow.webContents.send('change-theme', 'dark')
            },
            {
              label: 'セピア',
              click: () => mainWindow.webContents.send('change-theme', 'sepia')
            }
          ]
        },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'ヘルプ',
      submenu: [
        {
          label: 'バージョン情報',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              title: 'MD Editor',
              message: 'MD Editor v1.0.0',
              detail: 'A Markdown editor inspired by Typora'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ファイルを開く
function openFile() {
  dialog.showOpenDialog(mainWindow, {
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          dialog.showErrorBox('エラー', `ファイルを開けませんでした: ${err.message}`);
          return;
        }
        currentFile = filePath;
        mainWindow.webContents.send('file-opened', { filePath, content: data });
      });
    }
  }).catch(err => {
    dialog.showErrorBox('エラー', `ファイルを開けませんでした: ${err.message}`);
  });
}

// 名前を付けて保存
function saveFileAs() {
  dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled) {
      currentFile = result.filePath;
      mainWindow.webContents.send('save-file', currentFile);
    }
  }).catch(err => {
    dialog.showErrorBox('エラー', `ファイルを保存できませんでした: ${err.message}`);
  });
}

// HTMLまたはPDFにエクスポートする
function exportAs(type) {
  const filters = type === 'html'
    ? [{ name: 'HTML Files', extensions: ['html'] }]
    : [{ name: 'PDF Files', extensions: ['pdf'] }];

  dialog.showSaveDialog(mainWindow, {
    filters
  }).then(result => {
    if (!result.canceled) {
      mainWindow.webContents.send(`export-as-${type}`, result.filePath);
    }
  }).catch(err => {
    dialog.showErrorBox('エラー', `エクスポートできませんでした: ${err.message}`);
  });
}

// IPCイベントリスナー
ipcMain.on('save-file-content', (event, { filePath, content }) => {
  fs.writeFile(filePath, content, err => {
    if (err) {
      dialog.showErrorBox('エラー', `ファイルを保存できませんでした: ${err.message}`);
      return;
    }
    mainWindow.webContents.send('file-saved', filePath);
  });
});

ipcMain.on('export-content', (event, { filePath, content, type }) => {
  if (type === 'html') {
    // HTMLとしてエクスポート
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Exported Markdown</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
    }
    code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 16px;
      margin-left: 0;
      color: #555;
    }
    img {
      max-width: 100%;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
    `;
    fs.writeFile(filePath, htmlContent, err => {
      if (err) {
        dialog.showErrorBox('エラー', `HTMLエクスポートに失敗しました: ${err.message}`);
        return;
      }
      mainWindow.webContents.send('export-complete', { type: 'html', filePath });
    });
  } else if (type === 'pdf') {
    // PDF出力
    const pdfOptions = {
      marginsType: 1,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false
    };

    mainWindow.webContents.printToPDF(pdfOptions).then(data => {
      fs.writeFile(filePath, data, err => {
        if (err) {
          dialog.showErrorBox('エラー', `PDFエクスポートに失敗しました: ${err.message}`);
          return;
        }
        mainWindow.webContents.send('export-complete', { type: 'pdf', filePath });
      });
    }).catch(err => {
      dialog.showErrorBox('エラー', `PDFエクスポートに失敗しました: ${err.message}`);
    });
  }
});

// テーマ設定の保存と取得
ipcMain.on('save-theme', (event, themeName) => {
  store.set('theme', themeName);
});

ipcMain.handle('get-theme', () => {
  return store.get('theme', 'light'); // デフォルトはライトテーマ
}); 