import React, { useState } from "react";
import { X, Truck, Star, Clock, IndianRupee, Check } from "lucide-react";

const CourierModal = ({
  isOpen,
  onClose,
  couriers = [],
  onSelectCourier,
}) => {
  const [selectedCourier, setSelectedCourier] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (courier) => {
    setSelectedCourier(courier);
  };

  const handleConfirm = () => {
    if (!selectedCourier) return;

    onSelectCourier(selectedCourier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDD5CF] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#2C1810]">
              Available Couriers
            </h2>

            <p className="mt-1 text-sm text-[#9B7B75]">
              Select a courier for this shipment
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#9B7B75] transition hover:bg-[#FDF5F3] hover:text-[#2C1810]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Courier List */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {couriers?.length === 0 ? (
            <div className="py-12 text-center">
              <Truck
                size={40}
                className="mx-auto mb-3 text-[#C8756A]"
              />

              <p className="font-semibold text-[#2C1810]">
                No couriers available
              </p>

              <p className="mt-1 text-sm text-[#9B7B75]">
                No courier service is available for this shipment.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {couriers.length > 0 && couriers?.map((courier) => {
                const courierId =
                  courier.courier_company_id ||
                  courier.id ||
                  courier.courier_id;

                const isSelected =
                  selectedCourier &&
                  (
                    selectedCourier.courier_company_id ||
                    selectedCourier.id ||
                    selectedCourier.courier_id
                  ) === courierId;

                return (
                  <button
                    key={courierId}
                    type="button"
                    onClick={() => handleSelect(courier)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${isSelected
                      ? "border-[#C8756A] bg-[#FDF5F3] ring-2 ring-[#C8756A]/20"
                      : "border-[#EDD5CF] hover:border-[#C8756A] hover:bg-[#FDF5F3]"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-4">

                      {/* Courier Info */}
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1DBD5]">
                          <Truck
                            size={22}
                            className="text-[#C8756A]"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-[#2C1810]">
                            {courier.courier_name ||
                              courier.name ||
                              "Unknown Courier"}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#9B7B75]">
                            <span className="flex items-center gap-1">
                              <Star
                                size={13}
                                className="fill-current"
                              />
                              {courier.rating ||
                                courier.rating ||
                                "N/A"}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock size={13} />
                              {courier.etd ||
                                courier.estimated_delivery_days ||
                                "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div
                        className="flex gap-4"
                      >
                        <div className="shrink-0 text-right">
                          <div className="flex items-center justify-end font-bold text-[#2C1810]">
                            <IndianRupee size={14} />
                            {courier.freight_charge ??
                              courier.freight ??
                              0}
                          </div>

                          <p className="mt-1 text-xs text-[#9B7B75]">
                            Shipping
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="flex items-center justify-end font-bold text-[#2C1810]">
                            <IndianRupee size={14} />
                            {courier.cod_charges ?? 0}
                          </div>

                          <p className="mt-1 text-xs text-[#9B7B75]">
                            COD charge
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {courier.cod === 1 || courier.cod === true ? (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          COD Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                          COD Unavailable
                        </span>
                      )}

                      {courier.pickup_availability === "1" ||
                        courier.pickup_available === true ? (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Pickup Available
                        </span>
                      ) : null}

                      {isSelected && (
                        <span className="ml-auto flex items-center gap-1 rounded-full bg-[#2C1810] px-3 py-1 text-xs font-semibold text-white">
                          <Check size={13} />
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#EDD5CF] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#EDD5CF] px-5 py-2.5 text-sm font-semibold text-[#2C1810] transition hover:bg-[#FDF5F3]"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedCourier}
            onClick={handleConfirm}
            className="rounded-lg bg-[#2C1810] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3D241A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Assign Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourierModal;