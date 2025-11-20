import { Cloud, User, Menu, LogOut, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/CartDrawer";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Air Quality", href: "#air-quality" },
    { label: "Climate Map", href: "#climate-map" },
    { label: "Report Issue", href: "#report" },
    { label: "Shop", href: "#shop" },
    { label: "Climate Action", href: "#sdg13" },

  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Lovable Climate</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CartDrawer />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => navigate('/auth')}
            >
              <User className="h-5 w-5" />
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  {isAuthenticated ? (
                    <>
                      <div className="px-2 py-2 bg-muted rounded-md">
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <Button variant="outline" onClick={signOut} className="w-full">
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => { navigate('/auth'); setIsOpen(false); }} className="w-full">
                      <User className="h-5 w-5 mr-2" />
                      Login / Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
