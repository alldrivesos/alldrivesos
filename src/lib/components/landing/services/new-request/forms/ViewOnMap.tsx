import { useCallback, useEffect, useState } from "react";
import { useLocation } from "../../request/ServiceSec";
import { Vendor } from "./new-provider-list";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import GoogleMapReact from "google-map-react";
import { User } from "lucide-react";
import { useServiceSec } from "../../../../../../pages/user/components/request-comps/service-sec";

interface VendorData {
  id: string;
  user_id: string;
  brands: string[];
  service_rendered: {
    id: string;
    fee: number;
  }[];
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  service_area: string;
  fees: any;
  isVerified: boolean;
  reason: string;
  car_description: string;
  plate_number: string;
  longitude: string;
  latitude: string;
  zipcode: string;
  city: string;
  stripeAccountId: string;
  identityFront: string;
  identityBack: string;
  identityFrontId: string;
  identityBackId: string;
  cityOfResidence: string;
  state: string;
  dob: string;
  ssn_last_4: string;
  device_ip: string;
  phone_number: string;
  location_status: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  location_last_updated: string;
  createdAt: string;
  updatedAt: string;
  distance_in_km: number;
  profile: {
    id: string;
    fname: string;
    lname: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    sms_opt_in: boolean;
    password: string;
    isActive: boolean;
    isSuspended: boolean;
    photo: any;
    hasActiveSubscription: any;
    isAvailableForService: any;
    verified: boolean;
    expiredAt: any;
    planId: any;
    token: any;
    state: string;
    city: string;
    zipcode: string;
    street: any;
    userType: string;
    level: number;
    referralId: any;
    invitationId: string;
    companyId: string;
    reviewsAvg: number;
    serviceCharge: any;
    last_login: string;
    fcmToken: string;
    walletBal: string;
    pendingBal: string;
    referralSource: any;
    driverOverallPendingBal: string;
    driverOverallWalletBal: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  };
}
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
export default function ViewOnMap({
  vendor,
  close,
}: {
  vendor?: VendorData;
  close: () => void;
}) {
  const [service, setService] = useServiceSec();
  const location = {
    latitude: service?.data?.serviceRequest.latitude,
    longitude: service?.data?.serviceRequest.longitude,
  };
  const lat = parseFloat(location?.latitude as unknown as any);
  const lng = parseFloat(location?.longitude as unknown as any);
  const new_center = {
    lat: lat || center.lat,
    lng: lng || center.lng,
  };
  const [map, setMap] = useState(null);
  const vendor_positon = {
    lat: parseFloat(vendor?.latitude),
    lng: parseFloat(vendor?.longitude),
  };
  // return <></>;
  const renderCustomPin = () => {
    return (
      <>
        <div className="flex items-center flex-col gap-2 relative">
          <div className="bg-red-500 shadow-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <User />
          </div>
          <div className="absolute -bottom-10 rounded-md  bg-primary text-white p-2 text-xs round-ded w-fit whitespace-nowrap ">
            Your Location
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="fixed top-0  h-screen w-screen  bg-black/50 backdrop-blur-sm z-20 grid place-items-center">
      <div className="flex w-full max-w-xl flex-col bg-white rounded">
        <button
          onClick={close}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        {/*{JSON.stringify(new_center)}*/}
        <div className="w-full flex-1   flex bg-white p-4 max-w-xl rounded-md min-h-[520px]">
          <div className="flex-1">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY}>
              <Map
                defaultCenter={vendor_positon}
                defaultZoom={12}
                mapId="DEMO_MAP_ID"
              >
                <AdvancedMarker position={new_center}>
                  {renderCustomPin()}
                </AdvancedMarker>
                <AdvancedMarker position={vendor_positon} className="0" />
                <Directions origin={new_center} destination={vendor_positon} />
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

function Directions({
  origin,
  destination,
}: {
  origin: any;
  destination: any;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        draggable: true, // Only necessary for draggable markers
        map,
      }),
    );
  }, [routesLibrary, map]);

  // Add the following useEffect to make markers draggable
  useEffect(() => {
    if (!directionsRenderer) return;

    // Add the listener to update routes when directions change
    const listener = directionsRenderer.addListener(
      "directions_changed",
      () => {
        const result = directionsRenderer.getDirections();
        if (result) {
          setRoutes(result.routes);
        }
      },
    );

    return () => google.maps.event.removeListener(listener);
  }, [directionsRenderer]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, origin, destination]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
