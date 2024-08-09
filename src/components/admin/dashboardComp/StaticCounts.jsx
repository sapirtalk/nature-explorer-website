import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";




const StaticCounts = ({Statistics}) => {

    const counts = {
        numOfUsers: 
                {
                count: Statistics.numOfUsers,
                title: "מספר משתמשים רשומים"
                },
        numOfTrails: 
                {
                count: Statistics.numOfTrails,
                title: "מספר מסלולים באתר"
                },
        numOfArticles: 
                {
                count: Statistics.numOfArticles,
                title: "מספר כתבות באתר"
                },
        numOfTours: 
                {
                count: Statistics.numOfTours,
                title: "מספר סיורים פעילים באתר"
                }  
    }

    return (
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(counts).map((count , index) => <div key={index}>{cardGenerator(count.title , count.count)}</div>)}
        </div>
    )
}

export default StaticCounts




const cardGenerator = (title , count) => {
    return (
        <Card className="hover:shadow-xl bg-[#f9f9f8]">
            <CardHeader className="flex gap-3 text-center justify-center">
                <h2 className="text-lg font-bold">{title}</h2>
            </CardHeader>
            <Divider/>
            <CardBody className="text-center">
                <p className="text-lg font-bold">{count}</p>
            </CardBody>
        </Card>
    )
}