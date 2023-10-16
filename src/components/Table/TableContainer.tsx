"use client";

import { IPagination } from "@/types/pagination";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableColumn,
  TableHeader,
  TableHeaderProps,
  TableProps,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import BulkActionComponent from "../Action/BulkAction";
import TableTopContent from "./TableTopContent";

export type BulkAction = {
  name: string;
  href?: string;
  onClick?: () => Promise<void> | void;
}[];

interface TableContainerProps extends Omit<TableProps, "children"> {
  config?: {
    topContent?: React.ReactNode;
    tableHeaderProps?: TableHeaderProps<any>;
    tableBodyProps?: TableBodyProps<any>;
    tableCellProps?: TableCellProps;
    bulkActions?: {
      actions: BulkAction;
      // onView?: (id: string) => Promise<void>;
      // onEdit?: (id: string) => Promise<void>;
      onDelete?: (id: string) => Promise<void>;
    };
    baseHref: string;
  };
  pagination: IPagination;
  onPaginationChange: (page: number) => void;
  data: {
    items: any[] | undefined;
    isFetching: boolean;
  };
  children: (data: { item: any; columnKey: React.Key }) => React.ReactNode;
  columns: { name: string; uid: string }[];
}

const TableContainer: React.FC<TableContainerProps> = ({
  config,
  pagination,
  onPaginationChange,
  data,
  columns,
  children,
  ...props
}) => {
  const {
    topContent,
    tableBodyProps,
    tableCellProps,
    tableHeaderProps,
    bulkActions,
    baseHref,
  } = config || {};
  const { items, isFetching } = data || {};
  const { actions, onDelete } = bulkActions || {};

  const tableRef = React.useRef<HTMLDivElement>(null);
  const bulkActionRef = React.useRef<HTMLDivElement>(null);

  const [isBulkActionOpen, setIsBulkActionOpen] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set<string>([])
  );

  const tableClientRect = tableRef.current?.getBoundingClientRect();
  const bulkActionClientRect = bulkActionRef.current?.getBoundingClientRect();

  // calculate margin left/right for bulk action: (table width - bulk action width) / 2
  const marginBulkAction = React.useMemo(() => {
    return (
      (Number(tableClientRect?.width) - Number(bulkActionClientRect?.width)) / 2
    );
  }, [tableClientRect, bulkActionClientRect]);

  React.useEffect(() => {
    if (selectedKeys.size > 0) {
      setIsBulkActionOpen(true);
    } else {
      setIsBulkActionOpen(false);
    }
  }, [selectedKeys]);

  return (
    <div id="table-container" ref={tableRef} className="relative">
      <Table
        aria-label="Table"
        shadow="none"
        selectionMode="single"
        topContent={
          topContent && <TableTopContent>{topContent}</TableTopContent>
        }
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              aria-label="Pagination"
              isCompact
              showControls
              showShadow
              color="primary"
              page={pagination?.current_page}
              total={pagination?.total_pages}
              onChange={(page) => {
                onPaginationChange(page);
                setSelectedKeys(new Set<string>([]));
              }}
            />
          </div>
        }
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as any}
        {...props}
      >
        <TableHeader columns={columns} {...tableHeaderProps}>
          {(column: { name: string; uid: string }) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items || []}
          loadingContent={<Spinner />}
          isLoading={isFetching}
          emptyContent="Không có dữ liệu"
          {...tableBodyProps}
        >
          {(item) => (
            <TableRow key={item.id} className="!cursor-pointer">
              {(columnKey) => (
                <TableCell {...tableCellProps}>
                  {children({ item, columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <BulkActionComponent
        style={{
          marginLeft: marginBulkAction ? marginBulkAction : 0,
        }}
        ref={bulkActionRef}
        open={isBulkActionOpen}
        actions={actions}
        selectedKeys={[...selectedKeys]}
        baseHref={baseHref ?? ""}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TableContainer;
