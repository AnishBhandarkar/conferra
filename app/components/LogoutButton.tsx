"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className="hover:text-black transition text-gray-700">
      Logout
    </button>
  );
}

/*
TODO:
router.refresh(); instead of window.location.reload(); as it refreshes server components only, not the whole page. 

*/