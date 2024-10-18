import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import axios from "axios";
import * as XLSX from "xlsx";

const Admin = () => {
  const [userData, setUserData] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleExportToExcel = () => {
    const filename = "userData.xlsx";

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, "UserData");
    XLSX.writeFile(wb, filename);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://vivo-registration.onrender.com/api/users"
        );

        if (response.status === 200) {
          const users = response.data.map((user, index) => ({
            ...user,
            index, // Preserve original index
          }));
          setUserData(users);
        } else {
          alert("Error loading data");
        }
      } catch (error) {
        alert("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-3xl font-semibold">User Data</h2>
            <div className="flex items-center">
              <Button onClick={handleExportToExcel}>Export to Excel</Button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conjunction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gramatically Correct Statement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plural World
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comparative Form
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.conjuction}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.gramaticallyCorrect}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.pluralWorld}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.comparativeForm}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Admin;
