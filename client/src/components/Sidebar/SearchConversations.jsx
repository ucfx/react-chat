import useSearch from "hooks/useSearch";
import useSearchStore from "stores/SearchStore";
import Conversation from "./Conversation";

const SearchConversations = () => {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const { data: searchUsers } = useSearch("api/users/search", searchTerm);

  return (
    <div className="py-2">
      {searchTerm !== "" &&
        searchUsers?.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
    </div>
  );
};

export default SearchConversations;
