export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Cours Disponibles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              HTML & CSS
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Apprenez les bases du développement web
            </p>
            <div className="text-sm text-cyan-600 dark:text-cyan-400">
              Durée: 7 jours
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              JavaScript
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Maîtrisez le langage de programmation web
            </p>
            <div className="text-sm text-cyan-600 dark:text-cyan-400">
              Durée: 21 jours
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              React
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Développez des applications modernes
            </p>
            <div className="text-sm text-cyan-600 dark:text-cyan-400">
              Durée: 14 jours
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
