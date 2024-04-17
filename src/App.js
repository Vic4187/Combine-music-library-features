import { useState, useRef, Suspense, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import AlbumView from "./Components/AlbumView";
import ArtistView from "./Components/ArtistView";
import { createResource as fetchData } from './helper';
import Spinner from "./Components/Spinner";


function App() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!');
  const [data, setData] = useState([null]);

  const searchInput = useRef("");

  const handleSearch = async (e, term) => {
    e.preventDefault();
  
      if (term) { 
      setData (fetchData(term));
  } else {
    setMessage("Please enter a search term");
  }
  };


return (
  <div className="App">
    {message}
    <Router>
      <SearchContext.Provider
        value={{
          term: searchInput,
          handleSearch: handleSearch,
        }}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
        </Routes>
      </SearchContext.Provider>
        <DataContext.Provider value={data}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <Gallery data={data}/>
                </Suspense>
            }/>
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </DataContext.Provider>
    </Router>
  </div>
);
}

export default App;