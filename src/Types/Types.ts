export type BookType = {
    title?: string
    text?: string
    img?: string
}

export interface SignUpForm {
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    agreed?: number | string
}
export interface State {
    user: {
        fullName?: string
        email?: string
        books?: BookType[]
        err?: boolean
        msg?: string
    }
    isLoogedIn: boolean
    books: BookType[]
    searchBooks: BookType[]
    forms: {
        login: {
            email?: string
            password?: string
            fullName?: string
            confirmPassword?: string
        }
        signUp: SignUpForm
    }
}
export interface User {
    fullName?: string
    email?: string
    books?: BookType[]
    err?: boolean
    msg?: string
}

export interface Payload {
    user?: User
    isLoogedIn?: boolean
    books?: BookType[]
    searchBooks?: BookType[]
    inputHandler?: {
        form: 'login' | 'signUp'
        property: 'email' | 'password' | 'fullName' | 'confirmPassword'
        value: string
    }
}
export type Action = {
    type: 'login' | 'logout' | 'getbooks' | 'inputHandler' | 'autoLogin' | 'search'
    payload: Payload
}
export type ApiBook = {
    volumeInfo: {
        title: string
        description: string
        imageLinks: {
            thumbnail: string
        }
    }
}

export type Params = {
    q: string
    maxResults?: number
    startIndex?: number

}

export type Query = {
    [key:string]:string
}

export type BookQuery = {
    keyword: string
    intitle?: string
    inauther?: string
    inpublisher?: string
    subject?: string
    isbn?: string
    lccn?: string
    pclc?: string
}
export   interface ContactUsForm {
    fullName?:string,
    email?:string,
    message?:string,
    q?:string
}

export interface SlackEvent {
    client_msg_id: string,
    type: string,
    text: string,
    user: string,
    ts: string,
    team: string,
    blocks: [ { type: string, block_id: string, elements: [] } ],
    channel: string,
    event_ts: string,
    channel_type: string
  }
