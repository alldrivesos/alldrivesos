import AdminCompletedService from "../../lib/components/admin/services/CompletedList";

const AdminRenderedServices = () => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <p className="fw-600 text-xl">Completed Service Requests</p>
        <div className="mt-5 lg:mt-10">
          <AdminCompletedService status="completed"/>
        </div>
      </div>
    </>
  );
};

export default AdminRenderedServices;
