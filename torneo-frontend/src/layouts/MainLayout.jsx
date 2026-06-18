import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout({ children }) {
  return (
    <div className="app-bg">
      <NavBar />
      <main className="p-4 md:p-6 fade-up">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
