import React from "react";
import FormField from "./FormField";

const SummarySection = ({ summary, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-9 gap-2 bg-gray-50 p-2 rounded mt-4">
    <FormField label="Total Amount" value={summary.totalAmount} onChange={e => onChange("totalAmount", e.target.value)} type="number" />
    <FormField label="Disc %" value={summary.discountPercent} onChange={e => onChange("discountPercent", e.target.value)} type="number" />
    <FormField label="/ Rs." value={summary.discountRs} onChange={e => onChange("discountRs", e.target.value)} type="number" />
    <FormField label="Freight" value={summary.freight} onChange={e => onChange("freight", e.target.value)} type="number" />
    <FormField label="Labour" value={summary.labour} onChange={e => onChange("labour", e.target.value)} type="number" />
    <FormField label="Net Amount" value={summary.netAmount} onChange={e => onChange("netAmount", e.target.value)} type="number" />
    <FormField label="Receive" value={summary.receive} onChange={e => onChange("receive", e.target.value)} type="number" />
    <FormField label="Balance" value={summary.balance} onChange={e => onChange("balance", e.target.value)} type="number" />
    <FormField label="Total Weight" value={summary.totalWeight} onChange={e => onChange("totalWeight", e.target.value)} type="number" />
  </div>
);

export default SummarySection; 