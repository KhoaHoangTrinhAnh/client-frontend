// D:\client-frontend\src\pages\Home.tsx
import { useEffect, useState } from "react";
import ContentViewer from "../components/ContentViewer";
import socket from "../socket";
import axios from "axios";
import Header from "../components/Header";

type Block = { type: "text" | "image" | "video"; value: string };
type Content = { _id: string; title: string; blocks: Block[] };

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [selected, setSelected] = useState<Content | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    // Lấy danh sách nội dung mỗi khi load
      axios
    .get("http://localhost:3000/contents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setContents(res.data);
    })
    .catch((err) => {
      console.error("Lỗi khi lấy nội dung:", err);
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
      <div className="w-screen p-4">
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
    <div className="h-screen w-screen p-4 pt-20 mx-auto">
      <Header />
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
