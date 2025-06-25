const vscode = require('vscode');

/**
 * Provide completion items for LuSH language.
 * Suggest members only after the object and dot.
 */
function provideCompletionItems(document, position) {
  const linePrefix = document.lineAt(position).text.substr(0, position.character);

  if (linePrefix.endsWith('env.')) {
    return [
      new vscode.CompletionItem('pushd', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('popd', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('cd', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('pwd', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('set', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('get', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('del', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('print', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('cwd', vscode.CompletionItemKind.Function),
    ];
  }

  if (linePrefix.endsWith('fs.')) {
    return [
      new vscode.CompletionItem('ls', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('mkdir', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('rmdir', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('copy', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('move', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('rm', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('exists', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('parent', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('is_file', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('is_dir', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('read_file', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('write_file', vscode.CompletionItemKind.Function),
    ];
  }

  if (linePrefix.endsWith('os.')) {
    return [
      new vscode.CompletionItem('name', vscode.CompletionItemKind.Property),
      new vscode.CompletionItem('proc_names', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('proc_exes', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('pipe_exec', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('pipeline', vscode.CompletionItemKind.Function),
    ];
  }

  if (linePrefix.endsWith('files.')) {
    return [
      new vscode.CompletionItem('zip', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('unzip', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('compress', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('decompress', vscode.CompletionItemKind.Function),
    ];
  }

  if (linePrefix.endsWith('net.')) {
    return [
      new vscode.CompletionItem('wget', vscode.CompletionItemKind.Function),
    ];
  }

  if (linePrefix.endsWith('toml.')) {
    return [
      new vscode.CompletionItem('load_file', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('save_file', vscode.CompletionItemKind.Function),
    ];
  }

  if (linePrefix.endsWith('json.')) {
    return [
      new vscode.CompletionItem('load_file', vscode.CompletionItemKind.Function),
      new vscode.CompletionItem('save_file', vscode.CompletionItemKind.Function),
    ];
  }

  return undefined;
}

function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      'lush',
      {
        provideCompletionItems,
      },
      '.' // trigger completion after typing '.'
    )
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
