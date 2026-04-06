import GoogleMapReact from "google-map-react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GOOGLE_API_KEY } from "../../../../../services/constant";
import { getCityFromGoogle, getPostalCodeFromGoogle } from "../../../../../utils";
import { LocationProps } from "../ServiceSec";

interface Props {
  setValue: React.Dispatch<React.SetStateAction<LocationProps>>;
  close: () => void
}
const MapLocation: FC<Props> = ({ setValue, close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedPostal, setSelectedPostal] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [{ lat, lon }, setCordss] = useState({
    lat: 0,
    lon: 0,
  });
  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = () => {
    setIsBusy(true);
    const options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0,
    };
    if (!geolocationAPI) {
      toast.error("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setCordss({
            lat: coords.latitude,
            lon: coords.longitude,
          });
          setIsBusy(false);
        },
        (error) => {
          setIsBusy(false);
          console.log(error);
          toast.error("Something went wrong getting your position!");
        },
        options
      );
    }
  };
  useEffect(() => {
    getUserCoordinates();
  }, []);
  const defaultProps = {
    center: {
      lat: lat,
      lng: lon,
    },
    zoom: 16,
  };
  const onMapClick = (e: any) => {
    setCordss({
      lat: e.lat,
      lon: e.lng,
    });
    const payload = { latitude: e.lat as number, longitude: e.lng as number };
    fetchCoordinateDetailsWithGoogle(payload);
  };
  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: { lat: lat, lng: lon },
      map,
      title: "Hello World!",
    });
    return marker;
  };
  const fetchCoordinateDetailsWithGoogle = async (data: any) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}
      &location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_API_KEY}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      if (result) {
        setSelectedAddress(result?.results[0].formatted_address);
        setSelectedCity(getCityFromGoogle(result?.results[0].address_components))
        setSelectedPostal(
          getPostalCodeFromGoogle(result?.results[0].address_components)
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const selectAddress = () => {
    setValue({
      location: selectedAddress,
      latitude: String(lat),
      longitude: String(lon),
      postal: selectedPostal,
      city: selectedCity,
      state: "", // Add logic to fetch or set the state if available
    });
    close()
  }

  return (
    <>
      <div className="h-[450px]">
        <div style={{ height: "100%", width: "100%" }}>
          {!isBusy && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              onClick={onMapClick}
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
            </GoogleMapReact>
          )}
        </div>
      </div>
      {selectedAddress && <div className="bg-blue-gray-50 p-2 rounded-;g">
        <p className="fw-500">{selectedAddress}</p>
        <p onClick={() => selectAddress()} className="fw-600 text-green-600 cursor-pointer">Set as Selected Address</p></div>}
    </>
  );
};

export default MapLocation;
