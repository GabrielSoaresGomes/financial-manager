import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
import {ApiCreateUserDocs, ApiGetAllUsersDocs, ApiGetUserByIdDocs, ApiUsersTag} from "../docs/users.swagger";

@Controller("users")
@ApiUsersTag()
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    @ApiCreateUserDocs()
    createUser(
        @Body() body: CreateUserDto
    ): Promise<User> {
        return this.usersService.createUser(body);
    }

    @Get()
    @ApiGetAllUsersDocs()
    getAllUsers(): string[] {
        return ['Teste.com'];
    }

    @Get(':id')
    @ApiGetUserByIdDocs()
    getUserById(
        @Param() id: string
    ): string[] {
        return ['Teste.com'];
    }
}