import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  RotateCcw,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initialReturns = [
  {
    id: "RET-1001",
    orderId: "STYQLO-1001",
    customer: {
      name: "Rahul Kumar",
      email: "rahul@example.com",
    },
    product: {
      name: "Premium Oversized T-Shirt",
      size: "L",
      quantity: 1,
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    },
    reason: "Size doesn't fit",
    description:
      "The product is good but the size is slightly larger than expected.",
    requestedAt: "09 Aug 2026, 03:20 PM",
    status: "Pending",
  },

  {
    id: "RET-1002",
    orderId: "STYQLO-1005",
    customer: {
      name: "Ananya Singh",
      email: "ananya@example.com",
    },
    product: {
      name: "Minimal Summer Dress",
      size: "M",
      quantity: 1,
      price: 2899,
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300",
    },
    reason: "Product damaged",
    description:
      "The product arrived with a small damaged area.",
    requestedAt: "07 Aug 2026, 11:10 AM",
    status: "Approved",
  },

  {
    id: "RET-1003",
    orderId: "STYQLO-0998",
    customer: {
      name: "Priya Sharma",
      email: "priya@example.com",
    },
    product: {
      name: "Relaxed Fit Hoodie",
      size: "M",
      quantity: 1,
      price: 1799,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300",
    },
    reason: "Wrong product received",
    description:
      "The product received was different from the product ordered.",
    requestedAt: "05 Aug 2026, 02:30 PM",
    status: "Rejected",
  },

  {
    id: "RET-1004",
    orderId: "STYQLO-0990",
    customer: {
      name: "Amit Kumar",
      email: "amit@example.com",
    },
    product: {
      name: "Classic Denim Jeans",
      size: "32",
      quantity: 1,
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
    },
    reason: "Size doesn't fit",
    description:
      "Requested return because the selected size does not fit.",
    requestedAt: "01 Aug 2026, 01:15 PM",
    status: "Completed",
  },
];


// --------------------------------------------------
// STATUS CONFIG
// --------------------------------------------------

const statusConfig = {
  Pending: {
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  Approved: {
    icon: CheckCircle2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  Rejected: {
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  Completed: {
    icon: CheckCircle2,
    className:
      "border-green-200 bg-green-50 text-green-700",
  },
};


// --------------------------------------------------
// PAGE
// --------------------------------------------------

const ManageReturnsPage = () => {
  const navigate = useNavigate();

  const [returns, setReturns] =
    useState(initialReturns);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [search, setSearch] = useState("");


  // ------------------------------------------------
  // COUNTS
  // ------------------------------------------------

  const counts = useMemo(() => {
    return {
      All: returns.length,

      Pending: returns.filter(
        (item) => item.status === "Pending"
      ).length,

      Approved: returns.filter(
        (item) => item.status === "Approved"
      ).length,

      Rejected: returns.filter(
        (item) => item.status === "Rejected"
      ).length,

      Completed: returns.filter(
        (item) => item.status === "Completed"
      ).length,
    };
  }, [returns]);


  // ------------------------------------------------
  // FILTER
  // ------------------------------------------------

  const filteredReturns = useMemo(() => {
    return returns.filter((item) => {

      const searchValue =
        search.toLowerCase().trim();

      const matchesStatus =
        activeFilter === "All" ||
        item.status === activeFilter;

      const matchesSearch =
        !searchValue ||
        item.id
          .toLowerCase()
          .includes(searchValue) ||
        item.orderId
          .toLowerCase()
          .includes(searchValue) ||
        item.customer.name
          .toLowerCase()
          .includes(searchValue) ||
        item.customer.email
          .toLowerCase()
          .includes(searchValue) ||
        item.product.name
          .toLowerCase()
          .includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [returns, activeFilter, search]);


  // ------------------------------------------------
  // APPROVE
  // ------------------------------------------------

  const handleApprove = async (returnId) => {
    try {

      // Replace with API call
      // await approveReturn(returnId);

      setReturns((prev) =>
        prev.map((item) =>
          item.id === returnId
            ? {
                ...item,
                status: "Approved",
              }
            : item
        )
      );

      toast.success("Return request approved");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to approve return"
      );
    }
  };


  // ------------------------------------------------
  // REJECT
  // ------------------------------------------------

  const handleReject = async (returnId) => {
    try {

      // Replace with API call
      // await rejectReturn(returnId);

      setReturns((prev) =>
        prev.map((item) =>
          item.id === returnId
            ? {
                ...item,
                status: "Rejected",
              }
            : item
        )
      );

      toast.success("Return request rejected");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to reject return"
      );
    }
  };


  const filters = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
    "Completed",
  ];


  return (
    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">


        {/* ========================================== */}
        {/* HEADER */}
        {/* ========================================== */}

        <div className="mb-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Return Requests
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Review and manage customer return requests.
              </p>

            </div>


            {/* PENDING COUNT */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">

                <Clock3
                  size={20}
                  className="text-amber-700"
                />

              </div>

              <div>

                <p className="text-xs text-amber-700/70">
                  Pending Returns
                </p>

                <p className="text-xl font-bold text-amber-700">
                  {counts.Pending}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ========================================== */}
        {/* SEARCH */}
        {/* ========================================== */}

        <div className="mb-5">

          <div className="relative max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search return ID, order ID, customer or product..."
              className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

          </div>

        </div>


        {/* ========================================== */}
        {/* FILTERS */}
        {/* ========================================== */}

        <div className="mb-6 overflow-x-auto pb-2">

          <div className="flex min-w-max gap-2">

            {filters.map((filter) => (

              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-luxury ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >

                {filter}

                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${
                    activeFilter === filter
                      ? "bg-white/20"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {counts[filter]}
                </span>

              </button>

            ))}

          </div>

        </div>


        {/* ========================================== */}
        {/* RETURNS */}
        {/* ========================================== */}

        {filteredReturns.length > 0 ? (

          <div className="space-y-5">

            {filteredReturns.map((returnItem) => {

              const config =
                statusConfig[
                  returnItem.status
                ];

              const StatusIcon =
                config.icon;

              return (

                <article
                  key={returnItem.id}
                  className="card-luxury overflow-hidden"
                >

                  {/* -------------------------------- */}
                  {/* HEADER */}
                  {/* -------------------------------- */}

                  <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="font-bold text-foreground">
                          #{returnItem.id}
                        </h2>

                        <span
                          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
                        >

                          <StatusIcon size={13} />

                          {returnItem.status}

                        </span>

                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Order #{returnItem.orderId}
                        {" · "}
                        {returnItem.requestedAt}
                      </p>

                    </div>


                    <div className="sm:text-right">

                      <p className="text-xs text-muted-foreground">
                        Refund Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-foreground">
                        ₹{returnItem.product.price.toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>


                  {/* -------------------------------- */}
                  {/* BODY */}
                  {/* -------------------------------- */}

                  <div className="p-5 sm:p-6">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">


                      {/* PRODUCT */}

                      <div className="flex min-w-0 flex-1 gap-4">

                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">

                          <img
                            src={returnItem.product.image}
                            alt={returnItem.product.name}
                            className="h-full w-full object-cover"
                          />

                        </div>


                        <div className="min-w-0">

                          <h3 className="font-semibold text-foreground">
                            {returnItem.product.name}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">

                            <span>
                              Size:{" "}
                              {returnItem.product.size}
                            </span>

                            <span>
                              Qty:{" "}
                              {returnItem.product.quantity}
                            </span>

                          </div>

                          <p className="mt-2 text-sm font-semibold text-foreground">
                            ₹
                            {returnItem.product.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      </div>


                      {/* CUSTOMER */}

                      <div className="lg:min-w-[190px]">

                        <p className="text-xs text-muted-foreground">
                          Customer
                        </p>

                        <p className="mt-1 font-semibold text-foreground">
                          {returnItem.customer.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {returnItem.customer.email}
                        </p>

                      </div>


                      {/* REASON */}

                      <div className="lg:min-w-[190px]">

                        <p className="text-xs text-muted-foreground">
                          Return Reason
                        </p>

                        <p className="mt-1 font-semibold text-foreground">
                          {returnItem.reason}
                        </p>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">

                        {returnItem.status ===
                          "Pending" && (

                          <>

                            <button
                              onClick={() =>
                                handleApprove(
                                  returnItem.id
                                )
                              }
                              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                            >

                              <Check size={17} />

                              Approve

                            </button>

                            <button
                              onClick={() =>
                                handleReject(
                                  returnItem.id
                                )
                              }
                              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-luxury hover:bg-red-100"
                            >

                              <X size={17} />

                              Reject

                            </button>

                          </>

                        )}


                        <button
                          onClick={() =>
                            navigate(
                              `/admin/returns/${returnItem.id}`
                            )
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-luxury hover:border-primary hover:text-primary"
                        >

                          Details

                          <ChevronRight
                            size={16}
                          />

                        </button>

                      </div>

                    </div>


                    {/* DESCRIPTION */}

                    {returnItem.description && (

                      <div className="mt-5 rounded-xl border border-border bg-primary/5 p-4">

                        <p className="text-xs font-semibold text-foreground">
                          Customer Message
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {returnItem.description}
                        </p>

                      </div>

                    )}

                  </div>

                </article>

              );

            })}

          </div>

        ) : (

          /* ======================================== */
          /* EMPTY */
          /* ======================================== */

          <div className="card-luxury flex flex-col items-center justify-center px-6 py-24 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <RotateCcw
                size={38}
                className="text-primary"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No Return Requests
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">

              {search
                ? "No return requests match your search."
                : `There are no ${activeFilter.toLowerCase()} return requests.`}

            </p>

            {(search ||
              activeFilter !== "All") && (

              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
              >
                View All Returns
              </button>

            )}

          </div>

        )}

      </div>

    </main>
  );
};

export default ManageReturnsPage;