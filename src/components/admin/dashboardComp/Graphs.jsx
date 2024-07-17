import DiffPie from "./DiffPie"
import UserEngagmentPie from "./UserEngagmentPie"
import TrafficGraph from "./TrafficGraph"



const Graphs = ({Statistics}) => {
    return (
        <div className="w-full pb-5 h-[90%] flex flex-row">
            <div className="w-1/2" >
                <TrafficGraph user_traffic={Statistics.user_traffic}/>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <div className="flex w-full flex-col justify-center items-center h-[45%] pb-4">
                    <DiffPie count_by_trail_diff={Statistics.count_by_trail_diff}/>
                </div>
                <div className="h-[55%] w-full flex justify-center items-center">
                    <UserEngagmentPie user_engagement={Statistics.user_engagement} />
                </div>
            </div>
        </div>
    )
}



export default Graphs