import { Check, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createReturn } from "../../features/returnSlice.js";
import { useDispatch } from "react-redux";

const ReturnModal = ({ opened, onClose, order, fetchData }) => {

    // console.log("order", order);

    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState({});
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    let selectedQuantity;

    // Reset modal whenever it opens
    useEffect(() => {
        if (opened) {
            setSelectedItems({});
            setReason("");
            setDescription("");
            setLoading(false);
        }
    }, [opened]);

    if (!opened || !order) {
        return null;
    }

    // --------------------------------------------------
    // SELECT / UNSELECT PRODUCT
    // --------------------------------------------------

    const toggleProduct = (itemId) => {
        setSelectedItems((prev) => {
            const updated = { ...prev };

            if (updated[itemId]) {
                delete updated[itemId];
            } else {
                updated[itemId] = 1;
            }

            return updated;
        });
    };

    // --------------------------------------------------
    // CHANGE RETURN QUANTITY
    // --------------------------------------------------

    const increaseQuantity = (item) => {
        setSelectedItems((prev) => ({
            ...prev,
            [item._id]: Math.min(
                item.quantity,
                (prev[item._id] || 0) + 1
            ),
        }));
    };

    const decreaseQuantity = (item) => {
        setSelectedItems((prev) => {
            const currentQuantity = prev[item._id] || 0;

            if (currentQuantity <= 1) {
                const updated = { ...prev };
                delete updated[item._id];
                return updated;
            }

            return {
                ...prev,
                [item._id]: currentQuantity - 1,
            };
        });
    };

    // --------------------------------------------------
    // SELECTED PRODUCTS
    // --------------------------------------------------

    const selectedProducts = order.products.filter(
        (item) => selectedItems[item._id]
    );

    // --------------------------------------------------
    // TOTAL RETURN QUANTITY
    // --------------------------------------------------

    const totalSelectedQuantity =
        selectedProducts.reduce(
            (total, item) =>
                total + selectedItems[item._id],
            0
        );

    // --------------------------------------------------
    // REFUND AMOUNT
    // --------------------------------------------------

    //     const refundAmount = selectedProducts.reduce(
    //     (total, item) => {
    //         const quantity = selectedItems[item._id];

    //         const itemAmount = item.price * quantity;

    //         const tax = order.tax * (itemAmount / order.subTotal);

    //         // console.log(tax);
    //         // console.log(itemAmount);

    //         return total + itemAmount + tax;
    //     },
    //     0
    // );

    let tax;
    let shippingCharges;

    const refundAmount = selectedProducts.reduce(
        (total, item) => {

            const quantity = selectedItems[item._id];

            // Selected product amount
            const itemAmount = item.price * quantity;

            // Product's share of order subtotal
            const proportion = itemAmount / order.subTotal;

            // Product's share of tax
            tax = order.tax * proportion;

            // Product's share of shipping
            shippingCharges = order.shippingCharges * proportion;

            return (total + itemAmount + tax + shippingCharges);
        },
        0
    );

    // --------------------------------------------------
    // SUBMIT RETURN
    // --------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedProducts.length === 0) {
            toast.error("Please select at least one item.");
            return;
        }

        if (!reason) {
            toast.error("Please select a return reason.");
            return;
        }

        try {
            setLoading(true);
            // console.log("tax", tax);


            const response = await dispatch(createReturn({ orderId: order._id, products: order.products, reason, description, selectedQuantity, refundAmount, tax, shippingCharges })).unwrap();

            // console.log(response);

            toast.success(
                "Return request submitted successfully."
            );

            fetchData();

            onClose();

        } catch (error) {
            console.error(error);

            toast.error(error || "Unable to submit return request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40
        px-4 py-6
        backdrop-blur-[3px]
      "
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >

            {/* ==================================================
          MODAL
      ================================================== */}

            <div
                className="
          w-full max-w-2xl
          overflow-hidden
          rounded-3xl
          border border-[#E8D4D0]
          bg-white
          shadow-[0_24px_70px_rgba(44,24,16,0.18)]
          animate-fade-in-up
        "
            >

                {/* ==================================================
            HEADER
        ================================================== */}

                <div className="flex items-center justify-between border-b border-[#E8D4D0] px-5 py-4 sm:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1DBD5]">

                            <RotateCcw
                                size={19}
                                className="text-[#E7A9A2]"
                            />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-[#2C1810]">
                                Return Items
                            </h2>

                            <p className="text-xs text-[#8A6B65]">
                                Select the items you want to return
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              text-[#8A6B65]
              transition
              hover:bg-[#F1DBD5]
              hover:text-[#2C1810]
            "
                    >
                        <X size={19} />
                    </button>

                </div>


                {/* ==================================================
            FORM
        ================================================== */}

                <form onSubmit={handleSubmit}>

                    <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6">

                        {/* ==================================================
                ORDER INFO
            ================================================== */}

                        <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#E8D4D0] bg-[#FBF8F5] p-4">

                            <div>

                                <p className="text-xs text-[#8A6B65]">
                                    Order
                                </p>

                                <p className="mt-1 text-sm font-semibold text-[#2C1810]">
                                    #{order._id}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-xs text-[#8A6B65]">
                                    Selected
                                </p>

                                <p className="mt-1 text-sm font-semibold text-[#2C1810]">
                                    {totalSelectedQuantity}{" "}
                                    {totalSelectedQuantity === 1
                                        ? "item"
                                        : "items"}
                                </p>

                            </div>

                        </div>


                        {/* ==================================================
                PRODUCTS
            ================================================== */}

                        <div>

                            <div className="mb-3 flex items-center justify-between">

                                <label className="text-sm font-semibold text-[#2C1810]">
                                    Select items
                                </label>

                                <span className="text-xs text-[#8A6B65]">
                                    {order.products.length}{" "}
                                    {order.products.length === 1
                                        ? "item"
                                        : "items"}{" "}
                                    in this order
                                </span>

                            </div>


                            <div className="space-y-3">

                                {order.products.map((item) => {

                                    const itemId = item._id;

                                    const selected =
                                        selectedItems[itemId] !==
                                        undefined;

                                    selectedQuantity =
                                        selectedItems[itemId] || 0;

                                    return (

                                        <div
                                            key={itemId}
                                            className={`
                        rounded-2xl
                        border
                        p-3
                        transition-all
                        ${selected
                                                    ? "border-[#E7A9A2] bg-[#FBF0EF]"
                                                    : "border-[#E8D4D0] bg-white"
                                                }
                      `}
                                        >

                                            <div className="flex gap-3">

                                                {/* CHECKBOX */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleProduct(itemId)
                                                    }
                                                    className={`
                            mt-1
                            flex h-5 w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            border
                            transition
                            ${selected
                                                            ? "border-[#E7A9A2] bg-[#E7A9A2] text-white"
                                                            : "border-[#D4A398] bg-white"
                                                        }
                          `}
                                                >

                                                    {selected && (
                                                        <Check size={14} />
                                                    )}

                                                </button>


                                                {/* IMAGE */}

                                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F1DBD5]">

                                                    <img
                                                        src={
                                                            item.product
                                                                .images?.[0]?.url
                                                        }
                                                        alt={
                                                            item.product?.name
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />

                                                </div>


                                                {/* INFO */}

                                                <div className="min-w-0 flex-1">

                                                    <h3 className="line-clamp-2 text-sm font-semibold text-[#2C1810]">

                                                        {item.product.name}

                                                    </h3>


                                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8A6B65]">

                                                        <span>
                                                            Size: {item.size}
                                                        </span>

                                                        <span>
                                                            Ordered:{" "}
                                                            {item.quantity}
                                                        </span>

                                                    </div>


                                                    <p className="mt-2 text-sm font-bold text-[#2C1810]">

                                                        ₹
                                                        {item.price.toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </p>

                                                </div>

                                            </div>


                                            {/* ==================================================
                          QUANTITY SELECTOR
                      ================================================== */}

                                            {selected && (

                                                <div className="mt-3 flex items-center justify-between border-t border-[#E8D4D0] pt-3">

                                                    <span className="text-xs font-medium text-[#8A6B65]">
                                                        Return quantity
                                                    </span>


                                                    <div className="flex items-center gap-3">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                decreaseQuantity(
                                                                    item
                                                                )
                                                            }
                                                            className="
                                flex h-8 w-8
                                items-center
                                justify-center
                                rounded-lg
                                border border-[#E8D4D0]
                                bg-white
                                text-[#2C1810]
                                transition
                                hover:bg-[#F1DBD5]
                              "
                                                        >
                                                            −
                                                        </button>


                                                        <span className="w-5 text-center text-sm font-semibold text-[#2C1810]">
                                                            {selectedQuantity}
                                                        </span>


                                                        <button
                                                            type="button"
                                                            disabled={
                                                                selectedQuantity >=
                                                                item.quantity
                                                            }
                                                            onClick={() =>
                                                                increaseQuantity(
                                                                    item
                                                                )
                                                            }
                                                            className="
                                flex h-8 w-8
                                items-center
                                justify-center
                                rounded-lg
                                border border-[#E8D4D0]
                                bg-white
                                text-[#2C1810]
                                transition
                                hover:bg-[#F1DBD5]
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                              "
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </div>

                                            )}

                                        </div>

                                    );

                                })}

                            </div>

                        </div>


                        {/* ==================================================
                REASON
            ================================================== */}

                        <div className="mt-5">

                            <label
                                htmlFor="returnReason"
                                className="mb-2 block text-sm font-medium text-[#2C1810]"
                            >
                                Return reason
                            </label>

                            <select
                                id="returnReason"
                                value={reason}
                                onChange={(e) =>
                                    setReason(e.target.value)
                                }
                                className="
                  w-full
                  rounded-xl
                  border border-[#E8D4D0]
                  bg-white
                  px-4 py-3
                  text-sm
                  text-[#2C1810]
                  outline-none
                  transition
                  focus:border-[#E7A9A2]
                  focus:ring-2
                  focus:ring-[#E7A9A2]/20
                "
                            >

                                <option value="">
                                    Select a reason
                                </option>

                                <option value="Size doesn't fit">
                                    Size doesn't fit
                                </option>

                                <option value="Product is damaged">
                                    Product is damaged
                                </option>

                                <option value="Wrong product received">
                                    Wrong product received
                                </option>

                                <option value="Product quality is not satisfactory">
                                    Product quality is not satisfactory
                                </option>

                                <option value="Changed my mind">
                                    Changed my mind
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* ==================================================
                DESCRIPTION
            ================================================== */}

                        <div className="mt-5">

                            <label
                                htmlFor="returnDescription"
                                className="mb-2 block text-sm font-medium text-[#2C1810]"
                            >
                                Additional details{" "}
                                <span className="font-normal text-[#8A6B65]">
                                    (optional)
                                </span>
                            </label>

                            <textarea
                                id="returnDescription"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                rows={3}
                                maxLength={500}
                                placeholder="Tell us more about the return..."
                                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-[#E8D4D0]
                  bg-white
                  px-4 py-3
                  text-sm
                  text-[#2C1810]
                  outline-none
                  placeholder:text-[#8A6B65]/60
                  transition
                  focus:border-[#E7A9A2]
                  focus:ring-2
                  focus:ring-[#E7A9A2]/20
                "
                            />

                            <p className="mt-1 text-right text-xs text-[#8A6B65]">
                                {description.length}/500
                            </p>

                        </div>


                        {/* ==================================================
                REFUND SUMMARY
            ================================================== */}

                        <div className="mt-5 rounded-2xl border border-[#E7A9A2]/30 bg-[#FBF0EF] p-4">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs text-[#8A6B65]">
                                        Estimated refund
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-[#2C1810]">
                                        ₹
                                        {refundAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>

                                </div>


                                <div className="text-right">

                                    <p className="text-xs text-[#8A6B65]">
                                        Returning
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#2C1810]">
                                        {totalSelectedQuantity}{" "}
                                        {totalSelectedQuantity === 1
                                            ? "item"
                                            : "items"}
                                    </p>

                                </div>

                            </div>


                            <p className="mt-3 text-xs leading-5 text-[#8A6B65]">
                                Final refund amount will be confirmed
                                after the returned product is inspected.
                            </p>

                        </div>

                    </div>


                    {/* ==================================================
              FOOTER
          ================================================== */}

                    <div className="flex flex-col-reverse gap-2 border-t border-[#E8D4D0] p-5 sm:flex-row sm:justify-end sm:px-6">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="
                rounded-xl
                border border-[#E8D4D0]
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-[#2C1810]
                transition
                hover:bg-[#FBF8F5]
                disabled:opacity-50
              "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                loading ||
                                selectedProducts.length === 0
                            }
                            className="
                rounded-xl
                bg-[#E7A9A2]
                px-5 py-3
                text-sm font-semibold
                text-[#2C1810]
                transition
                hover:bg-[#E29A8F]
                hover:shadow-[0_8px_24px_rgba(231,169,162,0.25)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
                        >

                            {loading
                                ? "Submitting..."
                                : "Submit Return Request"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ReturnModal;