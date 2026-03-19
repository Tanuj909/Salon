// Simple time formatter — no extra library needed
export const formatDistanceToNow = (dateString) => {
  if (!dateString) return "";

  // Handle high-precision ISO strings (e.g. .667766 -> .667) for better browser compatibility
  let sanitized = dateString;
  if (dateString.includes("T") && dateString.includes(".")) {
    const parts = dateString.split(".");
    if (parts.length > 1) {
      // Keep everything before the dot, and only 3 digits after the dot
      const fraction = parts[1].replace(/Z$/, "");
      sanitized = `${parts[0]}.${fraction.substring(0, 3)}`;
      if (dateString.endsWith("Z")) sanitized += "Z";
    }
  }

  const date = new Date(sanitized);
  
  // If parsing failed, fallback to raw string or local date part
  if (isNaN(date.getTime())) {
    return dateString.split("T")[0] || ""; 
  }

  const now  = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 0)               return "just now";
  if (diff < 60)              return "just now";
  if (diff < 3600)            return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)           return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7)       return `${Math.floor(diff / 86400)}d ago`;

  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};