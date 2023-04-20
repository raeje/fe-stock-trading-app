import React, { useEffect, useState } from "react";
import ContentTemplate from "../../components/ContentTemplate";
import { getUsers } from "../../helpers/api_helper";
import UserModal from "../../components/UserModal";

const UsersTable = ({ setApprovedUsers, data = [] }) => {
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
        <UserModal
          setShowModal={setShowModal}
          data={modalData}
          setApprovedUsers={setApprovedUsers}
        />
      ) : null}
      ;
    </div>
  );
};
//const [showModal, setShowModal] = useState(false);
//{showModal ? <Modal setShowModal={setShowModal} /> : null}
const ViewApprovedUsers = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setApprovedUsers(users.data.filter((user) => user.is_approved));
    })();
  }, []);

  return (
    <ContentTemplate title="Approved Users">
      <div className="min-h-80 w-full grid grid-cols-3 gap-8">
        <div className="bg-custom-white rounded-lg col-span-2 w-full p-8 border-2 border-gray-500">
          <div className="min-h-80 w-full flex flex-col">
            <h2 className="text-white">Click a user to view and/or modify.</h2>
            <UsersTable
              data={approvedUsers}
              setApprovedUsers={setApprovedUsers}
            />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-8"></div>
      </div>
    </ContentTemplate>
  );
};

export default ViewApprovedUsers;
