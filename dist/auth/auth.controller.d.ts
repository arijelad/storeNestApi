import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dto/user-auth.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(userAuthDto: UserAuthDto): Promise<void>;
    signIn(userAuthDto: UserAuthDto): Promise<string>;
}
