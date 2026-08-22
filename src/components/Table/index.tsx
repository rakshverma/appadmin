import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTable, usePagination, useGlobalFilter, Column, TableInstance } from "react-table";

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  franchiseList?: any;
  setProductPriceOnFranchise?: any;
  filterOrderByFranchise?: any;
  franchiseId?: number;
  fromScreen?: any;
}

export type Deal = {
  categoryList: [];
};

declare module "react-table" {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  // @ts-ignore
  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}
  // @ts-ignore
  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseGroupByState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {}
}

function Table<T extends object>({
  columns,
  data,
  franchiseList,
  setProductPriceOnFranchise,
  franchiseId,
  fromScreen,
  filterOrderByFranchise,
}: TableProps<T>) {
  // Use the state and functions returned from useTable to build your UI
  console.log("DATA ROW = ", fromScreen);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  }: TableInstance<T> = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
    console.log(globalFilter);
  }, [globalFilter]);

  console.log("page= ", pageOptions);
  // Render the UI for your table
  return (
    <>
      <div className="row">
        <div className="col-sm-12 d-flex flex-wrap gap-2 my-2 ms-auto admin-table-tools">
          {!fromScreen && franchiseList && (
            <div className="me-2 w-75 d-flex admin-table-filter">
              <label className="my-auto w-auto me-2">Price Base on Franchise Label</label>
              <select className="form-select mb-2" defaultValue={franchiseId} onChange={(e) => setProductPriceOnFranchise(e)}>
                <option value="" disabled>
                  Select
                </option>
                {franchiseList.length > 0 &&
                  franchiseList.map((item: any, i: number) => {
                    return (
                      <option value={item.id} key={`frList_${i}`}>
                        {item.role_id === 1 ? `${item.name} (Admin)` : item.franchise_name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

          {fromScreen && fromScreen === "order" && franchiseList ? (
            <div className="me-2 w-75 d-flex admin-table-filter">
              <label className="my-auto w-auto me-2">Filter Order by Franchise</label>
              <select className="form-select mb-2" onChange={(e) => filterOrderByFranchise(e)}>
                <option value="">Select</option>
                {franchiseList.length > 0 &&
                  franchiseList.map((item: any, i: number) => {
                    return (
                      <option value={item.id} key={`frList_${i}`}>
                        {item.role_id === 1 ? `${item.name} (Admin)` : item.franchise_name}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : (
            ""
          )}
          <div className="search-box d-inline-block ms-auto">
            <div className="position-relative">
              <input
                type="text"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="form-control"
                placeholder="Search..."
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0" {...getTableProps()}>
          <thead className="table-light">
            {headerGroups.map((headerGroup: any) => (
              <tr className="align-middle" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th className="align-middle" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
            {page.length > 0 &&
              page.map((row: any, i: number) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="pagination admin-pagination" style={{ marginTop: 20 + "px", float: "right" }}>
        <button className="btn btn-primary btn-rounded waves-effect waves-light mb-2 me-2" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button className="btn btn-primary btn-rounded waves-effect waves-light mb-2 me-2" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"Prev"}
        </button>{" "}
        <button className="btn btn-primary btn-rounded waves-effect waves-light mb-2 me-2" onClick={() => nextPage()} disabled={!canNextPage}>
          {"Next"}
        </button>{" "}
        <button
          className="btn btn-primary btn-rounded waves-effect waves-light mb-2 me-2"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <div style={{ marginTop: 10 + "px", marginLeft: 20 + "px" }}>
          <span>
            Page{" "}
            <strong>
              {pageOptions.length === 0 ? pageIndex : pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
        <div style={{ marginTop: 3 + "px", marginLeft: 20 + "px" }}>
          <div
            style={{
              float: "left",
              marginTop: 6 + "px",
              marginRight: 5 + "px",
            }}
          >
            Go to page:{" "}
          </div>
          <div style={{ float: "right" }}>
            <input
              type="number"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
              className="form-control"
            />
          </div>
        </div>
        <div style={{ marginTop: 3 + "px", marginLeft: 20 + "px" }}>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="form-control"
            style={{ width: 120 + "px" }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize} Rows
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Table;
