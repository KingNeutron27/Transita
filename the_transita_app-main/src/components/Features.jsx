import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ourFeatures } from "../data/db.js";
import loca from "../assets/images/loca.svg";
import destination from "../assets/images/destination.svg";
import route from "../assets/images/route.png";
import find from "../assets/images/find.png";
import disallowed from "../assets/images/disallowed.png";
import warning from "../assets/images/warning-sign.png";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Features = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [map, setMap] = useState(null);
  const [fromMarker, setFromMarker] = useState(null);
  const [toMarker, setToMarker] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const mapRef = useRef(null);
  const routeLayerRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      const mapInstance = L.map(mapRef.current, {
        center: [6.5244, 3.3792], // Lagos, Nigeria
        zoom: 10,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, []); // Empty dependency array to run once on mount

  // Function to search for a location using Nominatim API
  const searchLocation = async (query, limit = 1) => {
    if (!query.trim()) return null;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=${limit}&countrycodes=NG`
      );
      const data = await response.json();
      return data.length > 0
        ? {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            display_name: data[0].display_name,
          }
        : null;
    } catch (error) {
      console.error("Error searching location:", error);
      return null;
    }
  };

  // Function to fetch autocomplete suggestions
  const fetchSuggestions = async (query, type) => {
    if (!query.trim() || query.length < 3) {
      type === "from" ? setFromSuggestions([]) : setToSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&countrycodes=NG`
      );
      const data = await response.json();
      type === "from" ? setFromSuggestions(data) : setToSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle location search
  const handleLocationSearch = async (location, type) => {
    if (!map || !location.trim()) return;
    const result = await searchLocation(location);
    if (result) {
      const marker = L.marker([result.lat, result.lng], {
        icon: L.icon({
          iconUrl:
            type === "from"
              ? "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
              : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        }),
      })
        .addTo(map)
        .bindPopup(`${type === "from" ? "From" : "To"}: ${result.display_name}`)
        .openPopup();

      if (type === "from") {
        if (fromMarker) map.removeLayer(fromMarker);
        setFromMarker(marker);
      } else {
        if (toMarker) map.removeLayer(toMarker);
        setToMarker(marker);
      }

      map.setView([result.lat, result.lng], 13);
      type === "from" ? setFromSuggestions([]) : setToSuggestions([]);
    } else {
      alert("Location not found. Please try a different search term.");
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion, type) => {
    const location = suggestion.display_name;
    if (type === "from") {
      setFromLocation(location);
      handleLocationSearch(location, "from");
    } else {
      setToLocation(location);
      handleLocationSearch(location, "to");
    }
  };

  // Handle find routes
  const handleFindRoutes = async () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      alert("Please enter both starting location and destination.");
      return;
    }

    const [fromResult, toResult] = await Promise.all([
      searchLocation(fromLocation),
      searchLocation(toLocation),
    ]);

    if (fromResult && toResult && map) {
      if (fromMarker) map.removeLayer(fromMarker);
      if (toMarker) map.removeLayer(toMarker);
      if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);

      const startMarker = L.marker([fromResult.lat, fromResult.lng], {
        icon: L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        }),
      })
        .addTo(map)
        .bindPopup(`From: ${fromResult.display_name}`);

      const endMarker = L.marker([toResult.lat, toResult.lng], {
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        }),
      })
        .addTo(map)
        .bindPopup(`To: ${toResult.display_name}`);

      setFromMarker(startMarker);
      setToMarker(endMarker);

      // Simple polyline (replace with Openrouteservice for actual routing)
      const polyline = L.polyline(
        [
          [fromResult.lat, fromResult.lng],
          [toResult.lat, toResult.lng],
        ],
        { color: "#003366", weight: 4 }
      ).addTo(map);

      routeLayerRef.current = polyline;

      const group = new L.featureGroup([startMarker, endMarker]);
      map.fitBounds(group.getBounds().pad(0.1));
    } else {
      alert("One or both locations not found. Please try different search terms.");
    }
  };

  return (
    <main className="max-w-[1250px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-6 lg:py-6 items-center flex flex-col gap-8 overflow-x-hidden">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Our Features
      </h1>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 md:gap-6 lg:gap-8 w-full">
        {ourFeatures.map((updateFeatures, index) => (
          <div
            className="flex flex-col items-center text-center h-full gap-3 md:gap-4 lg:gap-6 py-6 md:py-8 lg:py-12 px-4 md:px-6 rounded-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105"
            key={index}
            style={{ background: updateFeatures.bg }}
          >
            <img
              src={updateFeatures.img}
              className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 object-contain"
              alt={`${updateFeatures.title} icon`}
            />
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
              {updateFeatures.title}
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {updateFeatures.description}
            </p>
          </div>
        ))}
      </div>

      {/* Location Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-10 w-full">
        <div className="relative w-full">
          <img
            src={loca}
            alt="Location icon"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 z-10"
          />
          <input
            type="text"
            placeholder="Search starting location..."
            value={fromLocation}
            onChange={(e) => {
              setFromLocation(e.target.value);
              fetchSuggestions(e.target.value, "from");
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLocationSearch(fromLocation, "from");
              }
            }}
            className="w-full pl-10 pr-4 py-3 md:py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all duration-200"
          />
          {fromSuggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {fromSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(suggestion, "from")}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative w-full">
          <img
            src={destination}
            alt="Destination icon"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 z-10"
          />
          <input
            type="text"
            placeholder="Search destination..."
            value={toLocation}
            onChange={(e) => {
              setToLocation(e.target.value);
              fetchSuggestions(e.target.value, "to");
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLocationSearch(toLocation, "to");
              }
            }}
            className="w-full pl-10 pr-4 py-3 md:py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all duration-200"
          />
          {toSuggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {toSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(suggestion, "to")}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Find Routes Button */}
      <button
        onClick={handleFindRoutes}
        className="bg-[#003366] hover:bg-[#001F4D] py-3 md:py-4 px-8 md:px-12 lg:px-16 text-white rounded-lg cursor-pointer font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-base md:text-lg"
      >
        Find routes
      </button>

      {/* Interactive Map */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <div
          ref={mapRef}
          className="w-full h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem]"
          style={{ minHeight: "300px" }}
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 w-full px-0 sm:px-4 md:px-6 lg:px-12">
        <button className="bg-[#003366] hover:bg-[#001F4D] py-2 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 group hover:shadow-lg hover:transform hover:scale-105">
          <img
            src={route}
            alt="Compare routes icon"
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Compare routes
          </span>
        </button>
        <button className="bg-[#003366] hover:bg-[#001F4D] py-2 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:shadow-lg hover:transform hover:scale-105">
          <img
            src={find}
            alt="Find parking icon"
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Find parking
          </span>
        </button>
        <button className="bg-[#003366] hover:bg-[#001F4D] py-2 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:shadow-lg hover:transform hover:scale-105">
          <img
            src={warning}
            alt="Traffic disruption icon"
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Disruptions
          </span>
        </button>
        <button className="bg-[#003366] hover:bg-[#001F4D] py-4 w-full text-white rounded-lg cursor-pointer shadow-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:shadow-lg hover:transform hover:scale-105">
          <img
            src={disallowed}
            alt="Report incident icon"
            className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-sm md:text-base lg:text-lg font-medium">
            Report Incident
          </span>
        </button>
      </div>
    </main>
  );
};

export default Features;