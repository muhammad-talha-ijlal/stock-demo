// Web Worker script for fetching and processing stock data

let updating = false;
let updateInterval;

// Listen for messages from the main thread
onmessage = function(event) {
    if (event.data.startUpdates) {
        // Start real-time updates
        updating = true;
        startUpdating(event.data.symbol);
    } else if (event.data.stopUpdates) {
        // Stop real-time updates
        stopUpdating();
    }
};

function startUpdating(symbol) {
    // Fetch and process data at regular intervals
    updateInterval = setInterval(async () => {
        if (updating) {
            try {
                const data = await fetchDataFromAlphaVantage(symbol);

                // Check for rate limit error
                if (data.hasOwnProperty('Information') && data['Information'].includes('rate limit')) {
                    postMessage({ error: data['Information'] });
                } else {
                    // Process the data (you can customize this based on your needs)
                    const processedData = processStockData(data);

                    // Send the processed data, timestamp, and no errors back to the main thread
                    postMessage({ price: processedData, timestamp: new Date().toLocaleString() });
                }
            } catch (error) {
                console.error("Error fetching stock data:", error);
                postMessage({ error: "Failed to fetch stock data" });
            }
        }
    }, 5000); // Fetch every 5 seconds
}

function stopUpdating() {
    updating = false;

    // Clear the update interval
    clearInterval(updateInterval);
}

// Fetch real-time stock data from Alpha Vantage API
async function fetchDataFromAlphaVantage(symbol) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
}

// Process stock data (customize based on your needs)
function processStockData(data) {
    return `$${data['Global Quote']['05. price']}`;
}
