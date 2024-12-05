import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";
import React from "react";



const View = async ({ id }: { id: string }) => {
 

  try {

    const data = await client.withConfig({useCdn: false}).fetch(`*[_type == "startup" && _id == $id][0] { views }`, { id });

     
      

     

    if (!data) {
      return <p>Error: No data found.</p>; // Display an error message if no data is found
    }

    const { views: totalViews } = data;


   after(async () =>{
    await writeClient.patch(id).set({views: totalViews + 1}).commit()
   });

 
    return (
      <div className="view-container">
        <div className="absolute -top-2 -right-2">
          <div className="relative">
            <div className="absolute -left-4 top-1">
              <span className="flex size-[11px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
              </span>
            </div>
          </div>
        </div>
        <p className="view-text">
          <span className="font-black">`Views: ${totalViews}` </span>
        </p>
      </div>
    );
  } catch (error) {
    
    return <p>Error: Unable to fetch data.</p>; // Display a general error message
  }
};

export default View;
