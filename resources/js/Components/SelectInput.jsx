import { forwardRef } from "react";

const SelectInput = forwardRef(({ options = [], className = "", label, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
            <select
                {...props}
                ref={ref}
                className={
                    "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 " +
                    className
                }
            >
                <option value="">{label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectInput;
