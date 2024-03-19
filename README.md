
# GEMINI Text Classifier

The GEMINI function is a custom Google Apps Script function designed to classify text data as SPAM or NOT SPAM. It leverages the Gemini model from thse generative language API to analyze and classify the text based on the provided objective.

## Featuress

- **Custom Functionality:** Designed to be used as a custom function within Google Sheets, enabling on-the-fly text classification.
- **Easy to Use:** Simply input your objective and the data range, and the function will classify the text accordingly.
- **Dynamic Input:** Accepts a range of data, making it versatile for different use cases.

## Setup

1. **API Key:** Ensure you have an API key from the generative language API service. Replace `YOUR_API_KEY` in the script with your actual API key.

2. **Script Installation:** Copy the script into the script editor in Google Sheets where you want to use the GEMINI function.

## Usage

```javascript
=GEMINI("objective", range)
```

- `objective`: The objective of the content generation. For example, "classify text as SPAM or NOT SPAM".
- `range`: The range of cells containing text data to be classified.

## Example

If you have a column of text in A1:A10 and you want to classify each cell's content as SPAM or NOT SPAM, you can use:

```javascript
=GEMINI("classify text as SPAM or NOT SPAM", A1:A10)
```

Analyse a range of data as a business analyst.

```javascript
=GEMINI("Analyse as a business analyst. Here's the data. Generate a 100 word summary.",A1:O5)
```

Generate Product Descriptions.

```javascript
=GEMINI("Generate 50 word product description optimised for sales and SEO, Here's the Product Title:",A2)
```

## Function Description

### `GEMINI(objective, dataRange)`

This is the main function that initiates the text classification process. It validates the inputs, formats the data, and communicates with the generative language API to get the classification results.

### `createPrompt(objective, rowData)`

Generates a prompt string used for the API call, based on the objective and the data provided.

### `fetchAPIResponse(prompt, url, apiKey)`

Makes a POST request to the generative language API with the generated prompt and handles the API response.

## Contributing

The script has issues when dealing with a single column range


## Contributing

Contributions are welcome! If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request.
