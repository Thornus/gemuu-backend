# Gemuu Back-end

### Summary

The project is currently very simple and can be summarized into three parts:

#### models

Models are schemas for the information to insert into the database. Every entity needs a model where its properties are defined together with their type and, optionally, their default value.

#### routes

Routes contain all the POST/GET/PUT (etc) functions.

#### controllers

Controllers are where the POST/GET/PUT (etc) functions are defined and exported to be used in routes.