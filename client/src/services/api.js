import HTTP from "./HTTP";
import UserService from "./user";

class Api {
   
    rootURL = "http://localhost:3001/api";
     
    constructURL(path) {
      return `${this.rootURL}/${path}`;
    } 
  
    async favorite(id) {
      const URL = this.constructURL("favorites/favorite")
      const body = {
        userId: UserService.getID(),
        recipeId: id
      }
      return await HTTP.post(URL, body)
    }
    
  }
  
  export default new Api();