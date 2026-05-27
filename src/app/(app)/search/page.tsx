import { Suspense } from "react";
import { SearchScreen } from "@/components/search/search-screen";

// SearchScreen reads `?view=` via useSearchParams, which needs a Suspense
// boundary so the route doesn't opt the whole shell out of static rendering.
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-0 flex-1" />}>
      <SearchScreen />
    </Suspense>
  );
}
