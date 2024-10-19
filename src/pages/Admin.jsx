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
      const response = await axios.get("http://localhost:5000/api/users");

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

    // Filter out the fields object_id, _v, and index from userData
    const filteredData = userData.map(({ _id, __v, index, ...rest }) => rest);

    // Convert the filtered data into a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

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

  const tableHeader = [
    { header: "Name" },
    { header: "ID" },
    { header: "Que 1" },
    { header: "Que 2" },
    { header: "Que 3" },
    { header: "Que 4" },
    { header: "Que 5" },
    { header: "Que 6" },
    { header: "Que 7" },
    { header: "Que 8" },
    { header: "Que 9" },
    { header: "Que 10" },
    { header: "Que 11" },
    { header: "Que 12" },
    { header: "Que 13" },
    { header: "Que 14" },
    { header: "Que 15" },
    { header: "Que 16" },
    { header: "Que 17" },
    { header: "Que 18" },
    { header: "Que 19" },
    { header: "Que 20" },
    { header: "Que 21" },
    { header: "Que 22" },
    { header: "Que 23" },
    { header: "Que 24" },
    { header: "Que 25" },
    { header: "Que 26" },
    { header: "Que 27" },
    { header: "Que 28" },
    { header: "Que 29" },
    { header: "Que 30" },
  ];

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
              <Button onClick={handleRefresh}>Refresh Data</Button>{" "}
              {/* Refresh Button */}
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeader.map((data, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {data.header}
                    </th>
                  ))}
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
                    {Array.from({ length: 30 }, (_, index) => {
                      const questionKey = `que_${index + 1}`;
                      return (
                        <td
                          key={questionKey}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {user[questionKey]}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.timestamp).toLocaleString()}{" "}
                      {/* Format the timestamp */}
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
