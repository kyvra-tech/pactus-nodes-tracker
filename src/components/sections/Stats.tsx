interface Props {
  className?: string;
}

const Stats: React.FC<Props> = (className) => {
  return (
    <section className={`relative ${className}`}>
      <div className="mx-auto lg:mx-0 p-6 sm:p-8 py-8 sm:py-6 max-w-7xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-8 lg:gap-12">
        <div className="text-center group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
            99.999%
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">Average Uptime</p>
        </div>

        <div className="text-center group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
            0.001%
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">Average Downtime</p>
        </div>

        <div className="text-center group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
            50+
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">Bootstrap Nodes</p>
        </div>

        <div className="text-center group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
            800+
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">Peer Nodes</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
