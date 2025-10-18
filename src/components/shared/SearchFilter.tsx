interface SearchFilterProps {
    onSearch: (query: string) => void;
    onFilter: (filter: string) => void;
    filters?: { label: string; value: string }[];
  }
  
  export const SearchFilter: React.FC<SearchFilterProps> = ({
    onSearch,
    onFilter,
    filters = []
  }) => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search nodes..."
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
        />
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <option value="">All Status</option>
          {filters.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>
    );
  };