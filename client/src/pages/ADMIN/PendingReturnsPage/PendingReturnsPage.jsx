import {
  Check,
  ChevronRight,
  Clock3,
  Package,
  RotateCcw,
  Search,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PendingReturnsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [returns, setReturns] = useState([
    {
      _id: "RET-1001",

      order: {
        _id: "STYQLO-1001",
      },

      user: {
        name: "Rahul Kumar",
        email: "rahul@example.com",
      },

      product: {
        _id: "product001",
        name: "Premium Oversized T-Shirt",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      },

      quantity: 1,
      size: "L",

      reason: "Size doesn't fit",

      description:
        "The product is good but the size is slightly larger than expected.",

      refundAmount: 1499,

      status: "Pending",

      requestedAt: "09 Aug 2026, 03:20 PM",
    },

    {
      _id: "RET-1002",

      order: {
        _id: "STYQLO-1005",
      },

      user: {
        name: "Ananya Singh",
        email: "ananya@example.com",
      },

      product: {
        _id: "product002",
        name: "Minimal Summer Dress",
        image:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
      },

      quantity: 1,
      size: "M",

      reason: "Product damaged",

      description:
        "The product arrived with a damaged area near the sleeve.",

      refundAmount: 2899,

      status: "Pending",

      requestedAt: "08 Aug 2026, 11:10 AM",
    },

    {
      _id: "RET-1003",

      order: {
        _id: "STYQLO-1007",
      },

      user: {
        name: "Amit Kumar",
        email: "amit@example.com",
      },

      product: {
        _id: "product003",
        name: "Classic Denim Jeans",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      },

      quantity: 1,
      size: "32",

      reason: "Wrong size received",

      description:
        "I ordered size 32 but received size 34.",

      refundAmount: 1799,

      status: "Pending",

      requestedAt: "08 Aug 2026, 09:45 AM",
    },
  ]);

  const [actionLoading, setActionLoading] = useState(null);

  // ==================================================
  // SEARCH
  // ==================================================

  const filteredReturns = returns.filter((returnItem) => {
    const value = search.toLowerCase().trim();

    if (!value) return true;

    return (
      returnItem._id.toLowerCase().includes(value) ||
      returnItem.order._id.toLowerCase().includes(value) ||
      returnItem.user.name.toLowerCase().includes(value) ||
      returnItem.user.email.toLowerCase().includes(value) ||
      returnItem.product.name.toLowerCase().includes(value) ||
      returnItem.reason.toLowerCase().includes(value)
    );
  });

  // ==================================================
  // APPROVE
  // ==================================================

  const handleApprove = (returnId) => {
    try {
      setActionLoading(returnId);

      setTimeout(() => {
        setReturns((prev) =>
          prev.filter((item) => item._id !== returnId)
        );

        setActionLoading(null);

        toast.success("Return request approved.");
      }, 500);
    } catch (error) {
      console.error(error);

      setActionLoading(null);

      toast.error("Failed to approve return request.");
    }
  };

  // ==================================================
  // REJECT
  // ==================================================

  const handleReject = (returnId) => {
    try {
      setActionLoading(returnId);

      setTimeout(() => {
        setReturns((prev) =>
          prev.filter((item) => item._id !== returnId)
        );

        setActionLoading(null);

        toast.success("Return request rejected.");
      }, 500);
    } catch (error) {
      console.error(error);

      setActionLoading(null);

      toast.error("Failed to reject return request.");
    }
  };

  return (
    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Pending Returns
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Review customer return requests that need your attention.
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
                  {returns.length}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            SEARCH
        ================================================== */}

        <div className="mb-6">

          <div className="relative w-full max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search return ID, order ID, customer or product..."
              className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

          </div>

        </div>

        {/* ==================================================
            RETURN LIST
        ================================================== */}

        {filteredReturns.length > 0 ? (

          <div className="space-y-5">

            {filteredReturns.map((returnItem) => {

              const isProcessing =
                actionLoading === returnItem._id;

              return (
                <article
                  key={returnItem._id}
                  className="card-luxury overflow-hidden"
                >

                  {/* ==================================================
                      HEADER
                  ================================================== */}

                  <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="font-bold text-foreground">
                          #{returnItem._id}
                        </h2>

                        <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">

                          <Clock3 size={13} />

                          Pending

                        </span>

                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">

                        Order #{returnItem.order._id}

                        {" · "}

                        {returnItem.requestedAt}

                      </p>

                    </div>

                    {/* REFUND */}

                    <div className="sm:text-right">

                      <p className="text-xs text-muted-foreground">
                        Refund Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-foreground">

                        ₹
                        {returnItem.refundAmount.toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                  </div>

                  {/* ==================================================
                      BODY
                  ================================================== */}

                  <div className="p-5 sm:p-6">

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(280px,1.5fr)_minmax(160px,0.7fr)_minmax(180px,0.9fr)_auto] xl:items-center">

                      {/* PRODUCT */}

                      <div className="flex min-w-0 gap-4">

                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">

                          <img
                            src={returnItem.product.image}
                            alt={returnItem.product.name}
                            className="h-full w-full object-cover"
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Product
                          </p>

                          <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">
                            {returnItem.product.name}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">

                            <span>
                              Size: {returnItem.size}
                            </span>

                            <span>
                              Qty: {returnItem.quantity}
                            </span>

                          </div>

                          <p className="mt-2 font-semibold text-foreground">

                            ₹
                            {returnItem.refundAmount.toLocaleString(
                              "en-IN"
                            )}

                          </p>

                        </div>

                      </div>

                      {/* CUSTOMER */}

                      <div className="min-w-0">

                        <div className="flex items-center gap-2">

                          <User
                            size={16}
                            className="text-primary"
                          />

                          <p className="text-xs text-muted-foreground">
                            Customer
                          </p>

                        </div>

                        <p className="mt-1 truncate font-semibold text-foreground">
                          {returnItem.user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {returnItem.user.email}
                        </p>

                      </div>

                      {/* REASON */}

                      <div className="min-w-0">

                        <p className="text-xs text-muted-foreground">
                          Return Reason
                        </p>

                        <p className="mt-1 font-semibold text-foreground">
                          {returnItem.reason}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {returnItem.description}
                        </p>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">

                        {/* APPROVE */}

                        <button
                          disabled={isProcessing}
                          onClick={() =>
                            handleApprove(returnItem._id)
                          }
                          className="flex min-w-[110px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          <Check size={17} />

                          {isProcessing
                            ? "Processing..."
                            : "Approve"}

                        </button>

                        {/* REJECT */}

                        <button
                          disabled={isProcessing}
                          onClick={() =>
                            handleReject(returnItem._id)
                          }
                          className="flex min-w-[110px] items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-luxury hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          <X size={17} />

                          Reject

                        </button>

                        {/* DETAILS */}

                        <button
                          disabled={isProcessing}
                          onClick={() =>
                            navigate(
                              `/admin/returns/${returnItem._id}`
                            )
                          }
                          className="flex min-w-[110px] items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-luxury hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          Details

                          <ChevronRight size={16} />

                        </button>

                      </div>

                    </div>

                    {/* CUSTOMER MESSAGE */}

                    <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-4">

                      <div className="flex items-center gap-2">

                        <Package
                          size={16}
                          className="text-primary"
                        />

                        <p className="text-xs font-semibold text-foreground">
                          Customer Message
                        </p>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {returnItem.description}
                      </p>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        ) : (

          /* ==================================================
             EMPTY
          ================================================== */

          <div className="card-luxury flex min-h-[450px] flex-col items-center justify-center px-6 py-20 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <RotateCcw
                size={38}
                className="text-primary"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No Pending Returns
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">

              {search
                ? "No pending returns match your search."
                : "There are currently no return requests waiting for approval."}

            </p>

            {search && (

              <button
                onClick={() => setSearch("")}
                className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
              >
                Clear Search
              </button>

            )}

          </div>
        )}

      </div>
    </main>
  );
};

export default PendingReturnsPage;