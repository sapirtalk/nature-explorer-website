import DiffPie from "./DiffPie"
import UserEngagmentPie from "./UserEngagmentPie"
import TrafficGraph from "./TrafficGraph"



const Graphs = ({Statistics}) => {
    return (
        <div className="w-full pb-5 h-[100%] flex justify-between flex-row">
            <div className="w-[49%] pr-4 bg-[#f9f9f8] rounded-3xl shadow-xl hover:shadow-3xl" >
                <TrafficGraph user_traffic={Statistics.user_traffic}/>
            </div>
            <div className="w-[49%] flex flex-col justify-center items-center">
                <div className="flex flex-col bg-[#f9f9f8] mb-8 rounded-3xl shadow-xl hover:shadow-3xl justify-center items-center w-[100%] h-[40%] pb-4">
                    <DiffPie count_by_trail_diff={Statistics.count_by_trail_diff}/>
                </div>
                <div className="h-[55%] w-[100%] flex pt-2 bg-[#f9f9f8] rounded-3xl shadow-xl hover:shadow-3xl justify-center items-center">
                    <UserEngagmentPie user_engagement={Statistics.user_engagement} />
                </div>
            </div>
        </div>
    )
}



export default Graphs