import React from 'react';
import Filter from './Filter';
import SearchResult from './SearchResult';
import { SearchX } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const SearchPage = () => {
    const isLoading = false;
    const isEmpty = false;
  return (
    <div className='max-7-xl mx-auto p-4 md:p-8 mt-10'>
        <div className="my-6">
            <h1>Result for "htkmtgl"</h1>
            <p>Showing results for {" "}
            <span className='text-blue-800 font-bold italic'>Frontend </span>
            </p>
        </div>
        <div className='flex flex-col md:flex-row gap-10'>
            <Filter/>
            <div className='flex-1'>
                {
                    isLoading ? (
                        Array.from({length:3}).map((_, idx) => (
                          <CourseSkeleton key={idx}/>
                        )
                        )
                    ) : isEmpty ? ( <CourseNotFound/>) : (
                        [1,2,3].map((course, idx) => (
                                <SearchResult key={idx}/>
                        )
                        )
                    )
                }

            </div>
        </div>
      
    </div>
  );
}

export default SearchPage;

 const CourseSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 mb-3 border border-border rounded-xl bg-background">
      <Skeleton className="w-44 h-28 rounded-lg flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1 py-1">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-1/3 mt-auto" />
      </div>
    </div>
  );
};
 const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-content-center mb-5">
        <SearchX className="w-7 h-7 text-muted-foreground mx-auto" />
      </div>
      <h3 className="text-lg font-medium mb-2">No courses found</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        We couldn't find any results matching your search. Try different keywords or filters.
      </p>
    </div>
  );
};

