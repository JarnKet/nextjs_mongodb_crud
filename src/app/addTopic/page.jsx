"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const router = useRouter();

  const [topic, setTopic] = useState({
    title: "",
    description: "",
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

    if (!topic.title || !topic.description) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topic),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log("Failed to create topic", error);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full input input-bordered"
        onChange={handleChange}
        value={topic.title}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="w-full input input-bordered"
        onChange={handleChange}
        value={topic.description}
      />
      <button type="submit" className="btn btn-secondary">
        Add Topic
      </button>
    </form>
  );
}
