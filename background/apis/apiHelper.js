"use strict";

class apiHelper {

  /// baseUrl e.g. https://iq.bigtime.net/BigtimeData/api/v2/ or ""
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getDefaultHeaders() {
    return {};
  }

  async getAuthHeaders() {
    return {};
  }

  getDefaultParams() {
    return {};
  }

  addOnEveryRequest(promise) {
    //Optional Method, allows actions on every promise request
    return promise.then(function(response) {
                          if (response.ok) {
                            return response
                          } else {
                            var error = new Error(response.statusText)
                            error.response = response
                            throw error
                          }
                        })
                  .then(x => x.json()).then(x => {console.log(x); return x});
  }

  // e.g. get("/users/5026", {"username":"Ian", "responseType":"json"})
  get(relativeUrl="", params={}, headers={}, body={}, addDefaultHeaders=true, addDefaultParams=true) {
    return this.makeHttpRequest("GET", relativeUrl, params, headers, body, addDefaultHeaders, addDefaultParams);
  }

  post(relativeUrl="", params={}, headers={}, body={}, addDefaultHeaders=true, addDefaultParams=true) {
    return this.makeHttpRequest("POST", relativeUrl, params, headers, body, addDefaultHeaders, addDefaultParams);
  }

  put(relativeUrl="", params={}, headers={}, body={}, addDefaultHeaders=true, addDefaultParams=true) {
    return this.makeHttpRequest("PUT", relativeUrl, params, headers, body, addDefaultHeaders, addDefaultParams);
  }

  delete(relativeUrl="", params={}, headers={}, body={}, addDefaultHeaders=true, addDefaultParams=true) {
    return this.makeHttpRequest("DELETE", relativeUrl, params, headers, body, addDefaultHeaders, addDefaultParams);
  }

  paramsToString(params) {
    let paramsString = "";

    Object.keys(params).forEach(function(key) {
      paramsString += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    });

    //remove trailing '&'
    if (paramsString.length > 0) {
      paramsString = paramsString.substring(0, paramsString.length - 1);
    }

    return paramsString;
  }

  // requestMethod: "GET", "POST", "PUT", or "DELETE"
  // relativeUrl: e.g. "users/5026"
  // params: e.g. {"username":"Ian", "responseType":"json"}
  async makeHttpRequest(requestMethod, relativeUrl="", params={}, headers={}, body={}, addDefaultHeaders=true, addDefaultParams=true, addAuthHeaders=true) {
    let allHeaders = headers;
    let allParams = params;

    if (addAuthHeaders) {
      //concatenate objects
      allHeaders = Object.assign({}, allHeaders, await this.getAuthHeaders());
    }

    if (addDefaultHeaders) {
      //concatenate objects
      allHeaders = Object.assign({}, allHeaders, this.getDefaultHeaders());
    }

    if (addDefaultParams) {
      //concatenate objects
      Object.assign({}, params, this.getDefaultParams());
    }

    let options = {};
    if (requestMethod === "POST") {
      allHeaders = Object.assign({}, allHeaders, {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"});
      options.body = this.paramsToString(Object.assign({}, body, allParams));//WARNING this might not be the right thing to do with body.
    }
    else {
      if (Object.keys(params).length !== 0) { relativeUrl += "?" + this.paramsToString(params); }
    }

    if (requestMethod !== "POST" &&
        requestMethod !== "GET" &&
        requestMethod !== "HEAD") {
      if (body && Object.keys(body).length !== 0) {options.body = JSON.stringify(body);}
    }
    options.method = requestMethod;
    options.headers = allHeaders;

    let promise = fetch(this.baseUrl + this.formatRelativeUrl(relativeUrl),
                        options);

    return this.addOnEveryRequest(promise);
  }

  formatRelativeUrl(relativeUrl) {
    //Verify relativeUrl format: add "/" if needed and remove "/" if needed to get valid url
    if (relativeUrl.length > 0 && this.baseUrl.length > 0) {
      if (this.baseUrl[this.baseUrl.length - 1] === "/" && relativeUrl[0] === "/") {
        relativeUrl = relativeUrl.substring(1, relativeUrl.length);
      }
      else if (this.baseUrl[this.baseUrl.length - 1] !== "/" && relativeUrl[0] !== "/") {
        relativeUrl = "/" + relativeUrl;
      }
    }

    return relativeUrl;
  }
}
