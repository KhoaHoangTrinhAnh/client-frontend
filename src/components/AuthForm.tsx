// D:\client-frontend\src\components\AuthForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  isLogin: boolean;
};

export default function AuthForm({ isLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/signup";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Login response:", data);
      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");

      
      if (isLogin) {
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } else {
      alert("Đăng ký thành công. Vui lòng đăng nhập.");
      navigate("/login");
    }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Tên người dùng"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </button>

        <p className="text-center text-sm">
          {isLogin ? (
            <>
              Chưa có tài khoản?{" "}
              <button
                type="button"
                className="text-blue-600 underline"
                onClick={() => navigate("/signup")}
              >
                Đăng ký
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <button
                type="button"
                className="text-blue-600 underline"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
