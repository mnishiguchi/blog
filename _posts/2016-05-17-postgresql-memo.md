---
layout: post
title: PostgreSQL memo
comments: true
tags:
- postgresql
- database
- rails
---

*{{ page.title }}*.

<!--more-->

## PostgreSQL

#### [psql: FATAL: database ... does not exist](http://stackoverflow.com/a/17936043/3837223)

#### Show all the databases

```
$ psql
psql (9.4.1)
Type "help" for help.

masa=# \list
                                          List of databases
               Name                | Owner | Encoding |   Collate   |    Ctype    | Access privileges
-----------------------------------+-------+----------+-------------+-------------+-------------------
 sample_app_development            | masa  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 sample_app_test                   | masa  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

#### Connect to a database

```
masa=# \connect sample_app_development
You are now connected to database "sample_app_development" as user "masa".
```

#### Display all the tables in the currently working database

```
sample_app_development=# \dt
             List of relations
 Schema |       Name        | Type  | Owner
--------+-------------------+-------+-------
 public | schema_migrations | table | masa
 public | users             | table | masa
(2 rows)
```

#### Display a table by performing an SQL query

```
sample_app_development=# SELECT * FROM "users";
 id |         name         |     email      |         created_at         |         updated_at         |                       password_digest
----+----------------------+----------------+----------------------------+----------------------------+--------------------------------------------------------------
  1 | Masatoshi Nishiguchi | mn@example.com | 2016-05-17 21:17:17.639944 | 2016-05-17 21:17:17.639944 | $2a$10$l3PW9nG74ey4JXQJLhBtUOJBChLsK0vDv2ogPKwAqsX/lCk3E0UQe
(1 row)
```

#### Delete a record from a table

```
sample_app_development=# DELETE FROM "users" WHERE id=3;
DELETE 1
```

#### Some alternative commands

```bash
# List all database tables
$ psql sample_app_development -c "\d"
               List of relations
 Schema |       Name        |   Type   | Owner
--------+-------------------+----------+-------
 public | schema_migrations | table    | masa
 public | users             | table    | masa
 public | users_id_seq      | sequence | masa
(3 rows)
```

```bash
# List all columns for the table 'users'.
$ psql sample_app_development -c "\d users"
                                        Table "public.users"
     Column      |            Type             |                     Modifiers
-----------------+-----------------------------+----------------------------------------------------
 id              | integer                     | not null default nextval('users_id_seq'::regclass)
 name            | character varying           | not null
 email           | character varying           | not null
 created_at      | timestamp without time zone | not null
 updated_at      | timestamp without time zone | not null
 password_digest | character varying           |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "index_users_on_email" UNIQUE, btree (email)
```
