import { useNavigate } from "react-router-dom";
import useSearchStore from "stores/SearchStore";

const SearchInput = () => {
  const { searchTerm, setSearchTerm, setSearchMode } = useSearchStore();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <input
        className="input input-bordered border-slate-500 focus:border-primary focus:outline-none h-12 w-full max-w-xs"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => {
          setSearchMode(true);
          navigate("/");
        }}
      />
    </div>
  );
};

export default SearchInput;
