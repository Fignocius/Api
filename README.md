# Api
Api

//Routes
[POST] /create-rule
JSON EXAMPLE:
{
	"day": null,
  "weekly": "3",
	"type": "weekly",
	"intervals": [
		{
			"start": "09:00",
			"end": "10:00"
		}
	]
}

Type:
"single" = um unico dia
"weekly" = semanalmente, dias de 0 a 6 iniciando no domingo
"daily" = diariamente

[GET] /list-rule
[DELETE] /delete-rule/:id

[GET] /get-rules?startAt="02-02-2019"&endAt="12-02-2019"
