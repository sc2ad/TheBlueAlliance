"use strict";

class googleApiHelper extends apiHelper {
  constructor(baseUrl) {
    super(baseUrl);

    //do the work of fetching now, the token is automatically cached
    this.getAuthToken();
  }

  getAuthToken() {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken(
      	{'interactive': true}, function(token) {resolve(token);}
      );
    });
  }

  async removeAuthToken() {
    const authToken = await this.getAuthToken();
    return new Promise((resolve, reject) => {
      chrome.identity.removeCachedAuthToken({"token": authToken}, function(token) {resolve(token);});
    });
  }


  async getAuthHeaders() {
    return {"Authorization": "Bearer " + await this.getAuthToken()};
  }
}
