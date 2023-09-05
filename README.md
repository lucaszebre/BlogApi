![BlogPostDataModel](https://github.com/lucaszebre/BlogApi/assets/76404328/7413a955-a59f-44f1-bf56-eacccf9c98f2)# Blog Post RESTFul-API

Blog Post API built using **NODE JS** and **SQL**. It follows a **RESTFul** design architecture. It's richly built with a simple scientific technique and best practices in the world of **API** design.

## Features
- Create a article 
- Update a article
- Delete a article
- Auth as a admin / Logout as a admin super role , delete comment , modified article , delete article 
- Auth as a visitor / comment the post , write article 
-Create a comment 
- Update a comment 
- Delete a comment 

## API Endpoints

| Methods | Endpoints                          | Access  | Description                              |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| GET     | /user/:userId[userId]                         | Private | get user table                         |
 POST     | /register                         | Private | register a new user               | POST     | /login                         | Private | connect the user                         |POST     | /logout[userId]                         | Private | logout the current user                      |
| PUT   | /user/[userId][postId]                          | Private | Update the information of the user                            |
| POST    | /user/[userId]                  | Private |  Create a post                  |
| DELETE    | /post/[postId] |[postId]             | Private | Delete  one post                     |
| PUT| /post/[postId]                 | Private | Update a post  
| DELETE | /post/[postId][postId]                  | Private | Delete a article
| GET | /comments/[commentId]                  | Private | get a current comment
| DELETE  | /comments/[commentId]                         | Private | Delete the current comment |
POST | /user/[userId]/post/[postId]/comment                  | Private | create a comment 
| PUT | /comment/[commentId]              | PRIVATE | update the comment
| DELETE  | /tags/[tagsId]                        

## Hosted Domain Link

[Blog Post API]()




[Blog Post API Shared Collection]

## Contributing

You can fork the repository and send pull request or reach out easily to me via twitter => [lucas zebre](https://twitter.com/ZebreLucas)

## Security Vulnerabilities

If you discover a security vulnerability within the project, please create an issue. All security vulnerabilities will be promptly addressed and appreciated.
