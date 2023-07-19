"use client";

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this topic?");

    if (confirmed) {
      const res = await fetch(`/api/topics/?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        throw new Error(await res.text());
      }
    }
  };

  return (
    <button type="button" className="text-error" onClick={handleRemove}>
      <HiOutlineTrash size={24} />
    </button>
  );
}
