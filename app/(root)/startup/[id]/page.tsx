import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/quries';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import Image from 'next/image';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';


const md = markdownit();

export const experimental_ppr = true;

const page = async ({params } :{params :Promise<{id :string}>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY , {id});

    if(!post){
       
        return notFound();
    }

    const parsedContent = md.render(post?.pitch || "");

  return (
    <div>

      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>
          {formatDate(post._createdAt)}

        </p>
        <h1 className='heading'>{post.title}</h1>
        <p className="sub-heading">{post.description}</p>
      </section>

      <section className='section_container'>
        <img src={post.image} alt="thumbnail" className='w-full rounded-xl h-auto' />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto '>
          <div className='flex-between gap-5'>
            <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>

              <Image src={post.author?.image} alt="thumbnail" width={64} height={64} className='rounded-full drop-shadow-lg'></Image>

              <div>
                <p className='text-20-medium'>{post.author?.name}</p> <p className='text-16-medium !text-black-300'>{post.author?.username}</p>
              </div>
            </Link>


            <p className='category-tag'>
              {post.category}
            </p>
          </div>
          <h3 className='text-30-bold'>Pitch Details</h3>

          {parsedContent ? (
            <article
            dangerouslySetInnerHTML={{ __html: parsedContent }}>

            </article>
          ):(
            <p className='no-result'>No content</p>
          )}

        </div>

        <hr className='divider'/>



      </section>


      <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          
          <View id={id}/>
         
      </Suspense>
    
    </div>
  )
}

export default page