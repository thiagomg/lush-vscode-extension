import * as vscode from 'vscode';

// Type definitions for Lush modules
interface FunctionInfo {
  description: string;
  signature: string;
  snippet: string;
  parameters?: string[];
  returns?: string;
}

interface ModuleInfo {
  description: string;
  functions: Record<string, FunctionInfo>;
}

type LushModules = Record<string, ModuleInfo>;

// Lush function definitions based on documentation
const lushModules: LushModules = {
  env: {
    description: "Environment and shell operations",
    functions: {
      cwd: {
        description: "Retrieves the current directory",
        signature: "env.cwd(): string?",
        snippet: "cwd()",
        returns: "The current directory or nil if not available"
      },
      pushd: {
        description: "Changes the current working directory and pushes the previous one onto the stack",
        signature: "env.pushd(new_dir: string)",
        snippet: "pushd(\"${1:new_dir}\")",
        parameters: ["new_dir (string) - The new directory path to switch to"]
      },
      popd: {
        description: "Pops the top directory from the stack and changes to it",
        signature: "env.popd()",
        snippet: "popd()",
        parameters: []
      },
      chdir: {
        description: "Changes the current working directory",
        signature: "env.chdir(new_dir: string)",
        snippet: "chdir(\"${1:new_dir}\")",
        parameters: ["new_dir (string) - The new directory to switch to"]
      },
      pwd: {
        description: "Returns the current working directory as a string",
        signature: "env.pwd(): string",
        snippet: "pwd()",
        returns: "A string representing the current directory"
      },
      set: {
        description: "Sets an environment variable",
        signature: "env.set(name: string, value: string)",
        snippet: "set(\"${1:name}\", \"${2:value}\")",
        parameters: ["name (string) - The name of the environment variable", "value (string) - The value to set"]
      },
      get: {
        description: "Gets the value of an environment variable",
        signature: "env.get(name: string): string?",
        snippet: "get(\"${1:name}\")",
        parameters: ["name (string) - The name of the environment variable"],
        returns: "The value of the environment variable as a string, or nil if it does not exist"
      },
      del: {
        description: "Removes an environment variable",
        signature: "env.del(name: string)",
        snippet: "del(\"${1:name}\")",
        parameters: ["name (string) - The name of the environment variable to remove"]
      },
      print: {
        description: "Prints the provided tokens to the standard output. If first arg is string and second is table, formats by name or index",
        signature: "env.print(...: any)",
        snippet: "print(${1:...})",
        parameters: ["... - A variadic number of arguments to print"]
      }
    }
  },
  
  files: {
    description: "File compression and decompression operations",
    functions: {
      zip: {
        description: "Adds a list of files to a compressed zip archive",
        signature: "files.zip(zip_name: string, ...files: string)",
        snippet: "zip(\"${1:archive.zip}\", \"${2:file1}\", \"${3:file2}\")",
        parameters: ["zip_name - The name of the resulting ZIP file", "files (Variadic) - A variadic list of files to include"]
      },
      unzip: {
        description: "Decompresses a ZIP archive into the specified output directory",
        signature: "files.unzip(zip_name: string, output_dir?: string)",
        snippet: "unzip(\"${1:archive.zip}\", \"${2:output_dir}\")",
        parameters: ["zip_name - The name of the ZIP file to extract", "output_dir - Optional path to extraction directory"]
      },
      compress: {
        description: "Adds files to a compressed archive. Supports .zip and .tar.zst",
        signature: "files.compress(target_file_name: string, ...files: string)",
        snippet: "compress(\"${1:archive.zip}\", \"${2:file1}\", \"${3:file2}\")",
        parameters: ["target_file_name - The name of the resulting compressed file", "files (Variadic) - Files to include"]
      },
      decompress: {
        description: "Decompresses a compressed archive into the specified output directory",
        signature: "files.decompress(source_file_name: string, output_dir?: string)",
        snippet: "decompress(\"${1:archive.zip}\", \"${2:output_dir}\")",
        parameters: ["source_file_name - The compressed file to extract", "output_dir - Optional extraction directory"]
      }
    }
  },

  fs: {
    description: "File system operations",
    functions: {
      ls: {
        description: "Lists the contents of a directory. If no path provided, lists current directory",
        signature: "fs.ls(paths?: string): string[]",
        snippet: "ls(\"${1:.}\")",
        parameters: ["paths (string) - Optional directory path to list"],
        returns: "A table of strings representing file paths within the directory"
      },
      mkdir: {
        description: "Creates a directory at the specified path. Creates parent directories if needed",
        signature: "fs.mkdir(path: string)",
        snippet: "mkdir(\"${1:path}\")",
        parameters: ["path (string) - The directory path to create"]
      },
      rmdir: {
        description: "Removes a directory at the specified path. Can delete recursively",
        signature: "fs.rmdir(path: string, options?: {recursive: boolean}): boolean",
        snippet: "rmdir(\"${1:path}\", { recursive = ${2:true} })",
        parameters: ["path (string) - The directory path to remove", "options (table) - Optional table with recursive key"],
        returns: "true if directory was deleted"
      },
      copy: {
        description: "Copies a file from source to target path. If target is directory, copies into it",
        signature: "fs.copy(src: string, target: string)",
        snippet: "copy(\"${1:source}\", \"${2:target}\")",
        parameters: ["src (string) - The source file path", "target (string) - The target file or directory path"]
      },
      move: {
        description: "Moves a file from source to target path. If target is directory, moves into it",
        signature: "fs.move(src: string, target: string)",
        snippet: "move(\"${1:source}\", \"${2:target}\")",
        parameters: ["src (string) - The source file path", "target (string) - The target file or directory path"]
      },
      rm: {
        description: "Removes a file at the specified path. Can delete directories recursively",
        signature: "fs.rm(path: string, options?: {recursive: boolean})",
        snippet: "rm(\"${1:path}\")",
        parameters: ["path (string) - The file/directory path to remove", "options (table) - Optional table with recursive key"]
      },
      exists: {
        description: "Checks if a file or directory exists at the specified path",
        signature: "fs.exists(src: string): boolean",
        snippet: "exists(\"${1:path}\")",
        parameters: ["src (string) - The path to check"],
        returns: "true if the file exists, false otherwise"
      },
      is_dir: {
        description: "Checks if a path is a directory",
        signature: "fs.is_dir(src: string): boolean",
        snippet: "is_dir(\"${1:path}\")",
        parameters: ["src (string) - The path to check"],
        returns: "true if the path is a directory, false otherwise"
      },
      is_file: {
        description: "Checks if a path is a file",
        signature: "fs.is_file(src: string): boolean",
        snippet: "is_file(\"${1:path}\")",
        parameters: ["src (string) - The path to check"],
        returns: "true if the path is a file, false otherwise"
      },
      parent: {
        description: "Retrieves the parent path of a given path",
        signature: "fs.parent(src: string): string?",
        snippet: "parent(\"${1:path}\")",
        parameters: ["src (string) - The path to check"],
        returns: "Parent path of given path or nil if not available"
      },
      read_file: {
        description: "Reads a file from the given path and returns the content as string",
        signature: "fs.read_file(file_path: string): string?",
        snippet: "read_file(\"${1:file_path}\")",
        parameters: ["file_path (string) - Path of the file to be read"],
        returns: "content as string or nil if the file does not exist"
      },
      write_file: {
        description: "Writes a given content to a file in file_path",
        signature: "fs.write_file(file_path: string, content: string): boolean",
        snippet: "write_file(\"${1:file_path}\", \"${2:content}\")",
        parameters: ["file_path (string) - Path of the file to write", "content (string) - Content to be written"],
        returns: "true if succeeded to write or false if not"
      }
    }
  },

  json: {
    description: "JSON file operations",
    functions: {
      load_file: {
        description: "Loads a json file and returns it as a lua table",
        signature: "json.load_file(filename: string): table",
        snippet: "load_file(\"${1:filename}\")",
        parameters: ["filename (string) - File path to load"],
        returns: "Lua table with the content of the json file"
      },
      from_string: {
        description: "Loads a json from a string and returns it as a lua table",
        signature: "json.from_string(content: string): table",
        snippet: "from_string(\"${1:content}\")",
        parameters: ["content (string) - Content of the json"],
        returns: "Lua table with the content of the json"
      },
      save_file: {
        description: "Saves a lua table as a json file",
        signature: "json.save_file(filename: string, content: table)",
        snippet: "save_file(\"${1:filename}\", ${2:content})",
        parameters: ["filename (string) - File path to save", "content (table) - json content to be saved"]
      }
    }
  },

  net: {
    description: "Network operations",
    functions: {
      wget: {
        description: "Downloads a file and optionally renames to out_filename if provided",
        signature: "net.wget(url: string, out_filename?: string): string",
        snippet: "wget(\"${1:url}\", \"${2:filename}\")",
        parameters: ["url (string) - URL to download", "out_filename (string) - Optional output filename"],
        returns: "Name of the downloaded file"
      }
    }
  },

  os: {
    description: "Extended OS operations (extends Lua's built-in os module)",
    functions: {
      name: {
        description: "Returns the name of the operating system",
        signature: "os.name(): string",
        snippet: "name()",
        returns: "A string containing the name of the operating system (linux, macos, windows, etc.)"
      },
      proc_names: {
        description: "Returns a table containing running process names",
        signature: "os.proc_names(): table",
        snippet: "proc_names()",
        returns: "A table { pid: process_name }"
      },
      proc_exes: {
        description: "Returns a table containing running process executables with path",
        signature: "os.proc_exes(): table",
        snippet: "proc_exes()",
        returns: "A table { pid: process_executable_path }"
      },
      pipe_exec: {
        description: "Executes commands in parallel, piping results. Output goes to stdout",
        signature: "os.pipe_exec(commands: table)",
        snippet: "pipe_exec({\n\t{\"${1:command}\", \"${2:arg}\"},\n\t{${3:function_name}}\n})",
        parameters: ["commands (table) - Array of commands/functions to pipe"]
      },
      pipeline: {
        description: "Executes commands in parallel, piping results. Returns the output",
        signature: "os.pipeline(commands: table): string",
        snippet: "pipeline({\n\t{\"${1:command}\", \"${2:arg}\"},\n\t{${3:function_name}}\n})",
        parameters: ["commands (table) - Array of commands/functions to pipe"],
        returns: "Output of the last command in the pipe"
      },
      mkdtemp: {
        description: "Creates a temp directory that's deleted when script execution completes",
        signature: "os.mkdtemp(): string",
        snippet: "mkdtemp()",
        returns: "Path of the temporary directory"
      }
    }
  },

  string: {
    description: "Extended string operations (extends Lua's built-in string module)",
    functions: {
      split: {
        description: "Returns list of substrings separated by given separator",
        signature: "string.split(text: string, separator: string, keep_empty?: boolean): string[]",
        snippet: "split(\"${1:separator}\", ${2:true})",
        parameters: ["text (string) - Text to split", "separator (string) - Separator character", "keep_empty (boolean) - Keep empty strings, defaults to true"],
        returns: "Array of substrings"
      },
      startswith: {
        description: "Returns true if text starts with part",
        signature: "string.startswith(text: string, part: string): boolean",
        snippet: "startswith(\"${1:part}\")",
        parameters: ["text (string) - Text to check", "part (string) - Part to check for"],
        returns: "true if text starts with part"
      },
      endswith: {
        description: "Returns true if text ends with part",
        signature: "string.endswith(text: string, part: string): boolean",
        snippet: "endswith(\"${1:part}\")",
        parameters: ["text (string) - Text to check", "part (string) - Part to check for"],
        returns: "true if text ends with part"
      }
    }
  },

  toml: {
    description: "TOML file operations",
    functions: {
      load_file: {
        description: "Loads a toml file and returns it as a lua table",
        signature: "toml.load_file(filename: string): table",
        snippet: "load_file(\"${1:filename}\")",
        parameters: ["filename (string) - File path to load"],
        returns: "Lua table with the content of the toml file"
      },
      from_string: {
        description: "Loads a toml from a string and returns it as a lua table",
        signature: "toml.from_string(content: string): table",
        snippet: "from_string(\"${1:content}\")",
        parameters: ["content (string) - Content of the toml"],
        returns: "Lua table with the content of the toml"
      },
      save_file: {
        description: "Saves a lua table as a toml file",
        signature: "toml.save_file(filename: string, content: table)",
        snippet: "save_file(\"${1:filename}\", ${2:content})",
        parameters: ["filename (string) - File path to save", "content (table) - toml content to be saved"]
      }
    }
  }
};

export class LushCompletionProvider implements vscode.CompletionItemProvider {
  
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    
    const line = document.lineAt(position).text;
    const beforeCursor = line.substring(0, position.character);
    
    // Check if we're completing after a dot (module.function)
    const dotMatch = beforeCursor.match(/(\w+)\.(\w*)$/);
    
    if (dotMatch) {
      // We're completing table.function - only show function completions
      const moduleName = dotMatch[1];
      const partialFunction = dotMatch[2];
      
      if (moduleName in lushModules) {
        const completions = this.getModuleFunctionCompletions(moduleName, partialFunction);
        
        // For string module, don't return as CompletionList to allow other providers
        if (moduleName === 'string') {
          return completions; // Return array to allow merging with Lua string functions
        }
        
        // For other modules, return as CompletionList to have more control
        return new vscode.CompletionList(completions, false);
      }
    } else {
      // We're completing at top level
      const wordMatch = beforeCursor.match(/(\w*)$/);
      if (wordMatch) {
        const partial = wordMatch[1];
        
        // Only show module completions if the partial matches a module name
        // This prevents showing modules when user is typing other things
        const moduleMatches = Object.keys(lushModules).some(moduleName => 
          moduleName.startsWith(partial)
        );
        
        if (moduleMatches && partial.length > 0) {
          const completions = this.getModuleCompletions(partial);
          return new vscode.CompletionList(completions, false);
        }
      }
    }
    
    return new vscode.CompletionList([], false);
  }
  
  private getModuleCompletions(partial: string): vscode.CompletionItem[] {
    const completions: vscode.CompletionItem[] = [];
    
    for (const [moduleName, moduleInfo] of Object.entries(lushModules)) {
      if (moduleName.startsWith(partial)) {
        const item = new vscode.CompletionItem(moduleName, vscode.CompletionItemKind.Module);
        item.documentation = new vscode.MarkdownString(`**${moduleName} module**\n\n${moduleInfo.description}`);
        item.insertText = moduleName + '.';
        item.command = {
          command: 'editor.action.triggerSuggest',
          title: 'Trigger Suggest'
        };
        // Set sort order to appear after function completions
        item.sortText = 'z' + moduleName;
        completions.push(item);
      }
    }
    
    return completions;
  }
  
  private getModuleFunctionCompletions(moduleName: string, partial: string): vscode.CompletionItem[] {
    const completions: vscode.CompletionItem[] = [];
    const module = lushModules[moduleName];
    
    if (!module) return completions;
    
    for (const [funcName, funcInfo] of Object.entries(module.functions)) {
      if (funcName.startsWith(partial)) {
        const item = new vscode.CompletionItem(funcName, vscode.CompletionItemKind.Function);
        
        // Set signature as detail
        item.detail = funcInfo.signature;
        
        // Build comprehensive documentation
        let docString = `**${moduleName}.${funcName}**\n\n${funcInfo.description}`;
        
        if (funcInfo.parameters && funcInfo.parameters.length > 0) {
          docString += '\n\n**Parameters:**\n';
          funcInfo.parameters.forEach((param: string) => {
            docString += `- ${param}\n`;
          });
        }
        
        if (funcInfo.returns) {
          docString += `\n**Returns:**\n${funcInfo.returns}`;
        }
        
        item.documentation = new vscode.MarkdownString(docString);
        
        // Use snippet for insertion - this should include the function call
        if (funcInfo.snippet) {
          item.insertText = new vscode.SnippetString(funcInfo.snippet);
        } else {
          item.insertText = funcName + '()';
        }
        
        // Set a unique filter text to avoid conflicts
        item.filterText = `${moduleName}.${funcName}`;
        
        // For string module, use special sort order to integrate with Lua functions
        if (moduleName === 'string') {
          item.sortText = 'lush_' + funcName; // This will group Lush functions together
          item.detail = `(Lush) ${funcInfo.signature}`;
        } else {
          item.sortText = funcName;
        }
        
        // Prevent showing the bare function name without parameters
        item.preselect = true;
        
        completions.push(item);
      }
    }
    
    return completions;
  }
}

export class LushHoverProvider implements vscode.HoverProvider {
  
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    
    const range = document.getWordRangeAtPosition(position, /\w+\.\w+/);
    if (!range) return;
    
    const word = document.getText(range);
    const parts = word.split('.');
    
    if (parts.length === 2) {
      const [moduleName, funcName] = parts;
      const module = lushModules[moduleName];
      
      if (module && module.functions[funcName]) {
        const funcInfo = module.functions[funcName];
        
        let hoverText = `**${moduleName}.${funcName}**\n\n${funcInfo.description}`;
        
        if (funcInfo.signature) {
          hoverText += `\n\n\`\`\`lua\n${funcInfo.signature}\n\`\`\``;
        }
        
        if (funcInfo.parameters && funcInfo.parameters.length > 0) {
          hoverText += '\n\n**Parameters:**\n';
          funcInfo.parameters.forEach((param: string) => {
            hoverText += `- ${param}\n`;
          });
        }
        
        if (funcInfo.returns) {
          hoverText += `\n**Returns:** ${funcInfo.returns}`;
        }
        
        const hover = new vscode.Hover(new vscode.MarkdownString(hoverText));
        return hover;
      }
    }
    
    return null;
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Lush extension starting activation...');
  
  const completionProvider = new LushCompletionProvider();
  const hoverProvider = new LushHoverProvider();
  
  // Register for .lush files
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('lush', completionProvider, '.'),
    vscode.languages.registerHoverProvider('lush', hoverProvider)
  );
  
  console.log('Lush extension activated successfully');
}

export function deactivate() {
  console.log('Lush extension deactivated');
}
