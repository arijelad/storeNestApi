import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserAuthDto } from "./dto/user-auth.dto";
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(userAuthDto: UserAuthDto): Promise<void>;
    signIn(userAuthDto: UserAuthDto): Promise<string>;
    signUp(userAuthDto: UserAuthDto): Promise<void>;
}
