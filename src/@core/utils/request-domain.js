import {useState, useEffect} from 'react';

export const requestDomain = () => {

    setLoading(true)
    fetch('https://localhost:8000/api/domains')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data['hydra:member'])
        setLoading(false)
      })
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return data;
}