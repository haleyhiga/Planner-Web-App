# Planner

## Resource

**Planner Table**

Attributes:

* name (string)
* date (string)
* desc (string)
* course (string)
* notes (string)

## Planner Schema

```sql
CREATE TABLE planner (
id INTEGER PRIMARY KEY,
name TEXT,
date TEXT,
desc TEXT,
course TEXT,
notes TEXT);
```


**Users Table**

Attributes:

* first_name (string)
* last_name (string)
* email (string)
* password (string)

## Users Schema

```sql
CREATE TABLE users (
id INTEGER PRIMARY KEY,
first_name TEXT,
last_name TEXT,
email TEXT,
password TEXT);
```


## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve homework collection | GET    | /homework
Retrieve homework member     | GET    | /homework/<int:homework_id>
Create homework member       | POST   | /homework
Update homework member       | PUT    | /homework/<int:homework_id>
Delete homework member       | DELETE | /homework/<int:homework_id>
Retrieve session | GET    | /sessions
Retrieve users collection | GET    | /users
Retrieve users member | GET    | /users
Create users member | POST   | /users
Login | POST   | /sessions/auth
Set Color | PUT   | /sessions/settings/colors
Set Theme | PUT   | /sessions/settings/themes



