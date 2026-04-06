import { FC } from "react";
import { ServiceRequestItem2 } from "../../../../types/service";
import ServiceProgress from "../../../provider/requests/details-comp/ServiceProgress";
import UserInfo from "../../../provider/requests/details-comp/UserInfo";
import AdminServiceInfo from "../AdminServiceInfo";

interface Props {
  data: ServiceRequestItem2;
}
const AdminServiceDetailsIndex: FC<Props> = ({ data }) => {
  // return <>{JSON.stringify(data)}</>;
  return (
    <div>
      <div>
        <div>
          <ServiceProgress status={data.status} query={data.queryNote} />
        </div>
        <div>
          <AdminServiceInfo data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminServiceDetailsIndex;
