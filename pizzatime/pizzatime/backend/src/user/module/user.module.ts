import { TypeOrmModule} from '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
  
    TypeOrmModule.forFeature([User]),
 
  JwtModule.register({
    secret:'secret',
    signOptions:{expiresIn: '1d'}                
}) ],
  controllers: [UserController],
  providers: [UserService],
  

})

export class UserModule {}
