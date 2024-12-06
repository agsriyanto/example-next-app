import React, { useEffect, useState } from "react";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');

      alert('User deleted successfully');
      fetchUsers();
      // setUsers(users.filter((user: any) => user.id !== id)); // Update UI
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  }

  const handleDate = (dateISO: string) => {
    const date = new Date(dateISO);

    const formattedDate = date.toLocaleDateString('en-GB');

    const result = formattedDate.replace(/\//g, '-');
    return result;
  }

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">List Users Admin</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">First Name</th>
              <th className="px-4 py-2 border border-gray-300">Last Name</th>
              <th className="px-4 py-2 border border-gray-300">Birth Date</th>
              <th className="px-4 py-2 border border-gray-300">Gender</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white"
              >
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.firstName}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.lastName}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {handleDate(user.birthDate)}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.gender}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <button
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Edit
                  </button> |{' '}
                  <button
                    className="text-red-500 hover:underline cursor-pointer"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;