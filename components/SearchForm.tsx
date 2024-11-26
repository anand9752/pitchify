import Form from "next/form"
import SearchFormReset from "./SearchFormReset"
import { Search} from "lucide-react"
const SearchForm = ({query}:{ query? :string }) => {

  return (
    <Form action="/" scroll = {false} className="search-form">
        <input 
          name="query"
          defaultValue={query || ""} // Fallback for empty state
          className="search-input"
          placeholder="Search Startups"
/>

         <div className="flex gap-2">
            {query?.length!==0 &&  <SearchFormReset/> }

            <button className="search-btn text-white" type="submit">
                <Search className=" size-5"/>
            </button>
             
         </div>
    </Form>
  )
}

export default SearchForm