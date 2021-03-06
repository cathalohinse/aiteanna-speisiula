"use strict";

const axios = require("axios");
const baseUrl = "http://localhost:3000";

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getCategories() {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getCategory(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createCategory(newCategory) {
    try {
      const response = await axios.post(this.baseUrl + "/api/categories", newCategory);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllCategories() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/categories");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneCategory(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/categories/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPois() {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoi(newPoi) {
    try {
      const response = await axios.post(this.baseUrl + "/api/pois", newPoi);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPois() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/pois");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOnePoi(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/pois/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }











  async getMessages() {
    try {
      const response = await axios.get(this.baseUrl + "/api/messages");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getMessage(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/messages/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createMessage(newMessage) {
    try {
      const response = await axios.post(this.baseUrl + "/api/messages", newMessage);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllMessages() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/messages");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneMessage(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/messages/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }













  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }

}

module.exports = PoiService;