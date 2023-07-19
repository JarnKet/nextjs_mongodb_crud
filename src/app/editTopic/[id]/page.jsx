import EditForm from "@/components/EditForm";

const apiURL = process.env.API_URL;

async function getTopicByID(id) {
  try {
    const res = await fetch(`${apiURL}/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load data");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading data", error);
  }
}

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicByID(id);

  const { title, description } = topic;

  return (
    <>
      <EditForm {...{ id, title, description }} />
    </>
  );
}
