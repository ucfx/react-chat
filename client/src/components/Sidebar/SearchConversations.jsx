import { useEffect } from "react";
import useSearch from "hooks/useSearch";
import useSearchStore from "stores/SearchStore";
import Conversation from "./Conversation";

const SearchConversations = () => {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const { data: searchUsers } = useSearch("api/users/search", searchTerm);

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    console.log("searchUsers", searchUsers);
  }, [searchUsers]);

  return (
    <div className="py-2">
      {searchUsers?.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default SearchConversations;
