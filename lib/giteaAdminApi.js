const superagent = require('superagent');

class GiteaAdminApi {
  constructor(baseUrl, adminToken) {
    this.baseUrl = baseUrl;
    this.adminToken = adminToken;
  }

  async createUser(userData) {
    try {
      const response = await superagent.post(`${this.baseUrl}/admin/users`)
                                       .set('Authorization', `token ${this.adminToken}`)
                                       .set('Content-Type', 'application/json')
                                       .send(userData);
      return response.body;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }
}

module.exports = GiteaAdminApi;