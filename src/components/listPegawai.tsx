const ListPegawai = () => {

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">List Pegawai</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">First Name</th>
              <th className="px-4 py-2 border border-gray-300">Last Name</th>
              <th className="px-4 py-2 border border-gray-300">Phone Number</th>
              <th className="px-4 py-2 border border-gray-300">Gender</th>
              <th className="px-4 py-2 border border-gray-300">Address</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white"
            >
              <td className="px-4 py-2 border border-gray-300 text-center">
                dummy
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                dummy
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                dummy
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                dummy
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                dummy
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                dummy
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                <button
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Edit
                </button> |{' '}
                <button
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default ListPegawai;