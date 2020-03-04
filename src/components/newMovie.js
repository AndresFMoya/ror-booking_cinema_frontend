import React, { useState } from "react";
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withApollo } from 'react-apollo';

const MOVIES = gql`
query {
  movies {
    id
    name
    image
    dateStart
    dateEnd
    bookingsCount
  }
}
`;

const NEW_MOVIE = gql`
mutation CreateMovie(
  $name: String!
  $image: String!
  $dateStart: String!
  $dateEnd: String!
) {
  createMovie(name: $name, image: $image, dateStart: $dateStart, dateEnd: $dateEnd) {
    movie {
      id
      name
      image
      dateStart
      dateEnd
    }
  }
}
`;


const NewMovie = () => {
  const [state, setState] = useState({
    name: '',
    image: '',
    dateStart: '',
    dateEnd: ''
  });
  
  const { name, image, dateStart, dateEnd } = state;
  
  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      setState({
        name: value,
        image: image,
        dateStart: dateStart,
        dateEnd: dateEnd
      });
    }
    if (name === 'image') {
      setState({
        name: state.name,
        image: value,
        dateStart: dateStart,
        dateEnd: dateEnd
      });
    }
    if (name === 'dateStart') {
      setState({
        name: state.name,
        image: image,
        dateStart: value,
        dateEnd: dateEnd
      });
    }
    if (name === 'dateEnd') {
      setState({
        name: state.name,
        image: image,
        dateStart: dateStart,
        dateEnd: value
      });
    }
  };
  
  const handleSubmit = (e, createMovie) => {
    e.preventDefault();
  
    if (name !== '' && image !== '' && dateStart !== '' && dateEnd !== '') {
      createMovie({variables: state});
      setState({
        name: '',
        image: '',
        dateStart: '',
        dateEnd: ''
      });
    }
    else {
      window.alert("All fields are required")
    }
  };

  return (
  <Mutation
    mutation={NEW_MOVIE}
    refetchQueries={() => {
      return [{
        query: MOVIES,
      }];
    }}>
      {(createMovieMutation) => {
        return (
          <form onSubmit={ e => handleSubmit(e, createMovieMutation) }>
            <h4>Add New Movie</h4>
            <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" placeholder="Name" onChange={handleChange} value={name} id="name" name="name"/>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input className="form-control" placeholder="Image URL" onChange={handleChange} id="image" value={image} name="image"/>
            </div>
            <div className="form-group">
              <label htmlFor="dateStart">Date Start</label>
              <input className="form-control" placeholder="Start Date" onChange={handleChange} id="dateStart" value={dateStart} name="dateStart"/>
            </div>
            <div className="form-group">
              <label htmlFor="dateEnd">Date End</label>
              <input className="form-control" placeholder="End Date" onChange={handleChange} id="dateEnd" value={dateEnd} name="dateEnd"/>
            </div>
            <button className="btn btn-primary" type="submit">ADD MOVIE</button>
            </div>
          </form>
        )
      }}
    </Mutation>
  );
};

export default withApollo(NewMovie);
