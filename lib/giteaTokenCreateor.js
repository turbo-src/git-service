const superagent = require('superagent');

class GiteaTokenCreator {
  constructor(baseUrl, username, password) {
    this.baseUrl = baseUrl;
    this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
  }

  async createAccessToken(username, tokenDetails) {
    try {
      const response = await superagent.post(`${this.baseUrl}/users/${username}/tokens`)
                                       .set('Authorization', this.authHeader)
                                       .set('Content-Type', 'application/json')
                                       .send(tokenDetails);
      return response.body;
    } catch (error) {
      console.error('Error creating access token:', error.message);
      throw error;
    }
  }
}

module.exports = GiteaTokenCreator;