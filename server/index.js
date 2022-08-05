const needle = require('needle');
const config = require('dotenv').config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
// The "?" is a query in the URL after that we add tweet.field to find the public metrics for instance how many retweets or comments then we add an expansion to the query to find the authors ID who posted the tweet //
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.field=public_metrics&expansions=author_id';


const rules = [{ value: 'giveaway' }]

// Get Stream Rules //
async function getRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        })
}

// Set Rules //


// Delete Rules //