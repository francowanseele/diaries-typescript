# App in Node.js with TypeScript

Just a quick example with basic endpoints.

## Setup & Run

1. Clone repository

2. Run:
```
npm install
```

3. Create an `.env` file with the following variables
```
# The salt to be used in encryption. If specified as a number then a salt will be generated with the specified number of rounds and used
NODE_BCRYPT_SALT_ROUNTDS=number

# JWT string to verify
NODE_SECRET_JWT=some_random_string
```

4. Run app
```
npm run dev
```

5. Build app
```
npm run tsc

npm run start
```
