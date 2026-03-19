import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL } from "../api/api";

function AddressSearch({ value = "", onSelect }) {
  const token = localStorage.getItem("token");

  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // debounce to limit fetch
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 3) {
        fetchAddress(query);
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchAddress = async (value) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/locations/autocomplete?text=${encodeURIComponent(value)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      setSuggestions(data.features || []);
      setShowDropdown(true);
    } catch (err) {
      console.error("Address search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    const input = item.properties;

    const location = {
      city: input.city || input.town || "",
      country: input.country,
      latitude: input.lat,
      longitude: input.lon,
    };

    onSelect(location, input.formatted);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="position-relative">
      <Form.Control
        type="text"
        placeholder="Search city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown && suggestions.length > 0 && (
        <div className="autocomplete-list">
          {suggestions
            .filter((item) => item?.properties)
            .map((item) => (
              <div
                key={item.properties.place_id}
                className="autocomplete-item"
                onClick={() => handleSelect(item)}
              >
                {item.properties.formatted}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AddressSearch;
