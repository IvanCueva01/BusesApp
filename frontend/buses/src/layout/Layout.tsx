import Footer from "./Footer";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

type Props = {};

function Layout({}: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
