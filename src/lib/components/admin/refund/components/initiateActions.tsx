import { FC, useRef } from "react";
import Button from "../../../ui/Button";
import useDialog from "../../../../hooks/useDialog";
import ApproveRefund from "./modals/approve-refund";
import DisapproveModal from "./modals/disapprove-refund";
import AdminModal from "./modals/query-refund";
interface Props {
  id: string;
  status: string;
  refetch: () => void;
  item: any;
}
const InitiateActions: FC<Props> = ({ id, status, refetch, item }) => {
  const { Dialog: Query, setShowModal: ShowQuery } = useDialog();
  const { Dialog: Approve, setShowModal: ShowApprove } = useDialog();
  const { Dialog: Decline, setShowModal: ShowDecline } = useDialog();
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div>
        <div className="fw-600 flex gap-x-3">
          {/*<Button
            title={"View Query"}
            onClick={() => ShowQuery(true)}
            altClassName="py-2 px-5 btn-primary"
          />*/}
          <Button
            title={"Initiate"}
            onClick={() => ShowApprove(true)}
            altClassName="py-2 px-5 btn-primary bg-green-600"
          />
          {/*{status === "pending" && (
            <>
              // <Button
              //   title={"Initiate"}
              //   onClick={() => ShowApprove(true)}
              //   altClassName="py-2 px-5 btn-primary bg-green-600"
              // />
              <Button
                title={"Decline"}
                onClick={() => ShowDecline(true)}
                altClassName="py-2 px-5 btn-primary bg-red-600"
              />
            </>
          )}*/}
        </div>
      </div>
      <Query
        title="Query Refund"
        size="md"
        close={() => dialogRef.current?.close()}
      >
        <AdminModal
          item={item}
          id={id}
          status={status}
          refetch={refetch}
          close={() => ShowQuery(false)}
          // close={() => dialogRef.current?.close()}
        />
      </Query>
      <Approve title="Inititate Refund" size="md">
        <ApproveRefund
          id={id}
          status={status}
          refetch={refetch}
          close={() => ShowApprove(false)}
        />
      </Approve>
      <Decline title="Decline Refund" size="md">
        <DisapproveModal
          id={id}
          refetch={refetch}
          close={() => ShowDecline(false)}
        />
      </Decline>
    </>
  );
};

export default InitiateActions;
