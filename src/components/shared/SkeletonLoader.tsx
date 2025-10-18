interface SkeletonProps {
    variant?: 'text' | 'card' | 'map' | 'status-bar';
    count?: number;
  }
  
  export const SkeletonLoader: React.FC<SkeletonProps> = ({ 
    variant = 'text', 
    count = 1 
  }) => {
    const skeletons = Array.from({ length: count });
  
    if (variant === 'status-bar') {
      return (
        <div className="space-y-1">
          {skeletons.map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse">
              <div className="w-[160px] h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="flex-1 h-[36px] bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-[60px] h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      );
    }
    if (variant === 'map') {
        return (
          <div className="min-h-screen">
            {/* Hero Skeleton */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16">
              <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mx-auto w-3/4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto w-2/3"></div>
              </div>
            </section>
      
            {/* Stats Skeleton */}
            <section className="py-12 bg-white dark:bg-gray-800">
              <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
                      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
      
            {/* Map Skeleton */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
              <div className="mx-auto max-w-7xl px-4">
                <div className="h-[600px] bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
              </div>
            </section>
          </div>
        );
    }
    return null;
  };