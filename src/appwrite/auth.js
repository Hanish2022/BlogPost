import conf from "../conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService{ 
    client = new client();
    account;

    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

        
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //login v krwado
                return this.login({email,password})
            }
            else {
                return userAccount;;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    
    async getCurrentUser() {
        try {
          return await this.account.get();

        } catch (error) {
            throw error;
        }
        return null;
    }
    async logout() {
        try {
            return this.account.deleteSessions();

        } catch (error) {
            throw error;
        }
    }
}
const authService=new AuthService()
export default authService;
//authService.login(),.logout(),.createAccount()