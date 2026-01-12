import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';


export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(10)
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}