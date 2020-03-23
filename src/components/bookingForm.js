import React, { useState } from "react";
import gql from 'graphql-tag';
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

const BOOKINGS = gql`
query {
  bookings{
    id
    userId
    movieId
    username
    email
    phone
    card
    moviename
  }
}
`;

const GET_USER = gql`
  query user($card: Int!) {
    user(card: $card) {
      id
    }
  }
`;

const GET_MOVIE = gql`
  { currentMovie @client }
`;

const NEW_USER = gql`
mutation CreateUser(
  $name: String!
  $card: Int!
  $email: String!
  $phone: Int!
) {
  createUser(name: $name, card: $card, email: $email, phone: $phone) {
    user {
      id
    }
  }
}
`;

const NEW_BOOKING = gql`
mutation CreateBooking(
  $userId: Int!
  $movieId: Int!
) {
  createBooking(userId: $userId, movieId: $movieId) {
    booking {
      id
    }
  }
}
`;

const refetchQueries = [{ query: BOOKINGS }, { query: MOVIES}]

const BookingForm = ({ client }) => {
  const [state, setState] = useState({
    name: '',
    card: '',
    email: '',
    phone: '',
  });

  const { name, card, email, phone } = state;

  async function findUser() {
    const result = await client
      .query({query: GET_USER, variables: {card: parseInt(state.card)} })
      .catch(err => console.log(err));
    const data = await result.data
    try {return (parseInt(data.user[0].id)) } catch {}
  }

  async function createUser() {
    try {
      await client
        .mutate ({mutation: NEW_USER, variables: state})
        .catch(err => console.log(err));
    } catch {}
  }

  async function findMovie() {
    const movieId = await client.query({query: GET_MOVIE});
    try {return (parseInt(movieId.data.currentMovie))} catch {}
  }

  async function createBooking (e) {
    e.preventDefault();
    if (!(name !== '' && card !== '' && phone !== '' && email !== '')) {
      window.alert('All fields are required')
    } else {
      try {
        await createUser();
      } catch {}
      const [user, movie] = await Promise.all([findUser(), findMovie()]);
      await client.mutate({mutation: NEW_BOOKING, variables: {userId: user, movieId: movie}, refetchQueries})
    }
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      setState({
        name: value,
        card: card,
        email: email,
        phone: phone
      });
    }
    if (name === 'card') {
      setState({
        name: state.name,
        card: parseInt(value),
        email: email,
        phone: phone
      });
    }
    if (name === 'email') {
      setState({
        name: state.name,
        card: card,
        email: value,
        phone: phone
      });
    }
    if (name === 'phone') {
      setState({
        name: state.name,
        card: card,
        email: email,
        phone: parseInt(value)
      });
    }
  };

  return (
      <form onSubmit={ e => createBooking(e) }>
        <h4>Book a Movie</h4>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" placeholder="Name" onChange={handleChange} id="name" value={name} name="name"/>
          </div>
          <div className="form-group">
            <label htmlFor="card">Card ID</label>
            <input className="form-control" placeholder="Card ID" onChange={handleChange} value={card} id="card" name="card"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" placeholder="Email" onChange={handleChange} id="email" value={email} name="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Phone</label>
            <input className="form-control" placeholder="Mobile" onChange={handleChange} id="phone" value={phone} name="phone"/>
          </div>
          <button className="btn btn-primary">Book Movie</button>
        </div>
      </form>
  );
};

export default withApollo(BookingForm);
