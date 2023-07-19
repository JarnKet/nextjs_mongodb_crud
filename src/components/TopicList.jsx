import { HiOutlinePencil } from "react-icons/hi";
import RemoveButton from "./RemoveButton";
import Link from "next/link";

const apiURL = process.env.API_URL;

const getTopic = async () => {
  try {
    const res = await fetch(`${apiURL}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load data");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading data", error);
  }
};

export default async function TopicList() {
  const { topics } = await getTopic();

  return (
    <div className="flex flex-col gap-y-4">
      {topics?.map((topic) => (
        <div
          key={topic._id}
          className="w-full p-8 rounded-full shadow-lg flexBetween bg-base-300"
        >
          <div>
            <h3 className="text-lg font-bold">{topic.title}</h3>
            <small>{topic.description}</small>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <Link href={`editTopic/${topic._id}`}>
              <HiOutlinePencil size={24} />
            </Link>
            <RemoveButton id={topic._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
