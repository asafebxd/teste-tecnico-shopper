/upload

-   receber body (s)
-   validar campos do body ()
-   chamar gemini e retorar consumo e codigo do cliente
-   salvar imagem no banco de dados
-   salvar consumo do cliente, codigo do cliente e data no banco de dados
-   gerar link da imagem: o link da imagem e um endpoint/image/{imageid} que o usuario acessa pelo navegador(exemplo) (http://localhost:3000/image/123)
-   retornar na api um link da imagem, measure_value e measure_uuid

-- Tabela:
Records

"id"": "id"
"image": "base64",
"customer_code": "string",
"measure_datetime": "datetime",
"measure_type": "WATER" ou "GAS
“measure_value”:integer,
“measure_uuid”: string
