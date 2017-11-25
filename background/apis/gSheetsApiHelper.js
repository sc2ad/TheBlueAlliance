const G_SHEETS_API_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

class gSheetsApiHelper extends googleApiHelper {
  constructor() {
    super(G_SHEETS_API_BASE_URL);
  }

  async fetchSheet(spreadsheetId) {
    let response = await this.get(encodeURIComponent(spreadsheetId) + "/values/A1%3AAZ200", {
      dateTimeRenderOption: "FORMATTED_STRING",
      valueRenderOption: "FORMULA",
      majorDimension: "ROWS"
    });

    return response;
  }

  async putSheet(spreadsheetId, cellRange, body) {
    let response = await this.put(encodeURIComponent(spreadsheetId) + "/values/" + encodeURIComponent(cellRange), {
      includeValuesInResponse: false,
      responseDateTimeRenderOption: "FORMATTED_STRING",
      responseValueRenderOption: "FORMULA",
      valueInputOption: "USER_ENTERED"
    }, {}, body);

    return response;
  }

  //See https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values
  //majorDimension is either "ROWS" or "COLUMNS"
  //Values should be an array of arrays
  makeStandardBody(majorDimension, values) {
    return {
      "majorDimension": majorDimension,
      "values": values
    };
  }

}
