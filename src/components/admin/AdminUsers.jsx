import UsersTable from "./usersComp/UsersTable";



const AdminUsers = ({UsersData}) => {

    
    return (
        <div>
         <UsersTable users={UsersData}/>
        </div>
    );
    }

    export default AdminUsers;