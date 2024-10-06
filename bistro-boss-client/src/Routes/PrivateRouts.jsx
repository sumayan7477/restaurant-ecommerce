import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRouts = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
//   go to location code from Breadcrumbsreact-router/examples/auth/src/App.tsx
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRouts;
