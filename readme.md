# Simple Rule Engine with AST

## About

A simple 3-tier rule engine application that determines user eligibility based on attributes such as age, department, income, spend, and more. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and allows for the dynamic creation, combination, and modification of these rules.

## Design Choices

- **AST Data Structure:** Tree
- **Architectural Design:** Monolithic
- **Database:** Non-Relational Database

## API Endpoints

### 1. Create Rules

**Endpoint:** `POST /api/create_rules`

**Description:** This endpoint allows you to create an AST of the input rules.

**Request Body:**
json
{
  "rules": "your rule string"
}

### Combine Rules
**Endpoint:**: `POST /api/combine_rules`

**Description:** This endpoint allows you to create an AST of the combined input rules.

**Request Body:**
json
{
  "rules": ["your rule string"]
}

### 3. Evaluate Rules
**Endpoint:**: POST /api/evaluate_rules

**Description:** This endpoint allows you to evaluate the rule against provided data.

**Request Body:**
json
{
  "ast": "your combined AST",
  "data": "your data"
}

## Build Instructions
 ### Clone the Repository
    bash
    Copy code
    git clone <repository-url>
    cd <repository-name>

**Setup Environment Variables:**
    Create a .env file in the root of the backend folder : PORT=<port-number>

### Install Backend Dependencies

    bash
    npm install
    npm start

    Change Directory to Client
    bash
    cd client
    Install Client Dependencies

    bash
    npm install
    npm run dev

### Access the Application
Once the servers are running, you can access the React application at the following URL:http://localhost:5173 