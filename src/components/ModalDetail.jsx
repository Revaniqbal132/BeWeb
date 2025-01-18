import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatRupiah";
import { Circles } from "react-loader-spinner";

const LeaveRequestModal = ({ isOpen, onClose, data, onSubmit, loading }) => {
  const [salaryCut, setSalaryCut] = useState(0);
  if (!data) return null;

  const cutSalaryByAmount = () => {
    const salary = 40000 * data.amount;
    setSalaryCut(salary);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approve":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch {
      return dateString;
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Leave Request Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Employee Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Full Name:</p>
                <p>{data.fullname}</p>
                <p className="text-gray-600">Email:</p>
                <p>{data.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Leave Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Leave Type:</p>
                <p className="capitalize">
                  {data.jenisCuti?.replace(/_/g, " ")}
                </p>
                <p className="text-gray-600">Duration:</p>
                <p>{data.amount} days</p>
                <p className="text-gray-600">Start Date:</p>
                <p>{formatDate(data.startDate)}</p>
                <p className="text-gray-600">End Date:</p>
                <p>{formatDate(data.endDate)}</p>
                <p className="text-gray-600">Reason:</p>
                <p>{data.reason}</p>
                <p className="text-gray-600">Status:</p>
                <Badge className={`${getStatusColor(data.status)} text-white`}>
                  {data.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Additional Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Remaining Leave:</p>
                <p>{data.totalCuti} days</p>
                <p className="text-gray-600">Request ID:</p>
                <p className="break-all text-sm">{data.id}</p>
                <p className="text-gray-600">Timestamp:</p>
                <p>
                  {new Date(data.timeStamp.seconds * 1000).toLocaleString()}
                </p>
                <p className="text-gray-600">Salary Cut</p>
                <div className="flex items-center justify-between">
                  {data.salary == 0 ? (
                    <>
                      <p>Rp {formatCurrency(salaryCut)}</p>
                      <button
                        onClick={cutSalaryByAmount}
                        className="text-white text-sm p-2 rounded-md bg-red-500 border"
                      >
                        Cut the salary
                      </button>
                    </>
                  ) : (
                    <p>Rp {formatCurrency(data.salary)}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {data.salary == 0 && (
                <button
                  disabled={salaryCut == 0}
                  onClick={() => onSubmit(data, salaryCut)}
                  className={`text-white text-sm p-2 rounded-md border ${
                    salaryCut == 0
                      ? "cursor-not-allowed bg-gray-500 "
                      : "bg-green-500 "
                  }`}
                >
                  {loading ? (
                   <Circles
                   height="20"
                   width="20"
                   color="#ffffff"
                   ariaLabel="circles-loading"
                   wrapperStyle={{}}
                   wrapperClass=""
                   visible={true}
                   />
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRequestModal;
