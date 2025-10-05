package db

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "postgres"
)

func ConnectDB() (*sql.DB, error) {
	psqlInfo := fmt.Sprintf(`
		host=%s port=%d user=%s password=%s dbname=%s sslmode=disable
	`, host, port, user, password, dbname)

	connection, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = connection.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Printf("Conexão com o banco de dados: %s estabelecida com sucesso!\n", dbname)

	return connection, nil
}
