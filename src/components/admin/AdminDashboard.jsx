import Graphs from "./dashboardComp/Graphs"
import StaticCounts from "./dashboardComp/StaticCounts"






const AdminDashboard = ({admin , Statistics}) => {
    return (
        <div className="w-full h-full">
            <div className="h-[15%]">
            <StaticCounts Statistics={Statistics} />
            </div>
            <div className="h-[85%]">
            <Graphs Statistics={Statistics}/>
            </div>
        </div>
    )
}



export default AdminDashboard