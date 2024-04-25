import { useState } from "react";
import { usePosts } from "@/contexts/PostsContext";

const PostList = () => {
  const postCtx = usePosts();
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedBody, setEditedBody] = useState<string>("");

  const handleEditStart = (id: number, title: string, body: string) => {
    setEditingPost(id);
    setEditedTitle(title);
    setEditedBody(body);
  };

  const handleEditCancel = () => {
    setEditingPost(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const handleEditSave = (id: number) => {
    // Verifica se o título ou o corpo estão vazios
    if (editedTitle.trim() === "" || editedBody.trim() === "") {
      alert("Por favor, preencha tanto o título quanto o corpo do post.");
      return; // Retorna sem salvar se algum estiver vazio
    }
    postCtx?.dispatch({
      type: "edit",
      payload: { id, title: editedTitle, body: editedBody },
    });
    setEditingPost(null);
    setEditedTitle("");
    setEditedBody("");
  };

  return (
    <div className="max-w-xl flex flex-col gap-3 my-4  p-3">
      {postCtx?.posts.map((item) => (
        <div key={item.id} className="p-3 border-b border-gray-500">
          {editingPost === item.id ? (
            <div className=" max-w-xl flex flex-col gap-3 my-1 border border-dotted p-3 text-black">
              <input
                placeholder="Digite um Titulo"
                className="p-2"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                placeholder="Digite um corpo"
                className="h-24"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
              <div className="flex gap-3 mt-3">
                <button
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={() => handleEditSave(item.id)}
                >
                  Salvar
                </button>
                <button
                  className="bg-red-500 text-white rounded-md p-2"
                  onClick={handleEditCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xl font-bold mb-2">{item.title}</div>
              <div className="text-sm">{item.body}</div>
              <div className="flex gap-3 mt-3">
                <button
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={() =>
                    handleEditStart(item.id, item.title, item.body)
                  }
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white rounded-md p-2"
                  onClick={() =>
                    postCtx?.dispatch({
                      type: "delete",
                      payload: { id: item.id },
                    })
                  }
                >
                  Deletar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
