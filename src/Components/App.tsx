import { MovieCompany } from "../Interfaces/MovieCompany";
import MovieGrid from "./MovieGrid";
import { ReviewForm } from "./ReviewForm/ReviewForm";
import { useFetchedData } from "../CustomHooks/useFetchedData";
import { RequestStatus } from "../Interfaces/RequestStatus";
import { Movie } from "../Interfaces/Movie";
import React from "react";
import { RefreshButton } from "./RefreshButton";

export const App = () => {
  const [selectedMovieId, setSelectedMovieId] = React.useState<string | null>(
    null
  );
  const [movieCompanyData, refreshMovieCompanyData, movieCompanyRequestState] =
    useFetchedData<MovieCompany>("http://127.0.0.1:4321/movieCompanies");

  const [movieData, refreshMovieData, movieRequestState] =
    useFetchedData<Movie>("http://127.0.0.1:4321/movies");

  const selectedMovie =
    movieData?.find((movie) => movie.id === selectedMovieId) ?? null;
  const isAnyDataPending =
    movieRequestState === RequestStatus.Pending ||
    movieCompanyRequestState === RequestStatus.Pending;
  const isAnyDataFailed =
    movieRequestState === RequestStatus.Failed ||
    movieCompanyRequestState === RequestStatus.Failed;

  return (
    <>
      <h2>Welcome to Movie database!</h2>;
      <h3>
        Total movies:{" "}
        {movieData?.length ?? (isAnyDataPending ? "Loading..." : 0)}
      </h3>
      {isAnyDataFailed ? (
        <h4>Failed to fetch all data. Please refresh.</h4>
      ) : null}
      <RefreshButton
        isDisabled={isAnyDataPending}
        onRefresh={() => {
          refreshMovieData();
          refreshMovieCompanyData();
        }}
      />
      <MovieGrid
        movieData={movieData}
        movieCompanyData={movieCompanyData}
        onChangeSelectedMovie={setSelectedMovieId}
      />
      {!!selectedMovie ? <ReviewForm /> : null}
    </>
  );
};
