import fetch from 'cross-fetch';
import { BASE_URL } from "./constants";
import {
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
  } from 'graphql';
  
  const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Employee',
    fields: () => ({
        id: {
        type: GraphQLInt,
        description: 'Id',
        resolve: (emlpoyee) => emlpoyee.id
      },
      employee_name: {
        type: GraphQLString,
        description: 'Name',
        resolve: (emlpoyee) => emlpoyee.employee_name
      },
      employee_salary: {
        type: GraphQLFloat,
        description: 'salary',
        resolve: (employee) => employee.employee_salary
      },
      employee_age: {
        type: GraphQLInt,
        description: 'Age',
        resolve: (employee) => employee.employee_age 
      },
      profile_image: {
        type: GraphQLString,
        description: 'Image',
        resolve: (employee) => employee.profile_image 
      }
    })
  });
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query of all',
    fields: () => ({
      Employees: {
        type: new GraphQLList(EmployeeType),
        description: 'All Employees',
        resolve: (root, args) => fetch(BASE_URL)
          .then(response => response.json())
          .then(data => data.results)
  
      },
  /*     Employee: {
        type: EmployeeType,
        args: {
          id: { 
            type: GraphQLID
          }
        },
        // resolve: (root, args) => fetch(`${BASE_URL}/people/${args.id}`)
        resolve: (root, args) => fetch(BASE_URL)
            .then(response => response.json())
            .then(data => data)
        } */
    })
  })
  
  export default new GraphQLSchema({
    query: QueryType
  });

