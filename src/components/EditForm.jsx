"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ id, title, description }) {
  const router = useRouter();

  const [topic, setTopic] = useState({
    newTitle: title,
    newDescription: description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.newTitle || !topic.newDescription) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topic),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log("Failed to edit topic", error);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="newTitle"
        value={topic.newTitle}
        type="text"
        placeholder="Title"
        className="w-full input input-bordered"
        onChange={handleChange}
      />
      <input
        name="newDescription"
        value={topic.newDescription}
        type="text"
        placeholder="Description"
        className="w-full input input-bordered"
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-secondary">
        Edit Topic
      </button>
    </form>
  );
}
