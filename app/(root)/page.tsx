
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType} from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/quries";
import { sanityFetch,SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";



export default async function Home(
  {searchParams}:{searchParams :Promise<{query?:string}>}
) {
  const query =   (await searchParams).query || "";// Safely access `query` with a fallback
  const params =  {search:query ||null};
   
  const session = await auth();
  
  



const {data:posts}=  await sanityFetch({
  query: STARTUPS_QUERY, // Fix: Pass STARTUPS_QUERY as `query`
  params // Add params if needed, otherwise keep it empty
});
  // const posts =  await client.fetch(STARTUPS_QUERY);




  


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup,<br />Connect With Entrepreneurs</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} /> 
      </section>


      <section className="section_container">

        <p className=" text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}

        </p>

        <ul className=" mt-7 card_grid">
            { posts?.length > 0 ? (
              posts.map( (post:StartupCardType) =>(
                <StartupCard key={post?._id} post={post}/>
              ))
            ):(
              <p className="no-results">No Startup Found</p>
            )}
           </ul>
      </section>
      <SanityLive/>
    </>
  );
}
