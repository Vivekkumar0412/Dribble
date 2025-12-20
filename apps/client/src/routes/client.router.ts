export default class Router {
    static readonly BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL!
    static readonly API_URL: string = this.BACKEND_URL + '/api'
    static readonly SIGNIN_URL: string = this.API_URL + '/auth/signin'
    static readonly GEN_NEW_PROMPT: string = this.API_URL + '/generate/new'
    static readonly GEN_CONTINUE_PROMPT: string = this.API_URL + '/generate/continue'
}