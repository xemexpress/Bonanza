# Boanaza API Spec

### Authentication Header:

`Authorization: Token jwt.token.here`


## JSON Objects returned by API:

### Users (for authentication)

```JSON
{
  "user": {
    "username": "unimemo",
    "token": "jwt.token.here"
  }
}
```

### Single Company

```JSON
{
  "company": {
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url", 
    "name": "長江和記實業有限公司",
    "createdAt": "2017-08-13T18:24:36.162Z",
    "updatedAt": "2017-08-13T18:24:36.162Z"
  }
}
```

### Multiple Companies

```JSON
{
  "companies": [{
    "symbol": "1148",
    "abbr": "新晨動力",
    "logo": "image.url",
    "name": "新晨中國動力控股有限公司",
    "createdAt": "2017-08-14T00:10:59.720Z",
    "updatedAt": "2017-08-14T00:10:59.720Z"
  }, {
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url",
    "name": "長江和記實業有限公司",
    "createdAt": "2017-08-13T18:24:36.162Z",
    "updatedAt": "2017-08-13T18:24:36.162Z"
  }],
  "companiesCount": 2
}
```

### Single Record

```JSON
{
  "record": {
    "year": "2014",
    "key": "關注點",
    "businesses": [
      ["汽油機", null, 73.5],
      ["柴油機", null, 16],
      ["零件 服務", null, 10.5]
    ],
    "grossMargin": null,
    "actionsToBe": [],
    "actionsDone": [
      "研發能力:arrow_up:",
      "潘陽物業租予寶馬"
    ]
  }
}
```

### Multiple Records

```JSON
{
  "records": [
    {
      "year": "2014",
      "key": "關注點",
      "businesses": [
        ["汽油機", null, 73.5],
        ["柴油機", null, 16],
        ["零件 服務", null, 10.5]
      ],
      "grossMargin": null,
      "actionsToBe": [],
      "actionsDone": [
        "研發能力:arrow_up:",
        "潘陽物業租予寶馬"
      ]
    },
    {
      "year": "2015中",
      "key": "",
      "businesses": [
        ["汽油機", null, 79.9],
        ["柴油機", null, 10.5],
        ["零件 服務", null, 9.5]
      ],
      "grossMargin": 15.5,
      "actionsToBe": [
        ["開發王子發動機", true]
      ],
      "actionsDone": [
        "收購曲軸生產線，供寶馬"
      ]
    },
  ],
  "recordsCount": 2
}
```

### Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

```JSON
{
  "errors": {
    "body": [
      "can't be empty"
    ]
  }
}
```

#### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

404 for Not found requests, when a resource can't be found to fulfill the request
