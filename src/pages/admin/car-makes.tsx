import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/services/api/serviceApi";
import { Button, Checkbox } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { BiEdit, BiX } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import useModal from "../../lib/hooks/useModal";
interface Main_Response {
  data: {
    name: string;
    id: string;
    active: boolean;
  }[];
}
export default function CarMakes() {
  const edit_mutate = useMutation({
    mutationFn: async () => {
      const response = await apiClient.put(`/vehicle/carmake/${edit_id.id}`, {
        ...edit_id,
      });
      return response.data;
    },
    onSuccess: (e) => {
      toast.success("success");
      car_makes.refetch();
      setEditOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const car_mutate = useMutation({
    mutationFn: async (data: { name: string }) => {
      const response = await apiClient.post("/vehicle/carmake", data);
      return response.data;
    },
    onSuccess: (e) => {
      toast.success("success");
      car_makes.refetch();
      setAddOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [car_make, setCarMake] = useState("");
  const [edit_id, setEditId] = useState({
    name: "",
    id: "",
  });
  const setEdit = (item: any) => {
    setEditId(item);
    setAddOpen(false);
    setEditOpen(true);
  };
  const [page_params, setPageParams] = useState({
    page: 1,
    limit: 10,
  });
  const car_makes = useQuery<Main_Response>({
    queryKey: ["car-makes", page_params],
    queryFn: async () => {
      const response = await apiClient.get("/carmakes/", {
        params: page_params,
      });
      return response.data;
    },
  });
  const [isEditOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="text-2xl font-bold">Car Makes</div>
        <Button onClick={() => setAddOpen(true)} className="ml-auto">
          Add Car
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {car_makes.data?.data?.map((make: any) => {
          return (
            <CarMakeCard
              setEdit={setEdit}
              key={make.id}
              item={make}
              refetch={car_makes.refetch}
            />
          );
        })}

        <div className="w-full py-2 bg-white justify-center flex items-center gap-2">
          <Button
            disabled={car_makes.isPending || page_params.page <= 1}
            size="sm"
            onClick={() => {
              if (page_params.page > 1) {
                setPageParams({ ...page_params, page: page_params.page - 1 });
              }
            }}
          >
            prev
          </Button>
          <div className=" py-2 ">Page: {page_params.page}</div>
          <Button
            size="sm"
            disabled={
              car_makes.isPending ||
              car_makes.data?.data?.length < page_params.limit
            }
            onClick={() => {
              if (car_makes.data?.data.length == page_params.limit) {
                console.log("Reached limit");
                setPageParams({ ...page_params, page: page_params.page + 1 });
                return;
              }
              return;
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <dialog
        open={isEditOpen}
        aria-modal
        className="top-0 z-20 bg-transparent fixed"
      >
        <div className="h-screen w-screen grid place-items-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm shadow-2xl p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center">
              <h2 className="text-3xl mx-auto font-extrabold text-center text-primary">
                Edit Car
              </h2>

              <button className="" onClick={() => setEditOpen(false)}>
                <BiX size={32} />
              </button>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Quickly add new car makes to your collection.
            </p>
            <input
              value={edit_id.name}
              onChange={(e) =>
                setEditId((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              placeholder="Enter new car make name"
              className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            />
            <Button
              fullWidth
              onClick={(e) => {
                edit_mutate.mutate();
              }}
              disabled={edit_mutate.isPending}
              className="mt-2 text-lg font-bold shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
            >
              {car_mutate.isPending ? "Edit..." : "Edit Car"}
            </Button>
          </div>
        </div>
      </dialog>
      <dialog
        open={addOpen}
        // ref={addRef}
        aria-modal
        className="top-0 z-20 bg-transparent fixed"
      >
        <div className="h-screen w-screen grid place-items-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm shadow-2xl p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center">
              <h2 className="text-3xl mx-auto font-extrabold text-center text-primary">
                Add Car
              </h2>
              <button className="" onClick={() => setAddOpen(false)}>
                <BiX size={32} />
              </button>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Quickly add new car makes to your collection.
            </p>
            <input
              value={car_make}
              onChange={(e) => setCarMake(e.target.value)}
              type="text"
              placeholder="Enter new car make name"
              className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            />
            <Button
              fullWidth
              onClick={(e) => {
                if (!car_make.trim())
                  return toast.error("name cannot be empty");
                car_mutate.mutate({
                  name: car_make,
                });
              }}
              disabled={car_mutate.isPending}
              className="mt-2 text-lg font-bold shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
            >
              {car_mutate.isPending ? "Adding..." : "Add Car"}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
interface Props {
  item: {
    id: string;
    name: string;
    active: boolean;
  };
  refetch: () => void;
  setEdit: (item: any) => any;
}
const CarMakeCard = ({ item, refetch, setEdit }: Props) => {
  const del_car = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.delete(`vehicle/carmake/${item.id}`);
      refetch();
      return resp.data;
    },
  });
  const change_state = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.put(`vehicle/carmake/${item.id}`, {
        name: item.name,
        active: !item.active,
      });
      refetch();
      return resp.data;
    },
  });
  return (
    <>
      <div className="p-4 flex items-center shadow-md bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
        <div className="flex items-center gap-3 ml-auto">
          {/* Status Indicator / Toggle */}
          <div
            onClick={() => change_state.mutate()}
            className="flex items-center cursor-pointer"
            title={item.active ? "Deactivate" : "Activate"}
          >
            {change_state.isPending ? (
              <VscLoading className="animate-spin text-blue-500 text-xl" />
            ) : (
              <Checkbox
                checked={item.active}
                disabled={change_state.isPending}
                color={item.active ? "green" : "blue"}
                className="h-5 w-5 rounded-full border-gray-400 transition-colors duration-200"
              />
            )}
          </div>

          {/* Edit Button */}
          <Button
            size="sm"
            onClick={() => setEdit(item)}
            className="p-2 bg-blue-500 hover:bg-blue-600 shadow-none hover:shadow-none transition-all duration-200"
          >
            <BiEdit className="text-lg" />
          </Button>

          {/* Delete Button */}
          <Button
            size="sm"
            disabled={del_car.isPending}
            onClick={async () => {
              toast.promise(del_car.mutateAsync(), {
                pending: "Deleting...",
                success: "Deleted!",
                error: "Failed to delete",
              });
            }}
            className="p-2 bg-red-500 hover:bg-red-600 shadow-none hover:shadow-none transition-all duration-200"
          >
            {del_car.isPending ? (
              <VscLoading className="animate-spin text-lg" />
            ) : (
              <MdDelete className="text-lg" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
