'use client'

import {React , useState , useMemo , useCallback} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import {PlusIcon} from "./table/PlusIcon";
import {VerticalDotsIcon} from "./table/VerticalDotsIcon";
import {SearchIcon} from "./table/SearchIcon";
import {ChevronDownIcon} from "./table/ChevronDownIcon";
import {columns, roleOptions , roleTranslater , dateFormatter , connectName} from "./table/TableUtils";
import AddUserModal from "./actions/AddUserModal";

const roleColorMap = {
  admin: "danger",
  editor: "warning",
  user: "",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role","email", "LastLogin", "RegisterDate", "actions"];

export default function UsersTable({users}) {

  
  const [addUsersModalOpen , setAddUsersModalOpen] = useState(false)
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "role",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filterValue.toLowerCase()) || 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== roleOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.role),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Function to compare Hebrew strings
const compareHebrew = (a, b) => {
    return a.localeCompare(b, 'he');
  };
  
  // Function to compare dates in dd/mm/yy format
  const compareDates = (a, b) => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day);
    };
  
    const dateA = parseDate(a);
    const dateB = parseDate(b);
  
    return dateA - dateB;
  };
  
  const sortedItems = useMemo(() => {
    if (sortDescriptor.column === "name") {
      return [...items].sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;
        return sortDescriptor.direction === 'descending' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
      })
    }
      
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      let cmp;
  
      if (typeof first === 'string' && typeof second === 'string') {
        if (/^\d{2}\/\d{2}\/\d{2}$/.test(first) && /^\d{2}\/\d{2}\/\d{2}$/.test(second)) {
          // Compare dates
          cmp = compareDates(first, second);
        } else {
          // Compare Hebrew strings
          cmp = compareHebrew(first, second);
        }
      } else {
        // Default comparison for other types (numbers, etc.)
        cmp = first < second ? -1 : first > second ? 1 : 0;
      }
  
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="text-md w-fit">
            <p>{user.firstName} {user.lastName}</p>
          </div>
        );
      case "role":
        return (
            <div className="text-md">
            <Chip color={roleColorMap[user.role]} size="md" className="text-black" variant="flat">
                {roleTranslater(user.role)}
            </Chip>
            </div>
        );
      case "email":
        return (
          <div className="text-md">
            <p>{user.email}</p>
          </div>
        );
      case "LastLogin":
        return (
          <div className="text-md">
            <p>{dateFormatter(user.LastLogin)}</p>
          </div>
        );
      case "RegisterDate":
        return (
          <div className="text-md">
            <p>{dateFormatter(user.RegisterDate)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button className="hover:bg-blue-400" isIconOnly size="md" variant="light">
                  <VerticalDotsIcon className="text-text" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu align="center" color="transparent">
                <DropdownItem className="text-center hover:bg-secondary hover:text-white">צפייה</DropdownItem>
                <DropdownItem className="text-center hover:bg-secondary hover:text-white">עריכה</DropdownItem>
                <DropdownItem className="text-center hover:bg-red-400 hover:text-white">מחיקה</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div dir="rtl" className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            isRtl
            variant="bordered"
            className="w-full sm:max-w-[44%]"
            placeholder="חפש לפי שם"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  סוג משתמש
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role.uid} className="text-center">
                    {role.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  עמודות
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem className="text-center" key={column.uid} >
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddUserModal />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">סהכ {users.length} משתמשים</span>
          <label className="flex flex-row-reverse items-center text-default-400 text-small">
            :שורות לדף
            <select
              className="bg-transparent outline-none text-default-400 text-small hover:text-black"
              onChange={onRowsPerPageChange}
            >
              <option className="w-full text-center" value="5">5</option>
              <option className="w-full text-center" value="10">10</option>
              <option className="w-full text-center" value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "כל הערכים נבחרו"
            : `${selectedKeys.size} מתוך ${filteredItems.length} נבחרו`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="md" variant="flat" onPress={onPreviousPage}>
            קודם
          </Button>
          <Button isDisabled={pages === 1} size="md" variant="flat" onPress={onNextPage}>
            הבא
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="users table"
      dir="rtl"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "h-[calc(100vh-300px)] px-2",
        table: "w-full px-2",
      }}
      
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader className="" columns={headerColumns}>
        {(column) => (
          <TableColumn
            className="text-white text-medium bg-tertiary w-fit"
            hideHeader={column.uid === "actions"}
            key={column.uid}
            align={column.uid === "actions" ? "center" : "center"}
            allowsSorting={column.sortable}
            onSortChange={(key) => onSortChange(key, column.uid)}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody dir="rtl" emptyContent={"לא נמצאו משתמשים"} items={sortedItems}>
        {(item) => (
          <TableRow className="cursor-pointer hover:bg-gray-400" key={item._id}>
            {(columnKey) => <TableCell dir="rtl" className="">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}