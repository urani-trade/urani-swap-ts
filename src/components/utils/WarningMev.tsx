export default function WarningMev() {
  return (
    <div className="flex items-center bg-rose-50 rounded-md p-4 text-sm border border-orange-700">
      <span className="material-symbols-rounded text-orange-700 mr-3">
        warning_amber
      </span>
      <p className="text-orange-700">
        <strong>Warning:</strong> This order will not be MEV protected. Be
        careful with slippage.
      </p>
    </div>
  );
}
