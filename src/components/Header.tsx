// src/components/Header.tsx
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

    const handleLogout = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) return;

    try {
        await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    } catch (error) {
        console.error("Lỗi khi logout:", error);
    }

    // Xóa token khỏi localStorage và điều hướng
    localStorage.removeItem("access_token");
    navigate("/login");
    };


  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 z-50 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Client Real-time Viewer</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Đăng xuất
      </button>
    </header>
  );
}
