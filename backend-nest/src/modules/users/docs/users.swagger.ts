import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {applyDecorators} from "@nestjs/common";
import {UserResponseDto} from "../dto/user-response.dto";

export const ApiUsersTag = () => ApiTags('users');

export const ApiCreateUserDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Criar um novo usuário',
        description: 'Cria um novo usuário como nome, email e senha.'
    }),
    ApiCreatedResponse({
        description: 'Usuário criado com sucesso.',
        type: UserResponseDto
    }),
    ApiBadRequestResponse({
        description: 'Requisição inválida, body inválido.',
    }),
    ApiConflictResponse({
        description: 'Conflito ao criar usuário, email já existe.',
    })
);

export const ApiGetAllUsersDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Obter todos os usuários',
        description: 'Recupera uma lista de todos os usuários registrados no sistema.'
    }),
    ApiOkResponse({
        description: 'Lista de usuários recuperada com sucesso.',
        type: [UserResponseDto]
    })
);

export const ApiGetUserByIdDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Obter usuário por ID',
        description: 'Recupera os detalhes de um usuário específico usando seu ID.'
    }),
    ApiOkResponse({
        description: 'Usuário recuperado com sucesso.',
        type: UserResponseDto
    }),
    ApiBadRequestResponse({
        description: 'Requisição inválida, ID inválido.',
    })
);

export const ApiUpdateUserDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Atualizar usuário pelo ID informado',
        description: 'Atualiza os detalhes de um usuário específico usando seu ID.'
    }),
    ApiOkResponse({
        description: 'Usuário atualizado com sucesso.',
        type: UserResponseDto
    }),
    ApiBadRequestResponse({
        description: 'Requisição inválida, ID ou body inválido.',
    })
);