import UsersTable from "./usersComp/UsersTable";



const AdminUsers = ({UsersData , adminId}) => {


    


    
    return (
        <div>
         <UsersTable adminId={adminId} users={UsersData}/>
        </div>
    );
    }

    export default AdminUsers;