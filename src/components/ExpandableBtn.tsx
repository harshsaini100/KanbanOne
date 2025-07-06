
const ExpandableBtn = ({onClick}) => {
  return (
    <div className="flex justify-end">
      <button
        className="group bg-indigo-600 text-white font-medium rounded-full px-2 py-2
                   transition-all duration-300 overflow-hidden w-10 hover:w-40 shadow-md
                   flex items-center justify-center cursor-pointer"
                   onClick={onClick}
      >
        {/* Plus Icon */}
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>

        {/* Add Project Text */}
        <span
          className="ml-2 hidden group-hover:inline-flex whitespace-nowrap transition-opacity duration-300"
        >
          Add Project
        </span>
      </button>
    </div>
  );
};

export default ExpandableBtn;
