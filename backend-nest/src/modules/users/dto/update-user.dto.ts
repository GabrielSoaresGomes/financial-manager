import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';


export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @MinLength(10)
    password: string;
}