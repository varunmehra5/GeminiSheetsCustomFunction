/**
 * Custom function to classify text in a given range as SPAM or NOT SPAM.
 * @param {string} objective The objective of the content generation.
 * @param {string[][]} dataRange The range of data to be used as input for content generation.
 * @customfunction
 */
function GEMINI(objective, dataRange) {
  if (!objective || !dataRange) {
    return [["Invalid input. Please provide both an objective and a data range."]];
  }

  if (!Array.isArray(dataRange)) {
    dataRange = [[dataRange]]; // Convert single cell input to a 2D array
  }

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?";
  const apiKey = "YOUR_API_KEY0"; // Replace with your API key
  let results = [];

  dataRange.forEach((row) => {
    let rowData = row.map(cell => cell.toString()); // Ensure all cells are converted to strings
    let rowPrompt = createPrompt(objective, rowData);
    results.push(fetchAPIResponse(rowPrompt, url, apiKey));
  });

  return results;
}


function createPrompt(objective, rowData) {
  let prompt = `Objective: ${objective}\n\n`;
  rowData.forEach((cell, cellIdx) => {
    prompt += `Data ${cellIdx + 1}: ${cell}\n`;
  });
  prompt += '\n';
  return prompt;
}

function fetchAPIResponse(prompt, url, apiKey) {
    let fullUrl = `${url}key=${apiKey}`;
    let requestBody = { contents: [{ parts: [{ text: prompt }] }] };
    let options = { method: 'post', contentType: 'application/json', payload: JSON.stringify(requestBody), muteHttpExceptions: true };
    let response = UrlFetchApp.fetch(fullUrl, options);
    let responseCode = response.getResponseCode();
    let responseContent = response.getContentText();
  
    if (responseCode === 200) {
      let jsonResponse = JSON.parse(responseContent);
      if (jsonResponse && jsonResponse.candidates && jsonResponse.candidates.length > 0) {
        let candidate = jsonResponse.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts.map(part => part.text).join(' ');
        } else {
          console.log("[ERROR] No valid content parts found in the API response.");
          return "No valid content generated";
        }
      } else {
        console.log("[ERROR] No valid candidates found in the API response.");
        return "No valid content generated";
      }
    } else {
      console.log(`[ERROR] API call failed with status code: ${responseCode}`);
      return "API call failed";
    }s
  }
