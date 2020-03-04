import React from 'react'
import gql from "graphql-tag";
import {Query, withApollo} from "react-apollo";
import './bookingsList.css'

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

const BookingsList = ({client}) => {
  return (
    <Query query= {BOOKINGS}>
      {({
          loading, error, data
        }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        
        const bookings = data.bookings;
        
        return (
          <div>
            <h2>Bookings</h2>
            <table className="table">
              <thead>
              <tr>
                <th>Movie</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Card</th>
                <th>Phone</th>
              </tr>
              </thead>
              <tbody>
              {bookings.map(booking => (
                <tr key={`booking__${booking.id}`}>
                  <td>{booking.moviename}</td>
                  <td>{booking.username}</td>
                  <td>{booking.email}</td>
                  <td>{booking.card}</td>
                  <td>{booking.phone}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        );
      }}
    </Query>
  )
};

export default withApollo(BookingsList);
