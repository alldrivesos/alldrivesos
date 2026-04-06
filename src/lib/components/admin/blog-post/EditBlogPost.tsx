import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import ImageInput from "../../ui/ImageInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadFile } from "../../../services/api/routineApi";
import { toast } from "react-toastify";
import { editBlog, getBlogCategory } from "../../../services/api/blogApi";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUpDouble } from "react-icons/tb";

interface Props {
  item: any;
}
const EditBlogPost: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { data: category } = useQuery({
    queryKey: ["getBlogCat"],
    queryFn: getBlogCategory,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [imageValue, setImageValue] = useState<Array<File>>();
  const [descInput, setDescInput] = useState<string>(item.body || "");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categoryId: item.categoryId || "",
      title: item.title || "",
      body: item.body || "",
      coverImage: item.coverImage || "",
      published: item.Published,
    },
  });

  const addCat = useMutation({
    mutationFn: editBlog,
    onSuccess: () => {
      toast.success("Blog Post Edited Successfuly");
      setIsBusy(false);
      close();
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
            categoryId: datas.categoryId,
            title: datas.title,
            body: descInput,
            coverImage: data[0],
            published: item.Published,
            id: item.id,
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
        categoryId: datas.categoryId,
        title: datas.title,
        body: descInput,
        coverImage: item.coverImage,
        published: item.Published,
        id: item.id,
      };
      addCat.mutate(payload);
    }
  };
  return (
    <>
      <div className="mt-3 px-2">
        <div className="mb-3">
          <TbArrowBackUpDouble
            className="text-xl cursor-pointer"
            onClick={() => navigate("/admin/blog")}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="grid lg:grid-cols-2 gap-5 items-end">
              <Controller
                name="title"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter post title",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Blog Title"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.title?.message}
                    type={InputType.text}
                    {...field}
                    ref={null}
                  />
                )}
              />
              <Controller
                name="categoryId"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select a category",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <p className="text-[#000000B2] fw-500 mb-1">
                      Blog Category
                    </p>
                    <select
                      {...field}
                      className="border border-gray-400 rounded p-[10px] w-full outline-none"
                    >
                      <option value="">Select an option</option>
                      {category &&
                        !!category?.data?.length &&
                        category?.data?.map((item: any, i: number) => (
                          <option value={item.id} key={i}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              />
            </div>
            <div>
              <div className="mt-6 mb-16">
                <p className="text-[#000000B2] fw-500 mb-1">Description</p>
                <ReactQuill
                  theme="snow"
                  value={descInput}
                  onChange={setDescInput}
                  className="h-28 nunito"
                />
              </div>
            </div>
            <div className="lg:flex items-end gap-x-4">
              <div className="lg:w-9/12">
                <ImageInput
                  label="Blog Post Image"
                  setImage={setImageValue}
                  containerClass="mt-5"
                  prevValue={item?.icon}
                  disabled={false}
                />
              </div>
              <div className="lg:w-3/12">
                <img
                  src={item.coverImage}
                  alt="post-image"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-end">
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

export default EditBlogPost;
