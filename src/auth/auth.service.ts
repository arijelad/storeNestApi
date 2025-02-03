import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';
import { UserAuthDto } from "./dto/user-auth.dto";

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){

  }

  async createUser(userAuthDto: UserAuthDto):Promise<void>{
    const{username, password} = userAuthDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword
    });

    try{
      await this.usersRepository.save(user);
    }catch(error){
      if(error.code === '23505'){
        throw new ConflictException('Username already exist')
      }else{
        throw new InternalServerErrorException();
      }

    }
  }
  async signIn(userAuthDto: UserAuthDto):Promise<string>{
    const{username,password} = userAuthDto;
    const user = await this.usersRepository.findOne({where:{username}});

    if(user &&(await bcrypt.compare(password, user.password))){
      return "success";
    }else{
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async signUp(userAuthDto: UserAuthDto):Promise<void>{
    return this.createUser(userAuthDto);
  }
}