import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "../../../services/constant";
import { MapPin } from "lucide-react";

const Marker = ({ lat, lng }: { lat: number; lng: number }) => (
  <div
    style={{
      backgroundColor: "red",
      border: "2px solid white",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div className="grid place-items-center flex-1 text-white/90">
      <MapPin size={18} />
    </div>
  </div>
);

const MapComponent = () => {
  const defaultProps = {
    center: {
      lat: 39.016,
      lng: -76.981,
    },
    zoom: 12,
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default MapComponent;
