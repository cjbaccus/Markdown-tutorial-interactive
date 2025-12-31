import { useEffect, useRef } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'

function Editor({ value, onChange, placeholder = "Type your markdown here..." }) {
  const editorRef = useRef(null)

  useEffect(() => {
    // Focus editor on mount
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">Editor</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <CodeEditor
          ref={editorRef}
          value={value}
          language="markdown"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          padding={16}
          className="w-full h-full font-mono text-sm"
          style={{
            backgroundColor: '#ffffff',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: 14,
            minHeight: '100%',
          }}
        />
      </div>
    </div>
  )
}

export default Editor
