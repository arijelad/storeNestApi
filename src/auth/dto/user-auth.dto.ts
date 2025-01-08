import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserAuthDto {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {message:
        'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.',}
  )
  password: string;
}