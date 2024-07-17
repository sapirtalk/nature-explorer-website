import Graphs from "./dashboardComp/Graphs"
import StaticCounts from "./dashboardComp/StaticCounts"






const AdminDashboard = ({admin , Statistics}) => {
    return (
        <div className="w-full h-full">
            <div className="h-[20%]">
            <StaticCounts Statistics={Statistics} />
            </div>
            <div className="h-[80%]">
            <Graphs Statistics={Statistics}/>
            </div>
        </div>
    )
}



export default AdminDashboard