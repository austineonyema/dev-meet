import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeTitles: { [key: string]: string } = {
  "/": "Home",
  "/login": "Login",
  "/register": "Register",
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/posts": "Posts",
  "/posts/new": "Create Post",
  "/settings": "Settings",
};

export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    // Handle dynamic routes like /posts/:id
    let title = routeTitles[path];

    if (!title) {
      if (path.startsWith("/posts/")) {
        title = "Viewing Post";
      } else if (path.startsWith("/profile/")) {
        title = "User Profile";
      } else {
        title = "Dev-Meet";
      }
    }

    document.title = `${title} | Dev-Meet`;
    window.scrollTo(0, 0);
  }, [location]);
}
