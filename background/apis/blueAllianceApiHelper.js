"use strict";

const BLUE_ALLIANCE_API_BASE_URL = "https://www.thebluealliance.com/api/v3";

class blueAllianceApiHelper extends apiHelper {
  constructor() {
    super(BLUE_ALLIANCE_API_BASE_URL);
  }

  async getAuthHeaders() {
    return {"X-TBA-Auth-Key": "CocQBM3Tl8qLGM3LXUiZQpitYXS9zemBHIDMnfieDOAwCKSbZSYvAhy1EvB5Y3PD"};
  }
}
