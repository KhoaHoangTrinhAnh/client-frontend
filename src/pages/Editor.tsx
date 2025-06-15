import { useState } from "react";
import socket from "../socket";
import axios from "axios";

type Block = { type: "text" | "image" | "video"; value: string };
type Content = { title: string; blocks: Block[] };


export default function Editor() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blockType, setBlockType] = useState<"text" | "image" | "video">("text");
  const [value, setValue] = useState("");

  const addBlock = () => {
    if (!value.trim()) return;
    setBlocks([...blocks, { type: blockType, value }]);
    setValue("");
  };

  const submitContent = async () => {
  const content: Content = { title, blocks };
  socket.emit("submit-content", content); // real-time

  // Gọi API để lưu vào DB
  try {
    await axios.post("http://localhost:3000/contents", content); // điều chỉnh URL nếu backend khác port
  } catch (err) {
    console.error("Lỗi lưu nội dung:", err);
  }

  setTitle("");
  setBlocks([]);
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trình soạn nội dung</h1>

      <input
        type="text"
        className="border w-full p-2 mb-4"
        placeholder="Tiêu đề bài viết"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2 mb-2">
        <select
          value={blockType}
          onChange={(e) => setBlockType(e.target.value as any)}
          className="border p-2"
        >
          <option value="text">Text</option>
          <option value="image">Image URL</option>
          <option value="video">Video URL</option>
        </select>
        <input
          type="text"
          placeholder="Nội dung block"
          className="border flex-1 p-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4" onClick={addBlock}>
          Thêm
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {blocks.map((block, i) => (
          <div key={i} className="p-2 border rounded">
            <strong>{block.type}:</strong> {block.value}
          </div>
        ))}
      </div>

      <button className="bg-green-500 text-white px-6 py-2" onClick={submitContent}>
        Gửi nội dung
      </button>
    </div>
  );
}
