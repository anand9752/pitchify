'use client'
import Link from "next/link"
import { X } from "lucide-react"


const SearchFormReset = () => {

    const reset = () =>{
        const form = document.querySelector(".search-form") as HTMLFormElement

        if(form){ form.reset()};

    }
  return (
    <button type="reset" onClick={reset} >
        <Link className="search-btn text-white" href="/">
          <X className='size-5'></X>
        </Link>
    </button>
  )
}

export default SearchFormReset