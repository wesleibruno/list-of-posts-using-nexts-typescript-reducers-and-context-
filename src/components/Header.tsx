import { usePosts } from "@/contexts/PostsContext";
import { useState } from "react";

const Header = () => {
  const postCtx = usePosts();

  const [titleInput, setTitleInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");

  const handleAddButton = () => {
    if (titleInput && bodyInput) {
      postCtx?.dispatch({
        type: "add",
        payload: { title: titleInput, body: bodyInput },
      });
      setTitleInput("");
      setBodyInput("");
    }
  };

  return (
    <header>
      <h1 className="text-3xl">Titulo da pagina </h1>
      <div className="max-w-xl flex flex-col gap-3 my-4 border border-dotted border-gray-400 p-3">
        <input
          className="border border-gray-300 p-2 text-black text-xl"
          type="text"
          placeholder="Digite um Titulo"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <textarea
          className="h-24 border border-gray-300 p-2 text-black text-xl"
          placeholder="Digite um corpo"
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddButton}
          className="bg-blue-500 p-3 text-white rounded-md"
        >
          Adicionar
        </button>
      </div>
    </header>
  );
};

export default Header;
