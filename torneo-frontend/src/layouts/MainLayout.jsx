import NavBar from "../components/NavBar.jsx";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-blue-950">
      <NavBar />

      <main className="p-4">{children}</main>
    </div>
  );
}

export default MainLayout;
