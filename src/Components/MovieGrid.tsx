import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Movie } from "../Interfaces/Movie";
import { MovieCompany } from "../Interfaces/MovieCompany";
import { calculateMeanOfArray } from "../CommonFunctions/Arithmetic";

interface MovieGridProps {
  movieData: Movie[] | null;
  movieCompanyData: MovieCompany[] | null;
  onChangeSelectedMovie: (movieId: string | null) => void;
}

export default function MovieGrid({
  movieData,
  movieCompanyData,
  onChangeSelectedMovie,
}: MovieGridProps) {
  const gridData = movieData
    ? movieData.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          review: calculateMeanOfArray(movie.reviews).toFixed(1),
          filmCompany:
            movieCompanyData?.find((f) => f.id === movie.filmCompanyId)?.name ??
            "-",
        };
      })
    : [];

  return (
    <div style={{ width: "80%" }}>
      <DataGrid
        style={{ minHeight: 150 }}
        rows={gridData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        onRowSelectionModelChange={(rowSelectionModel) => {
          const selectedMovie = gridData.find(
            (row) => row.id === rowSelectionModel[0]
          );
          onChangeSelectedMovie(selectedMovie?.id ?? null);
        }}
        rowSelection={true}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", minWidth: 200 },
  { field: "review", headerName: "Review", minWidth: 50, type: "number" },
  { field: "filmCompany", headerName: "Film Company", minWidth: 200 },
];
