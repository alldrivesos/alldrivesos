import { FC, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import MapLocation from "./MapLocation";
import { GOOGLE_API_KEY } from "../../../../../services/constant";
import {
  getCityFromGoogle,
  getPostalCodeFromGoogle,
  getStateFromGoogle,
} from "../../../../../utils";
import useCustomModal from "../../../../../hooks/useCustomModal";
import { LocationProps } from "../ServiceSec";

interface Props {
  setValue: React.Dispatch<React.SetStateAction<LocationProps>>;
}
const GetCurrentLocation: FC<Props> = ({ setValue }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog, setShowModal } = useCustomModal();
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
          fetchCoordinateDetailsWithGoogle(coords);
        },
        (error) => {
          setIsBusy(false);
          console.log(error);
          toast.error("Something went wrong getting your position!");
        },
        options,
      );
    }
  };

  const fetchCoordinateDetailsWithGoogle = async (
    data: GeolocationCoordinates,
  ) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}
      &location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_API_KEY}`,
        {
          method: "GET",
        },
      );

      const result = await response.json();
      if (result) {
        if (result?.results[0]?.formatted_address) {
          toast.success("Nearest Location Fetched");
        }
        setIsBusy(false);
        console.log(result);
        setValue({
          location: result?.results[0]?.formatted_address,
          postal: getPostalCodeFromGoogle(
            result?.results[0].address_components,
          ),
          latitude: String(data.latitude),
          longitude: String(data.longitude),
          city: getCityFromGoogle(result?.results[0].address_components),
          state: getStateFromGoogle(result?.results[0].address_components),
        });
      }
    } catch (error: any) {
      setIsBusy(false);
      toast.error("Cannot get current location, use the map");
    }
  };

  return (
    <>
      <div className="grid gap-y-2 lg:flex items-center gap-x-6">
        <p
          className="flex gap-x-1 items-center fw-600 cursor-pointer"
          onClick={getUserCoordinates}
        >
          <FaMapMarkerAlt /> Get Current Location
        </p>
        <p
          className="flex gap-x-1 items-center fw-600 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaMapLocationDot /> Open Map
        </p>
      </div>
      {isBusy && (
        <div className="fixed top-0 left-0 place-center z-[30000] opacity-50 w-screen h-screen bg-white ">
          <BeatLoader size={34} />
        </div>
      )}
      <Dialog title="" size="lg">
        <MapLocation setValue={setValue} close={() => setShowModal(false)} />
      </Dialog>
    </>
  );
};

export default GetCurrentLocation;
