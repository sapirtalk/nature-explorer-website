'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination } from "@nextui-org/react"
import AdminSingleTrail from "./trailsComp/AdminSingleTrail"
import { useState , useMemo, useCallback } from "react";
import { SearchIcon } from "./usersComp/table/SearchIcon";
import { MdModeEdit , MdDelete } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { PlusIcon } from "./usersComp/table/PlusIcon";
import AddTrailModal from "./trailsComp/AddTrailModal";
import DeleteTrailModal from "./trailsComp/DeleteTrailModal";
import EditTrailModal from "./trailsComp/EditTrailModal";
import TrailComments from "./trailsComp/TrailComments";





const AdminTrails = ({admin , trailsData , commentsData , usersData}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [trailModalSelected , setTrailModalSelected] = useState({modal :null , trail : null});

    const hasSearchFilter = Boolean(filterValue);
    
    const filteredItems = useMemo(() => {
        let filteredTrails = [...trailsData];
    
        if (hasSearchFilter) {
          filteredTrails = filteredTrails.filter((trail) =>
            trail.name.toLowerCase().includes(filterValue.toLowerCase())
          );
        }
    
        return filteredTrails;
    }, [trailsData, filterValue, hasSearchFilter]);

    const items = useMemo(() => {

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);
    
    
    const onSearchChange = useCallback((value) => {
        if (value) {
          setFilterValue(value);
          setCurrentPage(1);
        } else {
          setFilterValue("");
        }
    }, []);

    const onClear = useCallback(()=>{
        setFilterValue("")
        setCurrentPage(1)
    },[])

    const pages = Math.ceil(filteredItems.length / rowsPerPage);



    const modalShow = () => {
        
        const modal = trailModalSelected.modal
        const trail = trailModalSelected.trail
 
        
        switch(modal){

            case "comments":
                const trailComments = commentsData.filter(comment => comment.trailId === trail._id) 
                return (
                    <TrailComments trailName={trail.name} usersData={usersData} commentsData={trailComments} adminId={admin.id} closeCallback={setTrailModalSelected} />
                )

            case "edit":
                return (
                    <EditTrailModal trail={trail} adminId={admin.id} closeCallback={setTrailModalSelected} />
                )

            case "delete":
                return (
                    <DeleteTrailModal trail={trail} adminId={admin.id} closeCallback={setTrailModalSelected} />
                )

            default:
                return null
            }
    }




    return (
        <div className="w-full h-full flex flex-row-reverse">
            <div dir="rtl" className="w-[40%] h-full flex flex-col">
                <div className="w-full h-[10%] flex items-center justify-between border-b-2 border-secondary">
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
                <AddTrailModal adminId={admin.id} />
                </div>
                <p className="w-full text-sm py-4 text-default-400" >נמצאו {filteredItems.length} מסלולים</p>
                <div dir="ltr" className="w-full h-[90%] flex items-end pr-10 flex-col justify-start overflow-y-scroll">
                    {items.map((trail) => <div key={trail._id} className="mt-4">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="w-full h-full bg-transparent p-0 flex shadow-lg justify-center items-center">
                                    <AdminSingleTrail key={trail._id} trail={trail} admin={admin} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu onAction={(key) => setTrailModalSelected({modal :key , trail : trail})} aria-label="Actions">
                                <DropdownItem key="comments" endContent = {<FaRegComments />}>תגובות</DropdownItem>
                                <DropdownItem key="edit" endContent = {<MdModeEdit />}>ערוך מסלול</DropdownItem>
                                <DropdownItem key="delete" endContent = {<MdDelete />} className="text-danger" color="danger">
                                    מחק מסלול
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>)}
                </div>
                <div className="w-full flex items-start flex-col justify-end h-[10%]">
                <span className="w-[30%] text-small text-default-400">
                    עמוד {currentPage} מתוך {pages}
                </span> 
                <div className="flex gap-2">
                <div className="flex gap-2">
                        <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                        >
                        הקודם
                        </Button>
                        <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => setCurrentPage((prev) => (prev < pages ? prev + 1 : prev))}
                        >
                        הבא
                        </Button>
                    </div>
                <Pagination
                    total={pages}
                    color="secondary"
                    page={currentPage}
                    onChange={setCurrentPage}
                />
                    </div>
                </div>
            </div>
            <div className="w-[60%] h-full p-3 flex justify-center items-center">
                {modalShow()}   
            </div>
        </div>
    )
}

export default AdminTrails