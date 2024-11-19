//import client ID and Client secret with enviroment variables from My anime List if not using Jikan
// non image json files usableTopAnimeList.json and animeListById0-50k.json
class QueryService {
  baseURL = `https://api.jikan.moe/v4/`;

  // async getRandomAnime() {
  //   const query = `${this.baseURL}random/anime`;
  //   try {
  //     //console.log(query)
  //     const response = await fetch(query);
    
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
      
  //     return data;
  //   } catch (error) {

  //     console.error('Error fetching random anime:', error);
  //     throw error;
  //   }
  // }

  getFourCharacters() {
    
  }


  // async getAnimeScene(id) {
  //   const query = `${this.baseURL}anime/${id}/pictures`;
  //   try {
  //     const response = await fetch(query);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     return data;
  //     }
  //   catch(error) {
  //     console.error('Error fetching random anime:', error);
  //     throw error;
  //     }

  // }

  hasNonEnglishCharacters(str) {
    const nonEnglishRegex = /[^\x20-\x7E]/;
    return nonEnglishRegex.test(str);
  }
}

export default new QueryService;

