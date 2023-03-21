import { useState } from "react";
import "./App.css";
import BanList from "./Components/BanList";
import Country from "./Components/Country";
import galleryItem from "./assets/japan.jpeg";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
function App() {
  const [inputs, setInputs] = useState({
    description: "",
    name: "",
    city: "",
    country: "",
    img: "",
  });
  const [banList, setBanList] = useState([]);
  const addBanList = (item) => {
    if (banList.includes(item)) alert("The item is already in the list!");
    else setBanList([...banList, item]);
  };
  const [gallery, setGallery] = useState([]);
  const addGallery = (item) => {
    if (gallery.length == 0) setGallery([...gallery.slice(1), item]);
    else setGallery([...gallery, item]);
  };

  const makeQuery = () => {
    let query =
      "https://api.unsplash.com/photos/random?per_page=1&query=asia&client_id=mie_q-oREQWfw6LtKPOxKboBz_uYHDioi8xUUNxAWLY";
    callAPI(query).catch(console.error);
    addGallery(inputs);
  };

  const callAPI = async (query) => {
    let response = await fetch(query);
    let json = await response.json();

    if (json == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else if (
      json.location["name"] == null ||
      json.location["city"] == null ||
      json.location["country"] == null
    ) {
      while (
        json.location["name"] == null ||
        json.location["city"] == null ||
        json.location["country"] == null
      ) {
        response = await fetch(query);
        json = await response.json();
      }
    } else {
      setInputs({
        description: json.alt_description,
        name: json.location["name"].split(",")[0],
        city: json.location["city"],
        country: json.location["country"],
        img: json.urls["full"],
      });
      console.log(inputs.name);
      // reset();
    }
  };
  const reset = () => {
    setInputs({
      description: "",
      name: "",
      city: "",
      country: "",
      img: "",
    });
  };
  return (
    <div className="app-container">
      <div className="ban-container"></div>
      <h1 className="app-title">Travel Guide</h1>
      <p className="app-quote">
        Want to travel but don't know where to start?
        <br />
        Here's some suggestions!
      </p>
      <button className="btn-search" onClick={makeQuery}>
        Search
      </button>

      <Country
        inputs={inputs}
        description={inputs.description}
        name={inputs.name}
        city={inputs.city}
        country={inputs.country}
        img={inputs.img}
        addBanList={addBanList}
      />
      <BanList banList={banList} />
      <div className="gallery">
        <p className="gallery-title">Gallery</p>
        <div className="gallery-item-container">
          {gallery.map((item, index) => {
            return (
              <div className="gallery-item">
                <img src={item.img} key={index}></img>
                <div className="des-block">
                  <p className="des-name">{item.name}</p>
                  <p className="des-city">{item.city}</p>
                  <p className="des-country">{item.country}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
