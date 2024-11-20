import Footer from "./Footer";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow px-4 sm:px-6 md:px-8">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
