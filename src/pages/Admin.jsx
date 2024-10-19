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
      const response = await axios.get(
        "https://examregistrayion-backend.onrender.com/api/users"
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
    { header: "MCQ_1" },
    { header: "MCQ_2" },
    { header: "MCQ_3" },
    { header: "MCQ_4" },
    { header: "MCQ_5" },
    { header: "MCQ_6" },
    { header: "MCQ_7" },
    { header: "MCQ_8" },
    { header: "MCQ_9" },
    { header: "MCQ_10" },
    { header: "MCQ_11" },
    { header: "MCQ_12" },
    { header: "MCQ_13" },
    { header: "MCQ_14" },
    { header: "MCQ_15" },
    { header: "MCQ_16" },
    { header: "MCQ_17" },
    { header: "MCQ_18" },
    { header: "MCQ_19" },
    { header: "MCQ_20" },
    { header: "MCQ_21" },
    { header: "MCQ_22" },
    { header: "MCQ_23" },
    { header: "MCQ_24" },
    { header: "MCQ_25" },
    { header: "MCQ_26" },
    { header: "MCQ_27" },
    { header: "MCQ_28" },
    { header: "MCQ_29" },
    { header: "MCQ_30" },
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
                    <td className="px-6 py-4 whitespace-nowrap">{user.NAME}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.ID}</td>
                    {Array.from({ length: 30 }, (_, index) => {
                      const questionKey = `MCQ0${index + 1}`; // Construct the key as MCQ01, MCQ02, etc.
                      return (
                        <td
                          key={questionKey}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {user[questionKey]}{" "}
                          {/* This will access the correct property */}
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
