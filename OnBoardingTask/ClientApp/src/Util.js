import React, { Component } from 'react';

fetch('/Customers/PutCustomer/' + this.state.details.id, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

fetch('/Customers/DeleteCustomer/' + id, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    this.setState();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

fetch('/Customers/PostCustomer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    this.setState();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

fetch('/Customers/GetCustomer', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    this.setState();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
