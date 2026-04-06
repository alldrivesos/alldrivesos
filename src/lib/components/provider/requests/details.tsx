import { FC } from "react";
import ServiceProgress from "./details-comp/ServiceProgress";
import UserInfo from "./details-comp/UserInfo";
import { ServiceRequestItem2 } from "../../../types/service";

interface Props {
  data: ServiceRequestItem2;
}
const RequestDetailsIndex: FC<Props> = ({ data }) => {
  return (
    <div>
      <div>
        <ServiceProgress status={data.status} query={data.queryNote} />
      </div>
      <div>
        <UserInfo data={data} />
      </div>
    </div>
  );
};

export default RequestDetailsIndex;
