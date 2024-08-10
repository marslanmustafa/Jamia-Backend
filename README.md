# Jamia-Backend
## Node Version: 20.11.0 
For Migration with Sequelize in command prompt
>npm install sequelize
>>npm install -g sequelize-cli
>sequelize init
>>Configuring the config.js file with the connected database.

# Create the model
>sequelize model:generate --name User --attributes username:string,email:string
>>To create migration for relation
>sequelize migration:create --name students

# Run the Migration
>sequelize db:migrate

# For undo migration
>sequelize db:migrate:undo

# For checking migration status
>sequelize db:migrate:status


>Tables required for product variants: https://chat.openai.com/share/952bc055-8821-4784-aedc-dcda1860c575
