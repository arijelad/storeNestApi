import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dto/user-auth.dto";

@Controller('auth')
export class AuthController {

  constructor(
    private authService : AuthService
  ) {
  }

  @Post('/signup')
  signUp(@Body() userAuthDto: UserAuthDto):Promise<void>{
    return this.authService.signUp(userAuthDto);
  }

  @Post('/signin')
  signIn(@Body() userAuthDto: UserAuthDto):Promise<string>{
    return this.authService.signIn(userAuthDto);
  }
}