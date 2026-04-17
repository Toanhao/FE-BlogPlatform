import NewPostForm from "./new-post-form";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Tạo bài viết mới</h1>
      <NewPostForm />
    </div>
  );
}
