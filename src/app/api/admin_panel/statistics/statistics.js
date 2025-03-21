/*
 * Retrieves various statistics from the database.
 * 
 * This function collects several statistics related to users, trails, comments, articles, and tours,
 * as well as the latest login and registration dates. Additionally, it calculates counts of user 
 * registrations, logins, and comments within specified date ranges (last day, last week, last month).
 * 
 * @param {MongoClient.db} db - The MongoDB database connection object.
 * @returns {Object} An object containing various statistics.
 * @example
 * const stats = await getStatistics(db);
 * console.log(stats.numOfUsers); // Outputs the total number of users
 */
const getStatistics = async (db) => {
    const numOfUsers = await db.collection("Users").countDocuments();
    const numOfUsersFromFB = await db.collection("Users").countDocuments({ fromFacebook: true });
    const numOfAdmins = await db.collection("Users").countDocuments({ role: "admin" });
    const numOfEditors = await db.collection("Users").countDocuments({ role: "editor" });
    const numOfTrails = await db.collection("Trails").countDocuments({ isArchived: false });
    const numOfComments = await db.collection("Comments").countDocuments();
    const numOfArticles = await db.collection("Articles").countDocuments({ isArchived: false });
    const numOfTours = await db.collection("Tours").countDocuments({ isArchived: false });
    const latestLoginDate = await getLatestDate(db, "Users", "LastLogin");
    const latestRegisterDate = await getLatestDate(db, "Users", "RegisterDate");
    const dateRangeCounts = await getDateRangeCounts(db);

    const statistics = {
        numOfUsers: numOfUsers,
        numOfUsersFromFB: numOfUsersFromFB,
        numOfAdmins: numOfAdmins,
        numOfEditors: numOfEditors,
        numOfTrails: numOfTrails,
        numOfComments: numOfComments,
        numOfArticles: numOfArticles,
        numOfTours: numOfTours,
        latestLoginDate: latestLoginDate,
        latestRegisterDate: latestRegisterDate,
        ...dateRangeCounts
    };

    return statistics;
};


// Purpose: Retrieve the latest date for a given field
// Parameters:
// - db (MongoClient.db): The MongoDB database connection object.
// - collectionName (String): The name of the collection to query.
// - fieldName (String): The name of the field containing dates to find the latest from.
// Returns:
// - latestDate (Date or null): The latest date value from the specified field, or null if no documents are found.
async function getLatestDate(db, collectionName, fieldName) {
    const aggregationPipeline = [
        { $match: {} }, // Match all documents
        { $sort: { [fieldName]: -1 } }, // Sort by the specified field in descending order
        { $limit: 1 }, // Limit to one document (the latest date)
        { $project: { _id: 0, [fieldName]: 1 } } // Project only the specified field
    ];

    const result = await db.collection(collectionName).aggregate(aggregationPipeline).toArray();
    return result.length > 0 ? result[0][fieldName] : null;
}


// Purpose: Calculate counts of user registrations and logins within specified date ranges (`lastDay`, `lastWeek`, `lastMonth`).
// Parameters:
// - db (MongoClient.db): The MongoDB database connection object.
// Returns:
// - counts (Object): An object containing counts of user registrations and logins within each date range.
async function getDateRangeCounts(db) {
    const today = new Date();

    // Calculate start and end dates for last day, week, and month
    const dateRanges = [
        { label: 'lastDay', start: new Date(today.setDate(today.getDate() - 1)), end: new Date() },
        { label: 'lastWeek', start: new Date(today.setDate(today.getDate() - 6)), end: new Date() },
        { label: 'lastMonth', start: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()), end: new Date() }
    ];

    // Get counts for each date range
    const counts = {};
    for (const range of dateRanges) {
        counts[`${range.label}RegisterCount`] = await getUsersCountByDateRange(db, 'Users', 'RegisterDate', range.start.toISOString(), range.end.toISOString());
        counts[`${range.label}LoginCount`] = await getUsersCountByDateRange(db, 'Users', 'LastLogin', range.start.toISOString(), range.end.toISOString());
        counts[`${range.label}CommentsCount`] = await getUsersCountByDateRange(db, 'Comments', 'createdAt', range.start.toISOString(), range.end.toISOString());
    }

    return counts;
}


// Purpose: Retrieve the count of documents in a specific MongoDB collection within a specified date range.
// Parameters:
// - db (MongoClient.db): The MongoDB database connection object.
// - collectionName (String): The name of the collection to query.
// - fieldName (String): The name of the date field in the collection to filter on.
// - startDate (String): The start date (ISO format) of the date range.
// - endDate (String): The end date (ISO format) of the date range.
// Returns:
// - count (Number): The count of documents matching the date range criteria.
async function getUsersCountByDateRange(db, collectionName, fieldName, startDate, endDate) {
    const aggregationPipeline = [
        { $match: {
            [fieldName]: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }},
        { $group: {
            _id: null,
            count: { $sum: 1 }
        }}
    ];

    const result = await db.collection(collectionName).aggregate(aggregationPipeline).toArray();
    return result.length > 0 ? result[0].count : 0;
}
