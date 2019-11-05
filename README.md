# Efficient-Backend-service-for-continuous-User-Pings
Responsive and efficient Back-end Service for flight searching.

architecture
2 endpoints that would be for search_api and ping_api

endpoint: post.. http://localhost:5000/search_api

sample input for search_api endpoint

{
	"from":"del",
	"to":"BOM"
}


endpoint: post.. http://localhost:5000/ping_api

sample input for search_api endpoint

{
    "hash": "delBOM2019-11-05T21:05:28.132Z"
}
