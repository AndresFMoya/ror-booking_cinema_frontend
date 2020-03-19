import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import NewMovie from "./newMovie";
import BookingForm from "./bookingForm";
import { withApollo } from 'react-apollo';
import './home.css'
import Popup from "reactjs-popup";


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

const Home = ({client}) => {
  
  return (
    <Query query= {MOVIES}>
      {({
          loading, error, data
        }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
  
        const movies = data.movies;
  
        return (
          <div className="container">
            <header className="d-flex justify-content-between mt-4 align-items-center">
              <h2>Movies</h2>
            <Popup trigger={<button className='button'>+ Create New Movie</button>} modal>
              <div><NewMovie /></div>
            </Popup>
            </header>
            <main className="movie-section d-flex flex-wrap">
              {movies.map(movie => (
                <div className="m-2" key={`user__${movie.id}`}>
                  <div>
                    <Popup onOpen={
                      e => {
                        e.preventDefault();
                        client.writeData({data: {currentMovie: movie.id}})
                      }} trigger={<img
                      src={movie.image}
                      height="300"
                      width="200"
                      alt={movie.name}
                    />} modal>
                      <div><BookingForm/></div>
                    </Popup></div>
                  </div>
              ))}
            </main>
          </div>
        );
      }}
    </Query>
  )
};

export default withApollo(Home);
