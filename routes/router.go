package routes

import (
	"github.com/auth0/go-jwt-middleware"
	"github.com/codegangsta/negroni"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options {
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte("My Secret"), nil
		},
		SigningMethod: jwt.SigningMethodHS512,
	})
	router := mux.NewRouter().StrictSlash(true)


	router.PathPrefix("/_ah").Handler(negroni.New(
		negroni.Wrap(GetSystemRoutes(mux.NewRouter().StrictSlash(true))),
	))

	router.PathPrefix("/auth").Handler(negroni.New(
		negroni.Wrap(GetAuthenticationRoutes(mux.NewRouter().StrictSlash(true))),
	))
	router.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(GetAdminRoutes(mux.NewRouter().StrictSlash(true))),
	))
	router.PathPrefix("/student").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(GetStudentRoutes(mux.NewRouter().StrictSlash(true))),
	))
	router.PathPrefix("/organization").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(GetOrganizationRoutes()),
	))

	return router
}
