import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', isFocused = false, label, ...props }, ref) => {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="w-full">
            {label && <label className="block text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
            <input
                {...props}
                type={type}
                ref={localRef}
                className={
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ' +
                    className
                }
            />
        </div>
    );
});

export default TextInput;
