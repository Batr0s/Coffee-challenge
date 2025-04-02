# Libraries used:
- typeorm, @nestjs/typeorm, pg, reflect-metadata --> Added to make readable and easier to interact with the database.
- class-validator class-transformer --> I used DTO to validate the data on the backend and this libraries were interesting (readability) 
- axios --> To make requests in a simpler way.

# Database
Inside backend folder:
1. yarn start:dev:db
2. yarn start:dev --> it will also create the 'coffee' table
3. yarn populate --> runs a script that inserts 6 rows into 'coffee' table