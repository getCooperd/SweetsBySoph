import { Outlet, Link, useLocation } from "react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "@/imports/1876.jpg";

export function Layout() {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Sweets By Soph" className="h-16 w-16 object-contain" />
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className={`transition-colors hover:text-primary ${
                  location.pathname === "/" ? "text-primary" : "text-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`transition-colors hover:text-primary ${
                  location.pathname === "/shop" ? "text-primary" : "text-foreground"
                }`}
              >
                Shop
              </Link>
              <Link
                to="/checkout"
                className="relative flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all hover:opacity-90"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center text-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 Sweets By Soph. All rights reserved.</p>
          <p className="mt-2">Handcrafted with love</p>
        </div>
      </footer>
    </div>
  );
}
