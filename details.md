
## Why I chose FeathersJS?
I chose to use FeathersJS because I have had a good experience with it in the past. It was some years ago, and they have made some major changes since then, I think I used v1 back in 2018-2019 and now it was v5 so there were definitely some changes that I had to study and experiment about.
FeathersJS also makes it super easy to generate basic CRUD operations for different services/tables in a database, and you can simply plug in your hooks to manipulate data either around, before or after the service is called.

## Why I chose PostgresQL over MongoDB
I chose to use a postgresql database simply because i prefer relational databases over non-relational databases. I got a free instance on ElephantSQL and used the same instance for the dev and production.

## Deployment and API
The backend is deployed on Render. The api is can be called at https://blog-posts-ts.onrender.com/
The CRUD Methods are 
1. GET /posts: Retrieve a list of all blog posts.
2. GET /posts/:id: Retrieve details of a specific blog post.
3. POST /posts: Add a new blog post.
4. PUT /posts/:id: Update an existing blog post.
5. DELETE /posts/:id: Delete a specific blog post.

## Comparison to the previous version
- This version has is in Typescript
- There is a users service that handles the users and authentication
- The posts service is also protected by authentication.
- There is use of linting using ```ts-standard``` to ensure code quality
- Used migrations this time to create the tables in the database
- Used Typebox for schema in place of JSON schema
