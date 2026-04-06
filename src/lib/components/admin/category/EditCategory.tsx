import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import ImageInput from "../../ui/ImageInput";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../../services/api/routineApi";
import { toast } from "react-toastify";
import { editCategory } from "../../../services/api/serviceApi";
import { ServiceCatItem } from "../../../types/service";

interface Props {
  close: () => void;
  refetch: () => void;
  item: ServiceCatItem | undefined;
}
const EditCategory: FC<Props> = ({ close, item, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [imageValue, setImageValue] = useState<Array<File>>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: item?.name || "",
      image: item?.icon || "",
      pricing: item?.slug || "",
      questionNote: item?.questionNote || ""
    },
  });
  const addCat = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      toast.success("Category Edited Successfuly");
      setIsBusy(false);
      close()
      refetch()
    },
    onError: (error) => {
      toast.error(error.message);
      setIsBusy(false);
    },
  });
  const upload = useMutation({
    mutationFn: uploadFile,
  });
  const onSubmit = (datas: any) => {
    setIsBusy(true);
    if (imageValue) {
      const fd = new FormData();
      fd.append("image", imageValue[0]);
      upload.mutateAsync(fd, {
        onSuccess: (data) => {
          const payload = {
            name: datas.name,
            icon: data[0],
            slug: datas.pricing,
            id: item?.id,
            minimumQuote: datas.pricing,
            questionNote: datas.questionNote,
          };
          addCat.mutate(payload);
        },
        onError: (error) => {
          toast.error(error.message);
          setIsBusy(false);
        },
      });
    } else {
      const payload = {
        name: datas.name,
        icon: item?.icon,
        slug: datas.pricing,
        id: item?.id,
        questionNote: datas?.questionNote
      };
      addCat.mutate(payload);
    }
  };
  return (
    <>
      <div className="mt-6 px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[350px] overflow-auto pr-2">
          <div className="grid lg:grid-cols-2 gap-5">
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter category name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Category Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="pricing"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter category pricing",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Basic Pricing"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.pricing?.message}
                  type={InputType.tel}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
          <div>
          <Controller
              name="questionNote"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a service question",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Service Question"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.questionNote?.message}
                  altClassName="h-16 rounded p-2 w-full outline-none text-black"
                  type={InputType.textarea}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
          <div>
            <ImageInput
              label="Service Category Image"
              setImage={setImageValue}
              containerClass="mt-5"
              prevValue={item?.icon}
              disabled={false}
            />
          </div>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-full">
              <Button
                title={
                  isBusy ? <ScaleSpinner size={14} color="white" /> : "Update"
                }
                disabled={!isValid}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
