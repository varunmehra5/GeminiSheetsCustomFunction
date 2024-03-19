/**
 * Custom function to classify text in a given range as SPAM or NOT SPAM.
 * @param {string} objective The objective of the content generation.
 * @param {string[][]} dataRange The range of data to be used as input for content generation.
 * @customfunction
 */
function GEMINI(objective, dataRange) {
  if (!objective || !dataRange) {
    console.log("Invalid input: Objective or dataRange is missing.");
    return [["Invalid input. Please provide both an objective and a data range."]];
  }

  if (!Array.isArray(dataRange)) {
    console.log("Converting single cell input to a 2D array.");
    dataRange = [[dataRange]];
  }

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  const apiKey = "YOUR_GOOGLE_API_KEY_HERE";
  let results = [];

  console.log("Starting to process the data range.");
  if (dataRange[0].length === 1) {
    // Process each cell in a single-column range individually
    for (let i = 0; i < dataRange.length; i++) {
      let cellData = dataRange[i][0].toString();
      let cellPrompt = createPrompt(objective, cellData);
      let apiResult = fetchAPIResponse(cellPrompt, url, apiKey);
      results.push([apiResult]);  // Store each response in its own row
    }
  } else {
    // Process a multi-column range as a whole
    let combinedData = combineData(dataRange);
    let combinedPrompt = createPrompt(objective, combinedData);
    let apiResult = fetchAPIResponse(combinedPrompt, url, apiKey);
    // Here, you could split the response if needed, but currently, it's placed in a single cell
    results.push([apiResult]);
  }

  console.log("Finished processing the data range.");
  return results;
}

function combineData(dataRange) {
  // Combine all data into a single string or a structured format that the API can understand
  return dataRange.map(row => row.join(", ")).join("; ");
}

function createPrompt(objective, rowData) {
  return `Objective: ${objective}\nData: ${rowData}\n`.trim();
}

function fetchAPIResponse(prompt, url, apiKey) {
  let fullUrl = `${url}?key=${apiKey}`;
  console.log(`Requesting URL: ${fullUrl}`);
  let requestBody = { contents: [{ parts: [{ text: prompt }] }] };
  let options = { method: 'post', contentType: 'application/json', payload: JSON.stringify(requestBody), muteHttpExceptions: true };

  let response = UrlFetchApp.fetch(fullUrl, options);
  let responseCode = response.getResponseCode();
  let responseContent = response.getContentText();

  console.log(`Response Text: ${responseContent}`);
  console.log(`Response Code: ${responseCode}`);
  if (responseCode === 200) {
    let jsonResponse = JSON.parse(responseContent);
    return jsonResponse && jsonResponse.candidates && jsonResponse.candidates.length > 0 ?
           jsonResponse.candidates[0].content.parts.map(part => part.text).join(' ') :
           "No valid content generated";
  } else {
    console.error(`API call failed with status code: ${responseCode}`);
    return "API call failed";
  }
}
