export function dateKeyLocal(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function monthKeyLocal(dt) {
  // "YYYY-MM"
  return dateKeyLocal(dt).slice(0, 7);
}

export function startOfDayLocal(dt) {
  const x = new Date(dt);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function endOfDayLocal(dt) {
  const x = new Date(dt);
  x.setHours(23, 59, 59, 999);
  return x;
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}