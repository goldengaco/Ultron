import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowLeftRight } from 'lucide-react';

export default function JsonYamlConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('json-to-yaml');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    try {
      if (!input.trim()) return '';
      if (mode === 'json-to-yaml') {
        const obj = JSON.parse(input);
        return yamlStringify(obj);
      } else {
        const obj = yamlParse(input);
        return JSON.stringify(obj, null, 2);
      }
    } catch (e) {
      return `Error: ${e.message}`;
    }
  }, [input, mode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
            mode === 'json-to-yaml' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-secondary'
          }`}
          onClick={() => setMode('json-to-yaml')}
        >
          JSON → YAML
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
            mode === 'yaml-to-json' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-secondary'
          }`}
          onClick={() => setMode('yaml-to-json')}
        >
          YAML → JSON
        </button>
        <ArrowLeftRight
          size={16}
          className="text-text-muted ml-auto cursor-pointer hover:text-text-secondary"
          onClick={() => {
            if (output && !output.startsWith('Error')) {
              setInput(output);
              setMode(mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml');
            }
          }}
        />
      </div>

      <div>
        <label className="text-xs text-text-muted mb-1 block">
          {mode === 'json-to-yaml' ? 'JSON' : 'YAML'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'json-to-yaml' ? 'Pega tu JSON aquí...' : 'Pega tu YAML aquí...'}
          rows={8}
          className="w-full p-3 rounded-lg border border-border-default bg-bg-secondary text-text-primary placeholder-text-muted resize-none font-mono text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-text-muted">
            {mode === 'json-to-yaml' ? 'YAML' : 'JSON'}
          </label>
          <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary cursor-pointer">
            {copied ? <Check size={12} color="var(--color-success)" /> : <Copy size={12} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          rows={8}
          className="w-full p-3 rounded-lg border border-border-default bg-bg-primary text-text-primary font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
}

function yamlStringify(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  if (obj === null || obj === undefined) return 'null';
  if (typeof obj === 'string') return /^[0-9]/.test(obj) ? `"${obj}"` : obj.includes('\n') ? `|-\n${obj.split('\n').map(l => `  ${pad}${l}`).join('\n')}` : `"${obj}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj.map(item => `\n${pad}- ${yamlStringify(item, indent + 1).trimStart()}`).join('');
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    return keys.map(key => `\n${pad}${key}: ${yamlStringify(obj[key], indent + 1).trimStart()}`).join('');
  }
  return String(obj);
}

function yamlParse(yaml) {
  const lines = yaml.split('\n');
  const obj = {};
  const stack = [obj];
  const keyStack = [null];
  const indentStack = [-1];

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const indent = line.search(/\S/);
    const trimmed = line.trim();
    const colonIdx = trimmed.indexOf(':');

    if (trimmed.startsWith('- ')) {
      const val = trimmed.slice(2).trim();
      let parent = stack[stack.length - 1];
      if (!Array.isArray(parent)) {
        const arr = [];
        const key = keyStack[keyStack.length - 1];
        if (key !== null && parent) parent[key] = arr;
        if (stack[stack.length - 1] === parent) stack[stack.length - 1] = arr;
        parent = arr;
      }
      parent.push(parseYamlValue(val));
    } else if (colonIdx > -1) {
      const key = trimmed.slice(0, colonIdx).trim();
      const val = trimmed.slice(colonIdx + 1).trim();

      while (indent <= indentStack[indentStack.length - 1]) {
        stack.pop();
        keyStack.pop();
        indentStack.pop();
      }

      let current = stack[stack.length - 1];
      if (Array.isArray(current)) {
        const newObj = {};
        current.push(newObj);
        current = newObj;
        stack[stack.length - 1] = current;
      }

      if (val === '' || val === '|' || val === '>-') {
        const newObj = {};
        current[key] = newObj;
        stack.push(newObj);
        keyStack.push(key);
        indentStack.push(indent);
      } else {
        current[key] = parseYamlValue(val);
      }
    }
  }

  return obj;
}

function parseYamlValue(val) {
  if (val === 'null' || val === '~') return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (/^[0-9]+$/.test(val)) return parseInt(val, 10);
  if (/^[0-9]+\.[0-9]+$/.test(val)) return parseFloat(val);
  const m = val.match(/^"(.*)"$/);
  return m ? m[1] : val;
}
