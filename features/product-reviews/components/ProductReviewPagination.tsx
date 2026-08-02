import {
  PaginatedReview,
  Pagination as ReviewPagination,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import { ReviewPaginationAction } from "../utis/reviewPaginationReducer";
import getPaginationItems from "../services/getPaginationItems";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ProductReviewPaginationProps = {
  paginationDispatch: React.ActionDispatch<[action: ReviewPaginationAction]>;
  pagination: ReviewPagination;
};

export default function ProductReviewPagination({
  paginationDispatch,
  pagination,
}: ProductReviewPaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();

              paginationDispatch({ type: "PREV_PAGE" });
            }}
            aria-disabled={!hasPrevPage}
            aria-label="previous page"
          />
        </PaginationItem>
        {paginationItems.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === item}
                onClick={(e) => {
                  e.preventDefault();

                  paginationDispatch({ type: "SET_PAGE", page: item });
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();

              paginationDispatch({
                type: "NEXT_PAGE",
                totalPages: totalPages,
              });
            }}
            aria-disabled={!hasNextPage}
            aria-label="next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
