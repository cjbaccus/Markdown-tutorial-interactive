import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Preview({ markdown }) {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preview</h3>
      </div>
      <div className="flex-1 overflow-auto p-6">
        {markdown ? (
          <div className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-gray-400 dark:text-gray-500 text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <p className="mt-2 text-sm">Your markdown preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Preview
