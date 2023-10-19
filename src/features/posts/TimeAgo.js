import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({timestamp}) => {

    let timeAgo= "";
    if(timestamp) {
        const date = parseISO(timestamp)
        timeAgo = formatDistanceToNow(date);
    }
    return(
        <span title={timeAgo }>
            <i>{timeAgo } ago </i>
        </span>
    )
}

export default TimeAgo;