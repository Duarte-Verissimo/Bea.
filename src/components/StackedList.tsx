import React from "react";

interface StackedListProps {
  title: string;
  items: { description: string; amount: number }[];
  formatCurrency: (value: number) => string;
  totalAmount: number;
}

const StackedList: React.FC<StackedListProps> = ({
  title,
  items,
  formatCurrency,
  totalAmount,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-expanded={isOpen}
        role="button"
        aria-label={`Expandir detalhes de ${title}`}
      >
        <div className="flex items-center">
          <svg
            className={`w-5 h-5 mr-2 transition-transform duration-200 text-gray-600 ${
              isOpen ? "transform rotate-90" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-black ">{title}:</span>
        </div>
        <span className="font-medium text-black">
          {formatCurrency(totalAmount)}
        </span>
      </div>

      {isOpen && (
        <ul
          role="list"
          className="divide-y divide-gray-100 mt-2 border-t border-gray-200"
        >
          {items.map((item, index) => (
            <li key={index} className="flex justify-between gap-x-6 pt-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-medium text-gray-900">
                  {item.description.trim() !== ""
                    ? item.description
                    : `Custo Adicional ${index + 1}`}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.amount)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StackedList;
