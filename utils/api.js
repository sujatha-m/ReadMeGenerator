const axios = require('axios');

const BASE_URL = 'https://api.github.com/users';

const getGitHubDetails = async (username) => {
//async function getGitHubDetails(username) {
    try {
        const res = await axios.get(`${BASE_URL}/${username}`);

        const ghdata = res.data;

        //console.log(`GET: Here's the github info`, ghdata);
        return ghdata;
    } catch (e) {
        //console.error(e);
    }
};

module.exports.getGitHubDetails = getGitHubDetails;

