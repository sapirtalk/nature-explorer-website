import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";




const SingleComment = ({comment , user_id}) => {

    const {userName, title, trailId, userId , textMessage, createdAt, updatedAt , _id} = comment;

    const canDelete = userId === user_id


    const deleteComment = async () => {

        // show a confirmation before deleting
        if (!confirm('האם אתה בטוח שברצונך למחוק את התגובה?')) {
            return
        }
        const res = await fetch('/api/comments', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user_id,
                commentId: _id
            })
        }).catch(err => console.log(err))
        toast.success('התגובה נמחקה בהצלחה')
        // after 2 seconds reload the page
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }



    return (

        <Card className="max-w-[700px] w-full">
            <CardHeader>
                <div className="flex flex-col w-full">
                    <header className="text-text font-bold">{title}</header>
                    <Divider />
                    <p className="text-small text-default-500">{textMessage}</p>
                    <Divider />
                    <p className="text-xs text-default-500">
                        נכתב ב: &nbsp;
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-default-500">על ידי: {userName}</p>
                    {updatedAt !== createdAt && (
                        <p className="text-xs text-default-500">
                            עודכן ב:&nbsp;
                            {new Date(updatedAt).toLocaleDateString()}
                        </p>
                    )}

                </div>
            </CardHeader>
            <CardFooter>
            {canDelete && (
                        <Button
                            color="error"
                            className="text-end"
                            auto
                            ghost
                            onClick={() => {
                                console.log('delete comment')
                                deleteComment()
                            }}
                        >
                            מחק תגובה
                            <MdDelete className="text-xl text-red-500" />
                        </Button>
                    )}

            </CardFooter>
        </Card>
    )
}

export default SingleComment