import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <h4 className="card-text">
                Email : {email}
                <br />
                Gender : {gender}
                <br />
                Status : {status}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
