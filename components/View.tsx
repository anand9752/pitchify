import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  try {
    const data = await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "startup" && _id == $id][0] { views }`,
      { id }
    );

    if (!data) {
      return <p>Error: No data found.</p>;
    }

    const { views: totalViews } = data;

    after(async () => {
      await writeClient.patch(id).set({ views: totalViews + 1 }).commit();
    });

    return (
      <div className="view-container">
        <p>Total Views: {totalViews}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching views:", error); // Log the error
    return <p>Error: Unable to fetch views.</p>;
  }
};

export default View;
