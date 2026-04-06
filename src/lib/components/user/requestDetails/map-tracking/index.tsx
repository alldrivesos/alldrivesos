import { FC, useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../../../../services/constant";
import { GiPathDistance } from "react-icons/gi";
import { BiTimer } from "react-icons/bi";
import { getJustNumbers2 } from "../../../../utils";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface Props {
  close: () => void;
  socket: any;
  id: string;
  lat: string;
  lng: string;
  driverLat: string;
  driverLng: string;
  miles: string;
  time: string;
}

const DriverMapTracking: FC<Props> = ({
  id,
  socket,
  lat,
  lng,
  driverLat,
  driverLng,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const [myLocation, setMyLocation] = useState<any>();
  const [directionResponse, setDirectionResponse] = useState<any>();
  const [distance, setDistance] = useState<string | undefined>("");
  const [duration, setDuration] = useState<string | undefined>("");

  const calculateDistance = async () => {
    const directionService = new google.maps.DirectionsService();
    const start = new google.maps.LatLng(markes[0].lat, markes[0].lng);
    const end = new google.maps.LatLng(markes[1].lat, markes[1].lng);
    const results = await directionService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance?.text);
    setDuration(results.routes[0].legs[0].duration?.text);
  };

  const [markes, setMarkes] = useState([
    {
      lat: Number(lat),
      lng: Number(lng),
    },
    {
      lat: Number(driverLat),
      lng: Number(driverLng),
    },
  ]);

  useEffect(() => {
    socket.emit("tracked_location", {
      serviceRequestId: id,
    });
    socket.emit("join_room", id);
  }, []);

  const getNewLocation = () => {
    socket.on("location", (...args: any) => {
      // console.log(args, "args");
      setMyLocation(args.slice(-1)[0]?.data);
    });

    return () => {
      socket.off("location");
    };
  };

  useEffect(() => {
    getNewLocation();
  }, [socket]);

  useEffect(() => {
    if (myLocation) {
      const payload = {
        lat: Number(myLocation.driver?.latitude),
        lng: Number(myLocation.driver?.longitude),
      };
      setMarkes([markes[0], payload]);
    }
  }, [myLocation]);

  useEffect(() => {
    calculateDistance();
  }, [myLocation, markes]);

  const defaultProps = {
    center: {
      lat: Number(lat),
      lng: Number(lng),
    },
    zoom: 14,
  };

  return (
    <div>
      <div className="h-[450px]">
        <div style={{ height: "100%", width: "100%" }}>
          {isLoaded && (
            <GoogleMap
              center={defaultProps.center}
              zoom={defaultProps.zoom}
              options={{
                gestureHandling:'greedy',
                streetViewControl:false,
              }}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker position={{ lat: markes[0]?.lat, lng: markes[0]?.lng }} />
              <Marker
                position={{ lat: markes[1]?.lat, lng: markes[1]?.lng }}
                icon={{
                  url: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1718965767/rsh/top_view-removebg-preview_1_xj6b9a.png",
                  scaledSize: { equals: () => true, height: 60, width: 35 },
                  anchor: new window.google.maps.Point(markes[0]?.lat, markes[0]?.lat),
                  rotation: 40
                }}
              />
              {directionResponse && (
                <DirectionsRenderer
                  directions={directionResponse}
                  options={{
                    polylineOptions: {
                      strokeColor: "blue",
                      strokeOpacity: 60,
                      strokeWeight: 5,
                    },
                    suppressMarkers: true,
                  }}
                />
              )}
            </GoogleMap>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-x-2 items-center">
          <GiPathDistance className="text-xl lg:text-3xl" />
          <p className="fw-600 lg:text-xl">{getJustNumbers2(distance)} Miles</p>
          <p>from your location.</p>
        </div>
        <div className="mt-1 lg:mt-2 flex gap-x-2 items-center">
          <BiTimer className="text-xl lg:text-3xl" />
          <div>
            <p className="inline-block">Service provider will get to you in</p>
            <p className="inline-block fw-600 lg:text-xl pl-1 lg:pl-2">{" "}{duration}.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverMapTracking;
