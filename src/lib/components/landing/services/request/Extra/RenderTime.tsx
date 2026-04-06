import { FC } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 10;

const timerProps = {
  size: 190,
  strokeWidth: 10,
};

const renderTime = (dimension: any, time: any) => {
  return (
    <div className="time-wrapper">
      <div className="text-3xl fw-600 text-center">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time: any) => (minuteSeconds - time) | 0;
interface Props {
  play: boolean;
  action: () => void;
}
const RenderTimer: FC<Props> = ({ play, action }) => {
  return (
    <div className="py-12 lg:py-24">
      <div className="flex justify-center">
        <CountdownCircleTimer
          {...timerProps}
          isPlaying={play}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[100, 50, 20, 0]}
          duration={minuteSeconds}
          // initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={() => action()}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("seconds", getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
      <p className="mt-4 fs-500 fw-500 text-center italics">
        Fetching nearby service providers, please wait...
      </p>
    </div>
  );
};

export default RenderTimer;
