
# Real-time Dashboard with Web Workers

## Project Description:

This project focuses on developing a real-time dashboard that fetches live data from an external API and utilizes Web Workers for efficient background processing. The application aggregates real-time data, performs calculations, and enables users to dynamically filter results.

## Instructions to Run Locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stock-demo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd stock-demo
   ```

3. Start a web server (If you have python installed, use `python -m http.server` to start a web server and open `localhost:8000` )


## Summary of Findings:

### Performance Improvements:

The implementation of Web Workers significantly improved the application's responsiveness. The background processing of data using Web Workers allowed the main thread to remain unblocked, resulting in smoother user interactions. Real-time updates were achieved without causing UI blocking, enhancing the overall user experience.

### Challenges Faced and Solutions:

1. **Cross-Origin Issues:**
   - **Challenge:** Encountered cross-origin restrictions when fetching data from external APIs.
   - **Solution:** Addressed this issue by using a server-side proxy to handle API requests or ensuring proper CORS headers on the API.

2. **Worker Communication:**
   - **Challenge:** Communicating effectively between the main thread and Web Workers.
   - **Solution:** Implemented a structured messaging system to exchange data efficiently, ensuring seamless communication.
