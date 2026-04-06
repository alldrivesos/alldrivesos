import { useRef, useState } from "react";
import { ScaleSpinner } from "../../lib/components/ui/Loading";
import Button from "../../lib/components/ui/Button";
import {
    createBlogComments,
    deleteBlogComments,
    editBlogComments,
    getBlogComments,
} from "../../lib/services/api/blogApi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TextInput, { InputType } from "../../lib/components/ui/TextInput";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import useDialog from "../../lib/hooks/useDialog";

export default function BlogComments({ id }: any) {
    const [isBusy, setIsBusy] = useState(false);
    const [editingComment, setEditingComment] = useState<any>(null); // Track comment being edited
    const [deletingComment, setDeletingComment] = useState<any>(null); // Track comment being deleted
    const queryClient = useQueryClient();

    const buttonRef = useRef<HTMLDivElement>(null);
    const { Dialog, setShowModal } = useDialog()


    const { data: blogComments } = useQuery({
        queryKey: ["getBlogComments", id],
        queryFn: () => getBlogComments(`${id}`),
    });

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            content: "",
        },
    });

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0]?.toUpperCase())
            .join("");
    };

    // Create or Update comment mutation
    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            return editingComment
                ? editBlogComments(editingComment.id, payload) // Update existing comment
                : createBlogComments(payload); // Create new comment
        },
        onSuccess: (response) => {
            setIsBusy(false);
            toast.success(response.message || "Comment saved!");
            reset();
            setEditingComment(null); // Exit edit mode
            queryClient.invalidateQueries({ queryKey: ["getBlogComments", id] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Something went wrong!");
            setIsBusy(false);
        },
    });

    // Delete comment mutation
    const deleteMutation = useMutation({
        mutationFn: (commentId: string) => deleteBlogComments(commentId),
        onSuccess: () => {
            toast.success("Comment deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["getBlogComments", id] });
            setShowModal(false)
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete comment.");
            setShowModal(false)
        },
    });

    // Handle form submission (create or update)
    const onSubmit = (data: any) => {
        setIsBusy(true);
        let payload = {};

        editingComment ?
            payload = {
                commentId: editingComment.id,
                content: data.content,
                published: true
            }
            :
            payload = {
                content: data.content,
                blogPostId: id,
            };
        mutation.mutate(payload);
    };

    // Handle edit button click
    const handleEdit = (comment: any) => {
        setEditingComment(comment);
        setValue("content", comment.content);

        // Scroll down to the buttons
        setTimeout(() => {
            buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    };

    // Handle delete button click
    const handleDelete = (comment: any) => {
        setShowModal(true);
        setDeletingComment(comment)
    };

    return (
        <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            <div className="space-y-4 mb-4">
                {blogComments?.data.map((comment: any) => (
                    <div key={comment.id} className="p-3 border rounded shadow-sm flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-700 font-bold rounded-full mr-3">
                                {getInitials(`${comment.commentor.fname} ${comment.commentor.lname}`)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">
                                    {comment.commentor.fname} {comment.commentor.lname}
                                </p>
                                <p className="text-gray-600">{comment.content}</p>
                                <p className="text-xs text-gray-400">
                                    {dayjs(comment.createdAt).format("MMMM D, YYYY [at] h:mm A")}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="text-black-500 hover:underline"
                                onClick={() => handleEdit(comment)}
                            >
                                <AiOutlineEdit size={18} />
                            </button>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => handleDelete(comment)}
                            >
                                <AiOutlineDelete size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form for adding or updating a comment */}
            <div className="mb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="content"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Please enter a comment",
                                },
                            }}
                            render={({ field }) => (
                                <TextInput
                                    label=""
                                    labelClassName="text-[#000000B2] fw-500"
                                    placeholder="Write a comment..."
                                    error={errors.content?.message}
                                    type={InputType.textarea}
                                    {...field}
                                    ref={null}
                                />
                            )}
                        />
                        <div ref={buttonRef} className="mt-8 w-full grid grid-cols-2 gap-4">
                            <Button
                                title={isBusy ? <ScaleSpinner size={14} color="white" /> : editingComment ? "Update Comment" : "Add Comment"}
                                disabled={!isValid || isBusy}
                                className="w-full"
                            />
                            {editingComment && (
                                <Button
                                    title="Cancel"
                                    onClick={() => {
                                        reset();
                                        setEditingComment(null);
                                    }}
                                    className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                />
                            )}
                        </div>
                    </div>
                </form>
            </div>


            <Dialog title="" size="sm">
                <div>
                    <p className="fw-500 text-center">Are you sure you want to delete this comment</p>
                    <div className="flex justify-between mt-10">
                        <Button
                            title="Cancel"
                            onClick={() => setShowModal(false)}
                            altClassName="px-6 py-2 fw-600 text-grad border rounded text-primary hover:scale-x-110 duration-100"
                        />
                        <Button
                            title="Delete"
                            altClassName="w-24 py-2 btn-primary hover:scale-x-110 duration-100"
                            onClick={() => deleteMutation.mutate(deletingComment.id)}
                        />
                    </div>
                </div>
            </Dialog>

        </div>
    );
}
