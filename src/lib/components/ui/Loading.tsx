import { BeatLoader, PropagateLoader } from "react-spinners";

export const ScaleSpinner = ({
  size,
  color,
}: {
  size?: number;
  color: string;
}) => {
  const override: any = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    padding: "3px 0px 22px",
  };
  return (
    <PropagateLoader
      color={color}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export const FadeSpinner = ({
    size,
    color,
  }: {
    size?: number;
    color: string;
  }) => {
    return (
      <BeatLoader
        color={color}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  };