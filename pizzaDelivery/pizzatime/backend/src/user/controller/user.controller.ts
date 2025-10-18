import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Delete,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { User } from '../user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
// user
  @Post('register')
  async register(
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('tele') tele: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log(nom, prenom, tele, email, password);

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userService.create({
      nom,
      prenom,
      tele,
      email,
      password: hashedPassword,
    });
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ where: { email } });
    console.log({user});
    
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({ user_id: user.user_id });

    response.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'success', statusCode: 200,data:user };
  }
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findall();
  }

  @Get(':user_id')
  async findOne(@Param('user_id') user_id: number): Promise<User> {
    console.log(typeof(user_id));
    
    const user = await this.userService.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }
  //update user
  @Put(':user_id')
  async update(
    @Param('user_id') user_id: number,
    @Body() user: User,
  ): Promise<User> {
    console.log({user});
    
    return this.userService.update(user_id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') user_id: number): Promise<void> {
    //handle the error if user not found
    const user: any = await this.userService.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userService.delete(user);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    try {
      response.clearCookie('jwt');
      return { message: 'success' };
    } catch (e) {
      return { message: 'logout error:', e };
    }
  }
  //ajouter resto 
  // @Post('addresto')
  // async addproduit(
  //   @Body('resto') resto:string,
  //   @Body('card') card: string,
  // ) {
  //   return this.userService.ajouter({
  //     resto,
  //     card
  //   });
  // }

  // @Delete('resto/:id')
  // async deleteResto(@Param('id') id: number): Promise<void> {
  //   //handle the error if resto not found
  //   const resto: any = await this.userService.findOneResto({ where: { id } });
  //   if (!resto) {
  //     throw new Error('resto not found');
  //   }
  //   return this.userService.deleteResto(resto);
  // }
  // @Get('resto')
  // async findAllResto(): Promise<Product[]> {
  //   return await this.userService.findallresto();
  // }
}
 