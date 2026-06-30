interface Row {
  situation: string;
  tool: string;
  why: string;
}

export default function DecisionTable({ rows }: { rows: Row[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            <th className="px-4 py-3 text-left font-semibold">Situation</th>
            <th className="px-4 py-3 text-left font-semibold">Recommended Tool</th>
            <th className="px-4 py-3 text-left font-semibold">Why</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-medium text-[#1e3a5f]">{row.situation}</td>
              <td className="px-4 py-3 font-mono text-[#2da44e] font-semibold">{row.tool}</td>
              <td className="px-4 py-3 text-gray-600">{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
