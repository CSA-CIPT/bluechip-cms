export class LoginRequest {
    constructor(
        public username: string,
        public password: string
    ) {}
};

export class TokenResponse {
    constructor(
        public token: string,
        public status: string,
        public expiredAt: number
    ) {}
}

export class LogoutRequest {
   constructor(
       public username: string,
       public token: string
   ) {}
}

export class ValidateToken {
    constructor(
        public username: string,
        public token: string
    ) {}
}