package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.Engine) {
	apiV1 := r.Group("/api/v1")
	{
		r.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "OK",
			})
		})

		UsersRoutes(apiV1)
	}
}
