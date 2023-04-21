import React, { useEffect, useState } from "react";
import ContentTemplate from "../../components/ContentTemplate";
import { getUsers } from "../../helpers/api_helper";
import ApproveUserModal from "../../components/modals/ApproveUserModal";
import { Pie } from "../../components/charts";

const ChartCard = ({ children }) => {
  return (
    <div className="bg-custom-white shadow rounded-lg p-4 border-gray-500 border-2">
      <div className="flex items-center justify-between mb-4">{children}</div>
    </div>
  );
};

const UsersTable = ({ setPendingUsers, data = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleRowClick = (userData) => {
    setShowModal(true);
    setModalData(userData);
  };

  const tableRow = (entry) => {
    return (
      <tr
        className="odd:bg-white even:bg-blue-50 cursor-pointer"
        key={entry.id}
        onClick={() => handleRowClick(entry)}
      >
        <td className="w-1/12 text-center py-2 px-2">{entry.id}</td>
        <td className="min-w-80 text-left py-3 px-2">{entry.name}</td>
        <td className="min-w-80  text-left py-3 px-2">{entry.email}</td>
        <td className="min-w-40 text-center text-sm py-3 px-2">
          {entry.role.toUpperCase()}
        </td>
        <td className="min-w-80 text-right py-3 px-2">{entry.balance}</td>
      </tr>
    );
  };

  return (
    <div className="py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr key="transaction-history-headers">
              <th className="w-1/12 text-center py-3 px-2 uppercase font-semibold text-xs">
                ID
              </th>
              <th className="w-1/4 text-left py-3 px-2 uppercase font-semibold text-xs">
                Name
              </th>
              <th className="min-w-80 text-left py-3 px-2 uppercase font-semibold text-xs">
                Email
              </th>
              <th className="min-w-80 text-center py-3 px-2 uppercase font-semibold text-xs">
                Role
              </th>
              <th className="min-w-40 text-center py-3 px-2 uppercase font-semibold text-xs">
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((entry) => {
              return tableRow(entry);
            })}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <ApproveUserModal
          setShowModal={setShowModal}
          data={modalData}
          setPendingUsers={setPendingUsers}
        />
      ) : null}
      ;
    </div>
  );
};

const ViewPendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const usersData = await getUsers();
      setPendingUsers(usersData.data.filter((user) => !user.is_approved));
    })();
  }, []);

  const getFilterCount = (array, key, value) => {
    return array.filter((item) => item[key] === value).length;
  };

  const usersByRole = [
    {
      id: "ADMIN",
      label: "Admin Users",
      value: getFilterCount(pendingUsers, "role", "admin"),
    },
    {
      id: "TRADER",
      label: "Trader Users",
      value: getFilterCount(pendingUsers, "role", "trader"),
    },
  ];

  return (
    <ContentTemplate
      title="Pending Users"
      admin={true}
      info={pendingUsers?.length}
    >
      <div className="min-h-80 w-full grid grid-cols-3 gap-8">
        <div className="bg-custom-white rounded-lg col-span-2 w-full p-8 border-2 border-gray-500">
          <div className="min-h-80 w-full flex flex-col">
            <h2 className="text-white">
              Users awaiting approval. Click a user to view and/or approve.
            </h2>
            <UsersTable data={pendingUsers} setPendingUsers={setPendingUsers} />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-8">
          <ChartCard>
            <div className="min-h-80 w-full">
              <h2 className="text-white">Pending Users By Role</h2>
              <Pie data={usersByRole} colorScheme="set3" />
            </div>
          </ChartCard>
        </div>
      </div>
    </ContentTemplate>
  );
};

export default ViewPendingUsers;
