export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Forum Communautaire
        </h1>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              HTML & CSS
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discussions sur le développement frontend
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              15 sujets • 3 nouveaux aujourd'hui
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              JavaScript
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Aide et conseils sur JavaScript
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              28 sujets • 7 nouveaux aujourd'hui
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              React
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Communauté React et écosystème
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              42 sujets • 12 nouveaux aujourd'hui
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
