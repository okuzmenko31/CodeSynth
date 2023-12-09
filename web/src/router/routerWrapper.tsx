import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const RouterWrapper = ({ children }: { children: any }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash === "") {
      document.documentElement.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return children;
};

export default RouterWrapper;