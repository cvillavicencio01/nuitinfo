# Application

## Overview

Route | Description | Authentication
----- | ----------- | --------------
[**POST** /application/fromUser](#post-applicationfromuser) | Add a new application from a user | Yes
[**POST** /application/fromTeam](#post-applicationfromteam) | Add a new application from a team | Yes
[**POST** /application/accept](#post-applicationaccept) | Accept an application | Yes
[**POST** /application/refuse](#post-applicationrefuse) | Refuse an application | Yes
[**GET** /application/forUser](#get-applicationforuser) | Get applications for a user | Yes
[**GET** /application/forUser/waiting](#get-applicationforuserwaiting) | Get waiting applications for a user | Yes
[**GET** /application/forTeam](#get-applicationforteam) | Get applications for a team | Yes

## POST /application/fromUser

#### Body parameters

```javascript
{
    "user" : ObjectID [Required], // User 
    "team" : ObjectID [Required] // Team
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-11 | Missing user
-12 | Missing team
-13 | Missing fromTeam/fromUser flag
-29 | Internal error in MongoDB during insertion

##### Data

```javascript
Application's entry
```

## POST /application/fromTeam

#### Body parameters

```javascript
{
    "user" : ObjectID [Required], // User 
    "team" : ObjectID [Required] // Team
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-11 | Missing user
-12 | Missing team
-13 | Missing fromTeam/fromUser flag
-29 | Internal error in MongoDB during insertion

##### Data

```javascript
Application's entry
```

## POST /application/accept

#### Body parameters

```javascript
{
    "application" : ObjectID [Required], // Application to accept
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-11 | Missing application
-28 | Internal error in MongoDB during deletion

##### Data

```javascript
{}
```

## POST /application/refuse

#### Body parameters

```javascript
{
    "application" : ObjectID [Required], // Application to accept
}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-11 | Missing application
-28 | Internal error in MongoDB during deletion
-51 | Authentication Failed

##### Data

```javascript
{}
```

## GET /application/forUser

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-27 | Internal error in MongoDB during selection
-43 | No applications found

##### Data

```javascript
[Applications's entries]
```

## GET /application/forUser/waiting

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-27 | Internal error in MongoDB during selection
-43 | No applications found

##### Data

```javascript
[Applications's entries]
```

## GET /application/forTeam

#### Body parameters

```javascript
{}
```

#### Return

##### Success code

Code | Description
---|---
1 | Success
-1 | Not logged
-27 | Internal error in MongoDB during selection
-43 | No applications found

##### Data

```javascript
[Applications's entries]
```

