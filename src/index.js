import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
// import StarRating from "./components/StarRating";
import "./index.css";


// function Test() {
//   const [movieRating, setMovieRating] = useState(0) 
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating}  />
//       <p>The movie was rated {movieRating} star</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StarRating
      maxRating={5}
      color="red"
      className="test"
      message={["terriable", "bad", "ok", "good", "amazing"]}
      defaultRating={0}
    />
    <Test/> */}
    <App/>
  </React.StrictMode>
);
