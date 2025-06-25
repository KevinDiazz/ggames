import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComp({
  currentPage,
  setUrlGames,
  setCurrentPage,
  data,
}) {
  return (
    <Pagination className="mb-8">
      <PaginationContent>
        <PaginationItem className="hover:cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              currentPage > 1 ? setUrlGames(data.previous) : null,
                setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hover:cursor-pointer">
          <PaginationNext
            onClick={() => {
              setUrlGames(data.next), setCurrentPage((prev) => prev + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
