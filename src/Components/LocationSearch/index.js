import React, { useState } from "react";
import { Input } from "reactstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "./style";

const LocationSearch = (props) => {
  const [address, setAddress] = useState(props.address);

  const handleAddress = (address) => {
    setAddress(address);
    props.setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    props.setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => props.setLatLng(latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <Wrapper>
      <PlacesAutocomplete
        value={address}
        onChange={handleAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="position-relative">
            <Input
              {...getInputProps({
                placeholder: "Enter Location",
                className: "position-relative",
              })}
              required
            />
            <div className="autocomplete-suggestion">
              {loading && (
                <div className="autocomplete-suggestion-item">Loading...</div>
              )}
              {suggestions.map((suggestion, idx) => {
                const className = `autocomplete-suggestion-item ${suggestion.active}
                  ? "suggestion-item--active"
                  : "suggestion-item"`;
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={idx}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </Wrapper>
  );
};

export default LocationSearch;
