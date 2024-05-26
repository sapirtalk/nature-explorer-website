



// Function to fetch data from the API endpoint to be used in Pages or Components that are Client-Side Rendered
export async function fetchData(path) {
    // Determine the protocol (http or https)
    const protocol = window.location.protocol.replace(':', '');
    
    // Construct the base URL
    const baseUrl = `${protocol}//${window.location.host}`;

    console.log(`${baseUrl}${path}`);
    
    // Fetch data from the API endpoint
    const res = await fetch(`${path}`);
    return res.json();
}



export function formatTime (time) {

    const date = new Date(time);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const formatted = `${formattedDate} ${formattedTime}`;

    console.log("formatted time: ", formatted);
    
    return formatted;
}