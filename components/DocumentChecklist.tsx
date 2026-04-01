"use client";

import { useState } from "react";
import { Document } from "@/data/visa-paths";

interface DocumentChecklistProps {
  documents: Document[];
}

export default function DocumentChecklist({
  documents,
}: DocumentChecklistProps) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-700">
          Documents needed
          {checkedCount > 0 && (
            <span className="ml-2 text-xs font-medium text-blue-600">
              {checkedCount}/{documents.length} checked
            </span>
          )}
        </span>
        <span
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul className="mt-3 space-y-2">
          {documents.map((doc, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id={`doc-${i}`}
                checked={checked[i] ?? false}
                onChange={(e) =>
                  setChecked((prev) => ({ ...prev, [i]: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
              />
              <label
                htmlFor={`doc-${i}`}
                className={`text-sm cursor-pointer ${
                  checked[i]
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {doc.name}
                {doc.notes && (
                  <span className="block text-xs text-gray-500 mt-0.5 no-underline" style={{ textDecoration: "none" }}>
                    {doc.notes}
                  </span>
                )}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
