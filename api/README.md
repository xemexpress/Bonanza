# Boanaza API Spec

### Authentication Header:

`Authorization: Token jwt.token.here`


## JSON Objects returned by API:

### Users (for authentication)

```JSON
{
  "user": {
    "username": "unimemo",
    "proPic": "image.url",
    "token": "jwt.token.here"
  }
}
```

### Single Article

```JSON
{
  "article": {
    "id": 1,
    "title": "A Title",
    "body": "Its about a position.",
    "image": "image.link",
    "createdAt": "2017-08-13T18:24:36.162Z",
    "updatedAt": "2017-08-13T18:24:36.162Z"
  }
}
```

### Multiple Articles

```JSON
{
  "articles": [{
    "id": 2,
    "title": "Another Title",
    "body": "Mark two points on a paper, and connect them.",
    "image": "image.link",
    "createdAt": "2017-08-14T00:10:59.720Z",
    "updatedAt": "2017-08-14T00:10:59.720Z"
  }, {
    "id": 1,
    "title": "A Title",
    "body": "Its about a position.",
    "image": "image.link",
    "createdAt": "2017-08-13T18:24:36.162Z",
    "updatedAt": "2017-08-13T18:24:36.162Z"
  }],
  "articlesCount": 2
}
```

### Single Company

```JSON
{
  "company": {
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url", 
    "name": "長江和記實業有限公司",
    "link": "http://www.ckh.com.hk/tc/global/home.php",
    "tagList": ["滂湃"]
  }
}
```

### Multiple Companies

```JSON
{
  "companies": [{
    "updatedAt": "2017-08-14T00:10:59.720Z",
    "symbol": "1148",
    "abbr": "新晨動力",
    "logo": "image.url",
    "name": "新晨中國動力控股有限公司",
    "link": "http://www.xinchenpower.com/c/index.php",
    "tagList": ["精煉", "持有"]
  }, {
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url",
    "name": "長江和記實業有限公司",
    "link": "http://www.ckh.com.hk/tc/global/home.php",
    "tagList": ["滂湃"]
  }],
  "companiesCount": 2
}
```

### Single Record

```JSON
{
  "record": {
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "year": "2014Y",
    "keyList": ["關注點"],
    "businessSegments": [
      {
        "business": "汽油機",
        "grossProfitMargin": null,
        "share": 73.5
      },{
        "business": "柴油機",
        "grossProfitMargin": null,
        "share": 16
      },{
        "business": "零件 服務",
        "grossProfitMargin": null,
        "share": 10.5
      }
    ],
    "grossProfitMargin": null,
    "plans": [],
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
  "records": [{
    "updatedAt": "2017-08-14T00:10:59.720Z",
    "year": "2014Y",
    "keyList": ["關注點"],
    "businessSegments": [
      {
        "business": "汽油機",
        "grossProfitMargin": null,
        "share": 73.5
      },{
        "business": "柴油機",
        "grossProfitMargin": null,
        "share": 16
      },{
        "business": "零件 服務",
        "grossProfitMargin": null,
        "share": 10.5
      }
    ],
    "grossProfitMargin": null,
    "plans": [],
    "actionsDone": [
      "研發能力:arrow_up:",
      "潘陽物業租予寶馬"
    ]
  }, {
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "year": "2015M",
    "keyList": [],
    "businessSegments": [
      {
        "business": "汽油機",
        "grossProfitMargin": null,
        "share": 79.9
      },{
        "business": "柴油機",
        "grossProfitMargin": null,
        "share": 10.5
      },{
        "business": "零件 服務",
        "grossProfitMargin": null,
        "share": 9.5
      }
    ],
    "grossProfitMargin": 15.5,
    "plans": [
      {
        "plan": "生產王子發動機",
        "executed": "2015"
      }
    ],
    "actionsDone": [
      "收購曲軸生產線，供寶馬"
    ]
  }],
  "recordsCount": 2
}
```

### Single Financial
```JSON
{
  "financial": {
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "year": "2014Y",
    "resonance": {
      "revenue": 1,
      "salesCost": 1,
      "adminCost": 1,
      "financingCost": 1,
      "profit": 1
    },
    "position": {
      "currentAssets": {
        "cash": 2,
        "receivables": 2,
        "inventory": 2,
        "total": 2
      },
      "currentLiabilities": {
        "payables": 2,
        "tax": 2,
        "oneYearDebt": 2,
        "total": 2
      },
      "nonCurrentAssets": {
        "propertyPlantEquip": 2,
        "accumulatedAmortization": 2,
        "goodWill": 2,
        "total": 2
      },
      "nonCurrentLiabilities": {
        "aboveOneYearDebt": 2,
        "total": 2
      }
    },
    "cashFlow": {
      "netOperating": 3,
      "netInvesting": 3,
      "netFinancing": 3
    }
  }
}
```

### Multiple Financials
```JSON
{
  "financials": [{
    "updatedAt": "2017-08-14T00:10:59.720Z",
    "year": "2015M",
    "resonance": {
      "revenue": 1,
      "salesCost": 1,
      "adminCost": 1,
      "financingCost": 1,
      "profit": 1
    },
    "position": {
      "currentAssets": {
        "cash": 2,
        "receivables": 2,
        "inventory": 2,
        "total": 2
      },
      "currentLiabilities": {
        "payables": 2,
        "tax": 2,
        "oneYearDebt": 2,
        "total": 2
      },
      "nonCurrentAssets": {
        "propertyPlantEquip": 2,
        "accumulatedAmortization": 2,
        "goodWill": 2,
        "total": 2
      },
      "nonCurrentLiabilities": {
        "aboveOneYearDebt": 2,
        "total": 2
      }
    },
    "cashFlow": {
      "operating": 3,
      "investing": 3,
      "financing": 3
    }
  }, {
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "year": "2014Y",
    "resonance": {
      "revenue": 1,
      "salesCost": 1,
      "adminCost": 1,
      "financingCost": 1,
      "profit": 1
    },
    "position": {
      "currentAssets": {
        "cash": 2,
        "receivables": 2,
        "inventory": 2,
        "total": 2
      },
      "currentLiabilities": {
        "payables": 2,
        "tax": 2,
        "oneYearDebt": 2,
        "total": 2
      },
      "nonCurrentAssets": {
        "propertyPlantEquip": 2,
        "accumulatedAmortization": 2,
        "goodWill": 2,
        "total": 2
      },
      "nonCurrentLiabilities": {
        "aboveOneYearDebt": 2,
        "total": 2
      }
    },
    "cashFlow": {
      "operating": 3,
      "investing": 3,
      "financing": 3
    }
  }],
  "financialsCount": 2
}

### List of Tags
```JSON
{
  "tags": [
    "滂湃",
    "精煉"
  ]
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

403 for Prohibited requests, when a request requires admin pass but it isn't provided

404 for Not found requests, when a resource can't be found to fulfill the request


## Endpoints:

### List Articles

`GET /api/articles`

Query Parameters:

Limit number of articles (default is 10):

`?limit=10`

Offset number of articles (default is 0):

`?offset=0`

Authentication optional, returns [multiple articles](#multiple-articles), ordered by most recent first

### Authentication:

`POST /api/users/login`

Example request body:
```JSON
{
  "user": {
    "username": "unimemo",
    "password": "password"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `username`, `password`

### Registration:

`POST /api/users`

Example request body:
```JSON
{
  "user": {
    "username": "unimemo",
    "password": "password"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `username`, `password`

### Get Current User

`GET /api/user`

Authentication required, returns a [User](#users-for-authentication) that's the current user

### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "user": {
    "proPic": "newImage.url"
  }
}
```

Authentication required, returns the [User](#users-for-authentication)

Optional fields: `username`, `password`, `proPic`

### List Companies

`GET /api/companies`

Query Parameters:

Filter by companyName:

`?companyName=anyPartOfTheCompanyName`

Filter by tag:

`?tag=持有`

Limit number of companies (default is 24):

`?limit=24`

Offset number of companies (default is 0):

`?offset=0`

Authentication required, returns corresponding [multiple companies](#multiple-companies) of the current User's own, ordered by most recent first

### Create Company

`POST /api/companies`

Example request body:
```JSON
{
  "company": {
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url", 
    "name": "長江和記實業有限公司",
    "link": "link.url",
    "tagList": ["滂湃"]
  }
}
```

Authentication required, returns the [Company](#single-company)

Required fields: `symbol`, `name`

Optional fields: `abbr`, `logo`, `link`, `tagList` as an array of Strings

### Retrieve Company

`GET /api/companies/:symbol`

Authentication required, returns the [Company](#single-company)

### Update Company

`PUT /api/companies/:symbol`

Example request body:
```JSON
{
  "company": {
    "logo": "companyLogo.url"
  }
}
```

Authentication required, returns the updated [Company](#single-company)

Optional fields: `symbol`, `name`, `abbr`, `logo`, `link`, `tagList` as an array of Strings

### Delete Company

`DELETE /api/companies/:symbol`

Authentication required, returns `{}`

### Get Records from Company

`GET /api/companies/:symbol/records`

Authentication required, returns [multiple records](#multiple-records), ordered by `year`

### Add Record to Company

`POST /api/companies/:symbol/records`

Example request body:
```JSON
{
  "record": {
    "year": "2014Y",
    "keyList": ["關注點"],
    "businessSegments": [
      {
        "business": "汽油機",
        "grossProfitMargin": null,
        "share": 73.5
      },{
        "business": "柴油機",
        "grossProfitMargin": null,
        "share": 16
      },{
        "business": "零件 服務",
        "grossProfitMargin": null,
        "share": 10.5
      }
    ],
    "grossProfitMargin": null,
    "plans": [],
    "actionsDone": [
      "研發能力:arrow_up:",
      "潘陽物業租予寶馬"
    ]
  }
}
```

Authentication required, returns the [Record](#single-record)

Required field: `year`

Optional fields: `keyList` as an array of Strings, `businessSegments`, `grossProfitMargin`, `plans`, `actionsDone`

### Update Record

`PUT /api/companies/:symbol/records/:year`

Example request body:
```JSON
{
  "record": {
    "grossProfitMargin": 77.7
  }
}
```

Authentication required, returns the updated [Record](#single-record)

Optional fields: `keyList` as an array of Strings, `businessSegments`, `grossProfitMargin`, `plans`, `actionsDone`, `year`

### Delete Record

`DELETE /api/companies/:symbol/records/:year`

Authentication required, returns `{}`

### Get Financials from Company

`GET /api/companies/:symbol/financials`

Authentication required, returns [multiple financials](#multiple-financials), ordered by `year`

### Add Financial to Company

`POST /api/companies/:symbol/financials`

Example request body:
```JSON
{
  "financial": {
    "year": "2014Y",
    "resonance": {
      "revenue": 1,
      "salesCost": 1,
      "adminCost": 1,
      "financingCost": 1,
      "profit": 1
    },
    "position": {
      "currentAssets": {
        "cash": 2,
        "receivables": 2,
        "inventory": 2,
        "total": 2
      },
      "currentLiabilities": {
        "payables": 2,
        "tax": 2,
        "oneYearDebt": 2,
        "total": 2
      },
      "nonCurrentAssets": {
        "propertyPlantEquip": 2,
        "accumulatedAmortization": 2,
        "goodWill": 2,
        "total": 2
      },
      "nonCurrentLiabilities": {
        "aboveOneYearDebt": 2,
        "total": 2
      }
    },
    "cashFlow": {
      "netOperating": 3,
      "netInvesting": 3,
      "netFinancing": 3
    }
  }
}
```

Authentication required, returns the [Financial](#single-financial)

Required field: `year`

Optional fields: `resonance`, `position`, `cashFlow`

### Update Financial

`PUT /api/companies/:symbol/records/:year`

Example request body:
```JSON
{
  "financial": {
    "cashFlow": {
      "netOperating": 3,
      "netInvesting": 3,
      "netFinancing": 3
    }
  }
}
```

Authentication required, returns the updated [Financial](#single-financial)

Optional fields: `resonance`, `position`, `cashFlow`, `year`

### Delete Financial

`DELETE /api/companies/:symbol/financials/:year`

Authentication required, returns `{}`

### Get Tags

`GET /api/tags`

Authentication required, returns a [List of Tags](#list-of-tags)


## Endpoints (admin):

### Create Article

`POST /api/articles`

Example request body:

```JSON
{
  "article": {
    "title": "A Title",
    "body": "Mark two points on a paper, and connect them.",
    "image": "image.link"
  }
}
```

Admin Pass required, returns the [Article](#single-article)

Required field: `title`, `body`

Optional field: `image`

### Update Article

`PUT /api/articles/:id`

Example request body:

```JSON
{
  "article": {
    "body": "Link a point to another!"
  }
}
```

Admin Pass required, returns the updated [Article](#single-article)

Optional fields: `title`, `body`, `image`

### Delete Article

`DELETE /api/articles/:id`

Admin Pass required, returns `{}`

### List Users

`GET /api/admin/users`

Admin Pass required, returns multiple profiles

```JSON
{
  "users": [{
    "username": "unimemo",
    "proPic": "image.url"
  }, {
    "username": "testtest",
    "proPic": "image.url"
  }],
  "usersCount": 2
}
```

### Delete Users

`DELETE /api/admin/users`

Example request body:
```JSON
{
  "users": ["username1"]
}
```

Admin Pass required, returns `{}`

Optional field: `users` as an array of usernames

### List Companies

`GET /api/admin/companies`

Query Parameters:

Filter by author:

`?author=unimemo`

Filter by tag:

`?tag=持有`

Limit number of companies (default is 24):

`?limit=24`

Offset number of companies (default is 0):

`?offset=0`

Admin pass required, returns multiple profiles, ordered by most recent first

```JSON
{
  "companies": [
    {
      "symbol": "1",
      "author": {
        "username": "unimemo",
        "proPic": "https://static.productionready.io/images/smiley-cyrus.jpg"
      } 
    },{
      "symbol": "1148",
      "author": {
        "username": "testtest",
        "proPic": "https://static.productionready.io/images/smiley-cyrus.jpg"
      } 
    }
  ],
  "companiesCount": 2
}
```

### Delete Companies

`DELETE /api/admin/companies`

Example request body:
```JSON
{
  "companies": {
    "author": "testtest",
    "symbols": [
      "1148"
    ]
  }
}
```

Admin pass required, returns `{}`

Required field: `author`

Optional field: `symbols` as an array of symbols. All the owner(as author)'s companies will be deleted if `symbols` is not provided.

### List Records

`GET /api/admin/records`

Admin pass required, return multiple profiles

```JSON
{
  "records": [
    {
      "symbol": "1148",
      "year": "2014M",
      "author": {
        "username": "testtest",
        "proPic": "https://static.productionready.io/images/smiley-cyrus.jpg"
      } 
    },{
      "company": "1148",
      "year": "2014Y",
      "author": {
        "username": "testtest",
        "proPic": "https://static.productionready.io/images/smiley-cyrus.jpg"
      } 
    }
  ],
  "recordsCount": 2
}
```

### Customized Model-wise Update

#### Modify Shallow (first-layer) Property

`PUT /api/admin/shallowproperty`

Example request body:
```JSON
{
  "newProperty": {
    "name": "propertyName",
    "default": "defaultValue",
    "forModel": "ModelName"
  }
}
```

Admin pass required, return the last modified sample.

Required fields: `name`, `default` (if `default` equals `'index'`, `index` would be assigned accordingly), `forModel`
