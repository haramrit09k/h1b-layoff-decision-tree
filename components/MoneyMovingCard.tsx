const links = [
  {
    label: "Wise — USD→INR transfers",
    url: "https://wise.com",
    description: "Real exchange rate, low fees, send money to India or Canada",
    sponsored: true,
  },
  {
    label: "ICICI Bank NRE account",
    url: "https://www.icicibank.com/nri",
    description: "Tax-free in India, fully repatriable, ~7% FD interest",
    sponsored: true,
  },
  {
    label: "Remitly — fast India transfers",
    url: "https://www.remitly.com",
    description: "Guaranteed exchange rates, transfers arrive in minutes",
    sponsored: true,
  },
];

export default function MoneyMovingCard() {
  return (
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <h3 className="font-bold text-gray-900 text-base mb-1">
        Moving your US savings
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Whether you stay, transfer, or return home — having accounts in India
        or Canada gives you financial flexibility.
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.url} className="flex flex-col">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              → {link.label}
              <span className="text-gray-400 font-normal ml-1 text-xs">(ad)</span>
            </a>
            <span className="text-xs text-gray-400 ml-4">{link.description}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 mt-4">
        We may earn a commission if you open an account through these links.
        This doesn&apos;t affect the information we provide.
      </p>
    </div>
  );
}
