import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, className = "" }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-hero">

      {/* Decorative Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top Left */}
        <div className="animate-float absolute -top-32 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"></div>

        {/* Top Right */}
        <div className="animate-pulse-soft absolute top-24 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"></div>

        {/* Bottom Center */}
        <div className="animate-glow absolute bottom-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>

      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col">

        <Navbar />

        <main
          className={`flex-1 container-custom py-10 animate-fade ${className}`}
        >
          {children}
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default Layout;
