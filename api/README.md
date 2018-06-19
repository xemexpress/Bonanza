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
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url", 
    "name": "長江和記實業有限公司",
    "link": "http://www.ckh.com.hk/tc/global/home.php",
    "tagList": ["滂湃"],
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
    "link": "http://www.xinchenpower.com/c/index.php",
    "tagList": ["精煉", "持有"],
    "createdAt": "2017-08-14T00:10:59.720Z",
    "updatedAt": "2017-08-14T00:10:59.720Z"
  }, {
    "symbol": "1",
    "abbr": "長和",
    "logo": "image.url",
    "name": "長江和記實業有限公司",
    "link": "http://www.ckh.com.hk/tc/global/home.php",
    "tagList": ["滂湃"],
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
    "year": "2014y",
    "key": "關注點",
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
  "records": [
    {
      "year": "2014y",
      "key": "關注點",
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
    },
    {
      "year": "2015m",
      "key": "",
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
    },
  ],
  "recordsCount": 2
}
```

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
    "tagList": ["滂湃"]
  }
}
```

Authentication required, returns the [Company](#single-company)

Required fields: `symbol`, `name`

Optional fields: `abbr`, `logo`, `link`, `tagList` as an array of Strings

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

### Get Records from a Company

`GET /api/companies/:symbol/records`

Authentication required, returns [multiple records](#multiple-records), ordered by `year`

### Add Record to a Company

`POST /api/companies/:symbol/records`

Example request body:
```JSON
{
  "record": {
    "year": "2014y",
    "key": "關注點",
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

Optional fields: `key`, `businessSegments`, `grossProfitMargin`, `plans`, `actionsDone`

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

Optional fields: `key`, `businessSegments`, `grossProfitMargin`, `plans`, `actionsDone`

### Update Record.BusinessSegments

#### Add Business

`POST /api/companies/:symbol/records/:year/segments`

Example request body:
```JSON
{
  "newBusiness": {
    "business": "零件 服務",
    "grossProfitMargin": null,
    "share": 10.5
  }
}
```

Authentication required, returns the updated [Record](#single-record)

Required field: `business`

Optional fields: `grossProfitMargin`, `share`

#### Update Business

`PUT /api/companies/:symbol/records/:year/segments/:index`

Example request body:
```JSON
{
  "segment": {
    "grossProfitMargin": 77.7
  }
}
```

Authentication required, returns the updated [Record](#single-record)

Optional fields: `business`, `grossProfitMargin`, `share`

#### Remove Business

`DELETE /api/companies/:symbol/records/:year/segments/:index`

Authentication required, returns `{}`

### Update Record.Plans

#### Add Plan

`POST /api/companies/:symbol/records/:year/plans`

Example request body:
```JSON
{
  "newPlan": {
    "plan": "開發王子發動機"
  }
}
```

Authentication required, returns the updated [Record](#single-record).

Required field: `plan`

#### Update Plan

`PUT /api/companies/:symbol/records/:year/plans/:index`

Example request body:
```JSON
{
  "plan": {
    "action": "生產王子發動機II",
    "executed": "2017"
  }
}
```

Authentication required, returns the updated [Record](#single-record)

Optional fields: `action`, `executed`

#### Toggle Plan's execution state

`PUT /api/companies/:symbol/records/:year/plans/:index/executed`

Authentication required, returns updated [Record](#single-record)

#### Delete Plan

`DELETE /api/companies/:symbol/records/:year/plans/:index`

Authentication required, returns `{}`

### Update Record.ActionsDone

#### Add ActionDone

`POST /api/companies/:symbol/records/:year/actions`

Example request body:
```JSON
{
  "action": {
    "done": "研發能力:arrow_up:"
  }
}
```

Authentication required, returns updated [Record](#single-record)

Required field: `done`

#### Update ActionDone

`PUT /api/companies/:symbol/records/:year/actions/:index`

Example request body:
```JSON
{
  "action": {
    "done": "研發能力:arrow_up::arrow_up:"
  }
}
```

Authentication required, returns updated [Record](#single-record)

Optional field: `done`

#### Remove ActionDone

`DELETE /api/companies/:symbol/records/:year/actions/:index`

Authentication required, returns `{}`

### Delete Record

`DELETE /api/companies/:symbol/records/:year`

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

Admin Pass required, returns {}

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
      "year": "2014m",
      "author": {
        "username": "testtest",
        "proPic": "https://static.productionready.io/images/smiley-cyrus.jpg"
      } 
    },{
      "company": "1148",
      "year": "2014y",
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
