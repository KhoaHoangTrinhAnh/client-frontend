// D:\client-frontend\src\pages\Home.tsx
import { useEffect, useState } from "react";
import ContentViewer from "../components/ContentViewer";
import socket from "../socket";
import axios from "axios";

type Block = { type: "text" | "image" | "video"; value: string };
type Content = { _id: string; title: string; blocks: Block[] };

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [selected, setSelected] = useState<Content | null>(null);

  const handleNewContent = (newItem: Content) => {
  setContents((prev) => {
    const exists = prev.some(item => item._id === newItem._id);
    if (exists) return prev;
    return [newItem, ...prev];
  });
};

  useEffect(() => {
    // Lấy danh sách nội dung mỗi khi load
    axios.get("http://localhost:3000/contents").then((res) => {
      setContents(res.data);
    });

    // Lắng nghe real-time khi có bài viết mới
    const handleNewContent = (newItem: Content) => {
      setContents((prev) => {
        const exists = prev.some((item) => item._id === newItem._id);
        if (exists) return prev;
        return [newItem, ...prev];
      });
    };

    // Lắng nghe real-time khi có bài viết bị xoá
    const handleDeleteContent = ({ id }: { id: string }) => {
      setContents((prev) => prev.filter((item) => item._id !== id));
      // Nếu bài đang xem chi tiết bị xoá, quay lại danh sách
      if (selected?._id === id) {
        setSelected(null);
      }
    };

    const handleUpdateContent = (updatedItem: Content) => {
      setContents((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      // Nếu đang xem chi tiết thì cập nhật luôn
      if (selected?._id === updatedItem._id) setSelected(updatedItem);
    };

    socket.on("newContent", handleNewContent);
    socket.on("deleteContent", handleDeleteContent);
    socket.on("updateContent", handleUpdateContent);


    // Cleanup khi unmount
    return () => {
      socket.off("newContent", handleNewContent);
      socket.off("deleteContent", handleDeleteContent);
      socket.off("updateContent", handleUpdateContent);
    };
  }, [selected]);

  if (selected) {
    return (
      <div className="p-4">
        <button
          className="mb-4 text-blue-500"
          onClick={() => setSelected(null)}
        >
          ← Quay lại danh sách
        </button>
        <ContentViewer content={selected} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Client Real-time Viewer</h1>
      {contents.length === 0 ? (
        <p className="text-center mt-10">Chưa có nội dung nào...</p>
      ) : (
        <ul className="space-y-2">
          {contents.map((c) => (
            <li
              key={c._id}
              className="cursor-pointer hover:text-blue-500 underline"
              onClick={() => setSelected(c)}
            >
              {c.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
