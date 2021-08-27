import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './style.css';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios('https://gorest.co.in/public/v1/users')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <div className="container">
      {data.data.map(({ id, name, email, gender, status }) => (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{id}</Card.Title>
            <Card.Text>
              <p>
                {' '}
                Name : {name}
                <br />
                Email : {email}
                <br />
                Gender : {gender}
                <br />
                Status : {status}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
