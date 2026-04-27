import NavBar from "../components/NavBar.jsx";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-blue-700">
      <NavBar />
      <main className="p-4">{children}</main>
    </div>
  );
}

export default MainLayout;
