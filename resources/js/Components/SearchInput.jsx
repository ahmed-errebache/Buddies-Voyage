import { FaSearch } from "react-icons/fa";
import TextInput from "./TextInput";

const SearchInput = ({ value, onChange, placeholder = "Rechercher..." }) => {
    return (
        <div className="relative w-full">
            <TextInput
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-10 pr-4 py-2 w-full"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
    );
};

export default SearchInput;
