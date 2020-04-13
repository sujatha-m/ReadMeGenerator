//import axios module to help with GITHUB API call
const axios = require("axios");

const BASE_URL = "https://api.github.com/users"; //standard github user path

//an async function implemented using arrow notation
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

//export github info extraction as a module
module.exports.getGitHubDetails = getGitHubDetails;
