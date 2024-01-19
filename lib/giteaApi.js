const superagent = require('superagent');

class GiteaApi {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async createRepo(repoDetails) {
    try {
      const response = await superagent.post(`${this.baseUrl}/user/repos`)
                                       .set('Authorization', `token ${this.token}`)
                                       .set('Content-Type', 'application/json')
                                       .send(repoDetails);
      return response.body;
    } catch (error) {
      console.error('Error creating repository:', error.message);
      throw error;
    }
  }
}

module.exports = GiteaApi;