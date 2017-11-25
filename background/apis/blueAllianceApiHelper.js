"use strict";

const BLUE_ALLIANCE_API_BASE_URL = "https://www.thebluealliance.com/api/v3";

class blueAllianceApiHelper extends apiHelper {
  constructor() {
    super(BLUE_ALLIANCE_API_BASE_URL);
  }

  async getAuthHeaders() {
    return {"X-TBA-Auth-Key": "ZLQKIqhamDBNuDM9UuSJ6ff8xbD9qOyO7q6P494BEmkgQaGTP3w6zMJLV8Wphv0x"};
  }
}
