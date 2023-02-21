import { actions, TableInstance } from "react-table";

type Props = {
  tableInstance: TableInstance<any>;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

function TableWrapper({ tableInstance, onEdit, onRemove }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-700 shadow sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-700"
            >
              <thead className="bg-gray-700">
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th
                            scope="col"
                            className=" px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                            {...column.getHeaderProps()}
                          >
                            {
                              // Render the header
                              column.render("Header")
                            }
                          </th>
                        ))
                      }
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white"
                      >
                        action
                      </th>
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody
                className="divide-y divide-gray-700 bg-white"
                {...getTableBodyProps()}
              >
                {
                  // Loop over the table rows
                  rows.map((row, index) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                className="whitespace-nowrap px-6 py-4"
                                {...cell.getCellProps()}
                              >
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                        <td className="whitespace-nowrap py-4 px-6">
                          <div className="text-center">
                            <button
                              onClick={() => onEdit(index)}
                              className="mx-1 rounded-md bg-slate-500 py-2 px-4 font-semibold text-white hover:bg-blue-600"
                            >
                              edit
                            </button>
                            <button
                              onClick={() => onRemove(index)}
                              className="mx-1 rounded-md bg-slate-500 p-2 font-semibold text-white hover:bg-red-600"
                            >
                              remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableWrapper;
