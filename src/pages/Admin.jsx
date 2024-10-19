import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import axios from "axios";
import * as XLSX from "xlsx";

const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from the API
  const getUserData = async () => {
    setLoading(true); // Show loader during API call
    try {
      const response = await axios.get("https://examregistrayion-backend.onrender.com/api/users");

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
      setLoading(false); // Hide loader once API call is done
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    getUserData();
  }, []);

  // Handle Excel export
  const handleExportToExcel = () => {
    const filename = "userData.xlsx";

    // Convert user data into a worksheet
    const ws = XLSX.utils.json_to_sheet(userData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheet with the name 'UserData' to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "UserData");

    // Write the workbook to file
    XLSX.writeFile(wb, filename);
  };

  // Handle refresh data
  const handleRefresh = () => {
    getUserData(); // Re-fetch the data from the API
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-3xl font-semibold">User Data</h2>
            <div className="flex items-center gap-4">
              <Button onClick={handleExportToExcel}>Export to Excel</Button>
              <Button onClick={handleRefresh}>Refresh Data</Button> {/* Refresh Button */}
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
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
                    Spell the word: An unexpected or astonishing event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spell the word: An animal that lives in the ocean
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Which word is spelled correctly?
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correct spelling of a two-wheeled vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opposite of "hot"
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Music Instrument spelling
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Add the missing letter in "ACOMPLISHMENT"
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remove extra letter from "APPETITTE"
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Find the misspelt word in the sentence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userData.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question2}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question3}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question4}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question5}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question6}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question7}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question8}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.question9}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default Admin;
