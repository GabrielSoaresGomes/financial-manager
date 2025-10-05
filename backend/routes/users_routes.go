package routes

import (
	"financial-manager-api/configs/db"
	"financial-manager-api/controllers"
	"financial-manager-api/repositories"
	"financial-manager-api/usecases"

	"github.com/gin-gonic/gin"
)

func UsersRoutes(rg *gin.RouterGroup) {
	dbConnection, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

	userRepository := repositories.NewUserRepository(dbConnection)
	usersUsecase := usecases.NewUsersUsecase(userRepository)
	userController := controllers.NewUserController(usersUsecase)

	usersGroup := rg.Group("/users")
	{
		usersGroup.GET("/", userController.GetUsers)
	}
}
