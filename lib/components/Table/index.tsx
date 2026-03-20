import React, { useState } from "react";
import { Table, Box } from "@radix-ui/themes";
import { Pagination } from "./Pagination";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number; // Jumlah data per halaman
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 5, // Default 5 baris per halaman
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Logika Kalkulasi Pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => (
              <Table.ColumnHeaderCell key={index}>
                {col.header}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((item) => (
            <Table.Row key={item.id}>
              {columns.map((col, index) => (
                <Table.Cell key={index}>
                  {typeof col.accessor === "function"
                    ? col.accessor(item)
                    : (item[col.accessor] as React.ReactNode)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Tampilkan Pagination hanya jika data lebih banyak dari pageSize */}
      {data.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Box>
  );
}