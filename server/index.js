const needle = require('needle');
const config = require('dotenv').config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
// The "?" is a query in the URL after that we add tweet.field to find the public metrics for instance how many retweets or comments then we add an expansion to the query to find the authors ID who posted the tweet //
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id';


const rules = [{ value: 'hamburger' }]

// Get Stream Rules //
async function getRules() {
    // A client is any computer hardware or software device that requests access to a service provided by a server. //
    // HTTP client is a client that is able to send a request to and get a response from the server in HTTP format. REST client is a client that is designed to use a service from a server and this service is RESTful. //
    // Needle is a streamable HTTP client for making quick HTTP requests in Node. js application to consume RESTful web services, uploading and downloading streams of data, etc. It supports the following features out-of-the-box: Both HTTP and HTTPS requests. All Node's native TLS options. //
    // Streams are one of the fundamental concepts that power Node.js applications. They are data-handling method and are used to read or write input into output sequentially. //
    // A GET request, in simple terms, is a way for you to grab data from a data source with the help of the internet.  //
    const response = await needle('get', rulesURL, {
        // HTTP Headers are an important part of the API request and response as they represent the meta-data associated with the API request and response. //
        headers: {
            // API tokens allow a user to authenticate with cloud apps and bypass two-step verification and SSO, and retrieve data from the instance through REST APIs. Token controls allow admins to view and revoke the use of API tokens by their managed accounts. //
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

// JavaScript's try-catch-finally statement works very similarly to the try-catch-finally encountered in C++ and Java. First, the try block is executed until and unless the code in it throws an exception (whether it is an explicit throw statement, the code has an uncaught native exception, or if the code calls a function that uses throw).

// If the code doesn't throw an exception, then the whole try block is executed. If the code threw an exception inside the try block, then the catch block is executed. Last of all, the finally block is always executed, subsequent to the other blocks but prior to any subsequent code located outside of the try-catch-finally blocks. The finally block will just about always execute, no matter what kind of throwing, catching, or returning one might be trying to do inside the try or catch blocks.

// Note that you can omit the catch or finally block, but one of them must be present. //

// An async function is a function declared with the async keyword, and the await keyword is permitted within it. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains. //

// Async functions can contain zero or more await expressions. Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. Use of async and await enables the use of ordinary try / catch blocks around asynchronous code. //

// An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. //
(async () => {
    let currentRules

    try {
        currentRules = await getRules()
    } catch (error) {
        console.log(error)
        // The process object provides information about, and control over, the current Node.js process. //
        // The 'exit' event is emitted when the Node.js process is about to exit as a result of either://
        // The process.exit() method being called explicitly;//
        // The Node.js event loop no longer having any additional work to perform.//
        process.exit(1)
    }
})()

// Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server. //
// io.on()

// Set Stream Rules //

async function setRules() {
    const data = {
        add: rules
    }
    // A client is any computer hardware or software device that requests access to a service provided by a server. //
    // HTTP client is a client that is able to send a request to and get a response from the server in HTTP format. REST client is a client that is designed to use a service from a server and this service is RESTful. //
    // Needle is a streamable HTTP client for making quick HTTP requests in Node. js application to consume RESTful web services, uploading and downloading streams of data, etc. It supports the following features out-of-the-box: Both HTTP and HTTPS requests. All Node's native TLS options. //
    // Streams are one of the fundamental concepts that power Node.js applications. They are data-handling method and are used to read or write input into output sequentially. //
    // GET retrieves a representation of the specified resource. POST is for writing data, to be processed to the identified resource.  //
    const response = await needle('post', rulesURL, data, {
        // HTTP Headers are an important part of the API request and response as they represent the meta-data associated with the API request and response. //
        headers: {
            'content-type': 'application/json',
            // API tokens allow a user to authenticate with cloud apps and bypass two-step verification and SSO, and retrieve data from the instance through REST APIs. Token controls allow admins to view and revoke the use of API tokens by their managed accounts. //
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

(async () => {
    let currentRules

    try {
        await setRules()
        currentRules = await getRules()
    } catch (error) {
        console.log(error)
        // The process object provides information about, and control over, the current Node.js process. //
        // The 'exit' event is emitted when the Node.js process is about to exit as a result of either://
        // The process.exit() method being called explicitly;//
        // The Node.js event loop no longer having any additional work to perform.//
        process.exit(1)
    }
})()

// Delete Stream Rules //

async function deleteRules(rules) {
    if (!Array.isArray(rules.data)) {
        return null
    }

    const ids = rules.data.map((rule) => rule.id)

    const data = {
        delete: {
            ids: ids
        }
    }
    // A client is any computer hardware or software device that requests access to a service provided by a server. //
    // HTTP client is a client that is able to send a request to and get a response from the server in HTTP format. REST client is a client that is designed to use a service from a server and this service is RESTful. //
    // Needle is a streamable HTTP client for making quick HTTP requests in Node. js application to consume RESTful web services, uploading and downloading streams of data, etc. It supports the following features out-of-the-box: Both HTTP and HTTPS requests. All Node's native TLS options. //
    // Streams are one of the fundamental concepts that power Node.js applications. They are data-handling method and are used to read or write input into output sequentially. //
    // GET retrieves a representation of the specified resource. POST is for writing data, to be processed to the identified resource.  //
    const response = await needle('post', rulesURL, data, {
        // HTTP Headers are an important part of the API request and response as they represent the meta-data associated with the API request and response. //
        headers: {
            'content-type': 'application/json',
            // API tokens allow a user to authenticate with cloud apps and bypass two-step verification and SSO, and retrieve data from the instance through REST APIs. Token controls allow admins to view and revoke the use of API tokens by their managed accounts. //
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body
}

function streamTweets() {
    const stream = needle.get(streamURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })

    // "On" Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times. //
    // A stream is an abstract interface for working with streaming data in Node.js. The node:stream module provides an API for implementing the stream interface. //
    // Streams can be readable, writable, or both. All streams are instances of EventEmitter. //
    stream.on('data', (data) => {
        try {
            const json = JSON.parse(data)
            console.log(json)
        } catch (error) {

        }
    })
}


(async () => {
    let currentRules

    try {
        // Get all stream rules //
        currentRules = await getRules()
        // Delete all stream rules //
        await deleteRules(currentRules)
        // Set rules based on array above//
        await setRules()
    } catch (error) {
        console.log(error)
        // The process object provides information about, and control over, the current Node.js process. //
        // The 'exit' event is emitted when the Node.js process is about to exit as a result of either://
        // The process.exit() method being called explicitly;//
        // The Node.js event loop no longer having any additional work to perform.//
        process.exit(1)
    }

    streamTweets()
})()
