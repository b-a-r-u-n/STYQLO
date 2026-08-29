import { Check, Download, ExternalLink, Package, Truck, X, Loader2, FileBraces, FileCheck, } from "lucide-react";
import { createManifest, generateAWB, generateLabelAndInvoice, requestPickup } from "../../services/courier";
import toast from "react-hot-toast";

const ShipmentModal = ({
    isOpen,
    onClose,
    step,
    order,
    selectedCourier,
    awbData,
    labelData,
    onGenerateLabel,
    onMarkPacked,
    onRequestPickup,
    onGenerateManifest,
    selectedOrderId,
    setShipmentStep,
    setAwbData,
    packedData,
    pickupData,
    manifestData
}) => {
    if (!isOpen) return null;

    const getAWB = () => {
        return (
            awbData?.awb_code ||
            awbData?.awbCode ||
            awbData?.data?.awb_code ||
            "-"
        );
    };

    const getCourierName = () => {
        return (
            selectedCourier?.courier_name ||
            selectedCourier?.courierName ||
            awbData?.courier_name ||
            awbData?.courierName ||
            "-"
        );
    };

    const tryagain = async (work) => {

        try {
            if (work === "awb") {
                setShipmentStep("generating-awb");

                // setAwbData({courier_name: "Delhivery", awb_code: 123445});
                // setTimeout(() => {
                //   console.log(awbData);
                //   setShipmentStep("awb-generated");
                // }, 10000);

                const response = await generateAWB({ orderId: selectedOrderId, courierId: selectedCourier?.courier_company_id });

                console.log("AWB Response:", response);

                setAwbData(response?.data || response);

                setShipmentStep("awb-generated");
            }
            else if (work === "invoice") {
                onGenerateLabel();
            }
            else if (work === "packed") {
                onMarkPacked();
            }
            else if (work === "pickup-date") {
               onRequestPickup();
            }
            else if (work === "manifest") {
                onGenerateManifest();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error?.message || "Failed to update courier.");
            setShipmentStep("error");
        }
    }

    const getNextShipmentStep = () => {
        // console.log("awbData", awbData);

        if (!awbData?.awbCode) {
            return "awb";
        }

        if (!labelData?.invoice || !labelData?.label) {
            return "invoice";
        }

        if (!packedData) {
            console.log(packedData);
            return "packed"
        }

        if (!pickupData?.response?.pickup_scheduled_date) {
            return "pickup-date";
        }

        if (!manifestData?.manifest_url) {
            return "manifest";
        }

        return null;
    };

    const isLoading =
        step === "generating-awb" ||
        step === "generating-label" ||
        step === "requesting-pickup" ||
        step === "packing" ||
        step === "generating-manifest";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                            <Package
                                size={21}
                                className="text-primary"
                            />
                        </div>

                        <div>
                            <h2 className="font-bold text-foreground">
                                Shipment
                            </h2>

                            <p className="text-xs text-muted-foreground">
                                Order #{order?.orderId}
                            </p>
                        </div>
                    </div>

                    {!isLoading && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* CONTENT */}
                <div className="p-6">

                    {/* ================================= */}
                    {/* GENERATING AWB */}
                    {/* ================================= */}

                    {step === "generating-awb" && (
                        <div className="py-10 text-center">
                            <Loader2
                                size={42}
                                className="mx-auto animate-spin text-primary"
                            />

                            <h3 className="mt-5 text-lg font-bold text-foreground">
                                Generating AWB
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Assigning your shipment to{" "}
                                <span className="font-semibold text-foreground">
                                    {getCourierName()}
                                </span>
                                .
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Please wait...
                            </p>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* AWB GENERATED */}
                    {/* ================================= */}

                    {step === "awb-generated" && (
                        <div>
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Check
                                        size={32}
                                        className="text-green-600"
                                    />
                                </div>

                                <h3 className="mt-4 text-xl font-bold text-foreground">
                                    AWB Generated
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Shipment is ready for the next step.
                                </p>
                            </div>

                            {/* SHIPMENT DETAILS */}
                            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
                                <div className="flex items-center justify-between border-b border-border pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Courier
                                    </span>

                                    <span className="font-semibold text-foreground">
                                        {getCourierName()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-3">
                                    <span className="text-sm text-muted-foreground">
                                        AWB Number
                                    </span>

                                    <span className="font-mono text-sm font-bold text-foreground">
                                        {getAWB()}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onGenerateLabel}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-hover"
                            >
                                <Package size={18} />
                                Generate Label & Invoice
                            </button>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* GENERATING LABEL */}
                    {/* ================================= */}

                    {step === "generating-label" && (
                        <div className="py-10 text-center">
                            <Loader2
                                size={42}
                                className="mx-auto animate-spin text-primary"
                            />

                            <h3 className="mt-5 text-lg font-bold text-foreground">
                                Generating Documents
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Generating shipping label and invoice.
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Please wait...
                            </p>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* LABEL GENERATED */}
                    {/* ================================= */}

                    {step === "label-generated" && (
                        <div>
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Check
                                        size={32}
                                        className="text-green-600"
                                    />
                                </div>

                                <h3 className="mt-4 text-xl font-bold text-foreground">
                                    Shipment Ready
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Label and invoice have been generated.
                                </p>
                            </div>

                            {/* DOCUMENT STATUS */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                                            <Check
                                                size={17}
                                                className="text-green-600"
                                            />
                                        </div>

                                        <span className="text-sm font-medium">
                                            Shipping Label
                                        </span>
                                    </div>

                                    {(labelData.invoice && labelData.label) && (
                                        <a
                                            href={labelData?.label}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                        >
                                            Download
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                                            <Check
                                                size={17}
                                                className="text-green-600"
                                            />
                                        </div>

                                        <span className="text-sm font-medium">
                                            Invoice
                                        </span>
                                    </div>

                                    {(labelData.invoice && labelData.label) && (
                                        <a
                                            href={labelData.invoice}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                        >
                                            Download
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>

                                {/* <div className="flex items-center justify-between rounded-xl border border-border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                                            <Check
                                                size={17}
                                                className="text-green-600"
                                            />
                                        </div>

                                        <span className="text-sm font-medium">
                                            Invoice
                                        </span>
                                    </div>

                                    <span className="text-xs font-semibold text-green-600">
                                        Generated
                                    </span>
                                </div> */}
                            </div>

                            {/* LABEL BUTTON */}
                            {/* {getLabelUrl() && (
                                <a
                                    href={getLabelUrl()}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary"
                                >
                                    <Download size={18} />
                                    View / Download Label
                                </a>
                            )} */}

                            {/* PACK BUTTON */}
                            <button
                                type="button"
                                onClick={onMarkPacked}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-hover"
                            >
                                <Package size={18} />
                                Mark as Packed
                            </button>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* PACKING */}
                    {/* ================================= */}

                    {step === "packing" && (
                        <div className="py-10 text-center">
                            <Loader2
                                size={42}
                                className="mx-auto animate-spin text-primary"
                            />

                            <h3 className="mt-5 text-lg font-bold text-foreground">
                                Packing Your Order
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Your order is being packed and prepared for shipment.
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Please wait...
                            </p>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* PACKED */}
                    {/* ================================= */}

                    {step === "packed" && (
                        <div>
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Package
                                        size={32}
                                        className="text-green-600"
                                    />
                                </div>

                                <h3 className="mt-4 text-xl font-bold text-foreground">
                                    Order Packed
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    The package is ready for courier pickup.
                                </p>
                            </div>

                            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
                                <div className="flex items-center justify-between border-b border-border pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Courier
                                    </span>

                                    <span className="font-semibold">
                                        {getCourierName()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-3">
                                    <span className="text-sm text-muted-foreground">
                                        AWB
                                    </span>

                                    <span className="font-mono text-sm font-bold">
                                        {getAWB()}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onRequestPickup}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-hover"
                            >
                                <Truck size={18} />
                                Request Pickup
                            </button>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* REQUESTING PICKUP */}
                    {/* ================================= */}

                    {step === "requesting-pickup" && (
                        <div className="py-10 text-center">
                            <Loader2
                                size={42}
                                className="mx-auto animate-spin text-primary"
                            />

                            <h3 className="mt-5 text-lg font-bold text-foreground">
                                Requesting Pickup
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Sending pickup request to the courier.
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Please wait...
                            </p>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* PICKUP REQUESTED */}
                    {/* ================================= */}

                    {step === "pickup-requested" && (
                        <div className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <Truck
                                    size={32}
                                    className="text-green-600"
                                />
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-foreground">
                                Pickup Requested
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                The courier pickup request has been successfully
                                created.
                            </p>

                            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4 text-left">
                                <p className="text-xs text-muted-foreground">
                                    Courier
                                </p>

                                <p className="mt-1 font-semibold">
                                    {getCourierName()}
                                </p>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    AWB
                                </p>

                                <p className="mt-1 font-mono font-semibold">
                                    {getAWB()}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onGenerateManifest}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-hover"
                            >
                                <FileBraces size={18} />
                                Request Manifest
                            </button>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* GENERATING MANIFEST */}
                    {/* ================================= */}
                    {step === "generating-manifest" && (
                        <div className="py-10 text-center">
                            <Loader2
                                size={42}
                                className="mx-auto animate-spin text-primary"
                            />

                            <h3 className="mt-5 text-lg font-bold text-foreground">
                                Generating Manifest
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Generating the shipment manifest for this order.
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Please wait...
                            </p>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* MANIFEST GENERATED */}
                    {/* ================================= */}
                    {step === "manifest-generated" && (
                        <div className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <FileCheck
                                    size={32}
                                    className="text-green-600"
                                />
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-foreground">
                                Manifest Generated
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                The shipment manifest has been successfully generated.
                            </p>

                            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4 text-left">
                                <p className="text-xs text-muted-foreground">
                                    Courier
                                </p>

                                <p className="mt-1 font-semibold">
                                    {getCourierName()}
                                </p>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    AWB
                                </p>

                                <p className="mt-1 font-mono font-semibold">
                                    {getAWB()}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-hover"
                            >
                                Done
                            </button>
                        </div>
                    )}

                    {/* ================================= */}
                    {/* ERROR / UNKNOWN */}
                    {/* ================================= */}

                    {step === "error" && (
                        <div className="py-8 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <X
                                    size={32}
                                    className="text-red-600"
                                />
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-foreground">
                                Something went wrong
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                We couldn't complete this shipment step.
                                Please try again.
                            </p>

                            <button
                                className="mt-5 w-full rounded-xl border border-border py-3 font-semibold"
                                onClick={() => {
                                    const step = getNextShipmentStep();

                                    if (step) {
                                        tryagain(step);
                                    }
                                }}
                            >
                                Generate{" "}
                                {getNextShipmentStep() === "awb" && "AWB"}
                                {getNextShipmentStep() === "invoice" && "Invoice"}
                                {getNextShipmentStep() === "pickup-date" && "Pickup Date"}
                                {getNextShipmentStep() === "manifest" && "Manifest"}
                                {getNextShipmentStep() === "packed" && "Status"}

                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-5 w-full rounded-xl border border-border py-3 font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ShipmentModal;