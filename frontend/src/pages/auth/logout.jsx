import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [showModal, setShowModal] = useState(true); 
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("user");

   
    navigate("/login");
  };

  const handleCancel = () => {
   
    navigate("/admin/dashboard"); 
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutPage;