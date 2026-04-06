export default function Pagination({
  page,
  setPage,
  nextPage,
  prevPage,
}: {
  page: number;
  setPage: (page: number) => void;
  nextPage?: number;
  prevPage?: number;
}) {
  const goToFirstPage = () => setPage(0);
  const goToPreviousPage = () => setPage(prevPage);
  const goToNextPage = () => setPage(nextPage);

  const canGoToPreviousPage = page > 0;

  return (
    <div className="flex justify-center w-full py-2 mt-3 lg:mt-0">
      <button
        className="border-none rounded p-1"
        onClick={goToPreviousPage}
        disabled={!canGoToPreviousPage}
      >
        <span className="w-7 h-7 circle bg-primary text-white flex place-center hover:scale-105 duration-100">
          {/* <TbArrowBackUp className="text-2xl" /> */}
          &lt;
        </span>
      </button>
      <span className="flex items-center px-2">Page {page} </span>
      <button
        className="border-none rounded p-1"
        onClick={goToNextPage}
        // disabled={!canGoToNextPage}
      >
        <span className="w-7 h-7 circle bg-primary text-white flex place-center hover:scale-105 duration-100">
          {/* <TbArrowForwardUp className="text-2xl" /> */}
          &gt;
        </span>
      </button>
    </div>
  );
}
