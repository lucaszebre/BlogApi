#![BlogPostDataModel](https://github.com/lucaszebre/BlogApi/assets/76404328/96a37a0a-eb36-4020-bc77-2ad1fcee05f2)
 Blog Post RESTFul-API

Blog Post API built using **NODE JS** and **SQL**. It follows a **RESTFul** design architecture. It's richly built with a simple scientific technique and best practices in the world of **API** design.

## Features

- Create a article 
- Update a article
- Delete a article
- Auth as a admin / Logout as a admin super role , delete comment , modified article , delete article 
- Auth as a visitor / comment the post , write article 

## API Endpoints

| Methods | Endpoints                          | Access  | Description                              |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| GET     | /user/[userId]                         | Private | get user table                         |
 POST     | /user                         | Private | create user row                         | PUT     | /user/[userId]                         | Private | update the user info                        |DELETE     | /user/[userId]                         | Private | delete the user info                        |
| GET   | /user/[userId]/post/[postId]                          | Private | Get one post                           |
| POST    | /user/[userId]/posts                  | Private |  Create a post                  |
| DELETE    | /user/[userId]/posts/[postId]             | Private | Delete  one post                     |
| POST | /user/[userId]/comments                   | Private | create a comment  
| PUT | /user/[userId]/comments/[commentId]                  | Private | update a comment 
| GET | /user/[userId]/comments/[commentId]                  | Private | get a current comment
| DELETE  | /user/[userId]/comments/[commentId]                         | Private | Delete the current comment |
POST | /tags                   | Private | create a tag  
| GET | /tags/[tagId]              | Public | get all post correspondant to the tag
| DELETE  | /tags/[tagsId]                        | Private | Delete the tag 
| PUT  | /tags/[tagsId]                        | Private | update a tag 

## Hosted Domain Link

[Blog Post API]()




[Blog Post API Shared Collection]

## Contributing

You can fork the repository and send pull request or reach out easily to me via twitter => [lucas zebre](https://twitter.com/ZebreLucas)

## Security Vulnerabilities

If you discover a security vulnerability within the project, please create an issue. All security vulnerabilities will be promptly addressed and appreciated.
