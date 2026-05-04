import { Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../services/users.service";
import {ApiCreateUserDocs, ApiGetAllUsersDocs, ApiGetUserByIdDocs, ApiUpdateUserDocs, ApiUsersTag} from "../docs/users.swagger";
import {UpdateUserDto} from "../dto/update-user.dto";
import {UserResponseDto} from "../dto/user-response.dto";
import {UserPresenter} from "../presenters/user.presenter";

@Controller('users')
@ApiUsersTag()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreateUserDocs()
    async createUser(@Body() body: CreateUserDto): Promise<UserResponseDto> {
        const result = await this.usersService.createUser(body);
        return UserPresenter.toHTTP(result);
    }

    @Get()
    @ApiGetAllUsersDocs()
    async getAllUsers(): Promise<UserResponseDto[]> {
        const result = await this.usersService.getAllUsers();
        return UserPresenter.toHTTPList(result);
    }

    @Get(':id')
    @ApiGetUserByIdDocs()
    async getUserById(@Param() id: number): Promise<UserResponseDto> {
        const result = await this.usersService.getUserById(id);
        return UserPresenter.toHTTP(result);
    }

    @Put(':id')
    @ApiUpdateUserDocs()
    async updateUser(
        @Param() id: number,
        @Body() body: UpdateUserDto,
    ): Promise<UserResponseDto> {
        const result = await this.usersService.updateUser({ id, ...body });
        return UserPresenter.toHTTP(result);
    }

    @Delete(':id')
    async deleteUserById(
        @Param() id: number,
    ): Promise<void> {
        return await this.usersService.deleteUserById(id);
    }
}