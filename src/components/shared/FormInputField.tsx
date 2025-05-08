import React from "react";

interface FormInputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = true,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className={`
          peer block w-full rounded-md
          border border-gray-300 bg-white px-5 py-2 h-12 text-sm text-gray-900
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          dark:border-gray-600 dark:bg-gray-800 dark:text-white
          dark:focus:border-blue-400 dark:focus:ring-blue-400
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-3 z-10 origin-[0] bg-white px-1 text-sm text-gray-500
          transition-all duration-200
          transform scale-100 top-2 -translate-y-4
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100
          peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500
          dark:bg-gray-800 dark:text-gray-400 dark:peer-focus:text-blue-400
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInputField;
