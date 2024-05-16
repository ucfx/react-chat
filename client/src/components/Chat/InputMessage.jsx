import { useState } from "react";
import useSendMessage from "hooks/useSendMessage";
const InputMessage = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
    e.target.children[0].focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-12 py-2 mx-auto flex gap-2 w-full max-w-[680px]"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input input-bordered border-slate-500 focus:border-primary focus:outline-none h-12 w-full"
        placeholder="Message"
      />
      <button
        className="btn btn-primary rounded-full py-1 disabled:bg-base-300"
        disabled={message === ""}
        type="submit"
      >
        ➤
      </button>
    </form>
  );
};

export default InputMessage;
