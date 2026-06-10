/**
 * Fake packages API module.
 *
 * To wire up a real backend, replace the body of fetchPackages with:
 *
 *   const res = await fetch('/api/packages');
 *   if (!res.ok) throw new Error(`HTTP ${res.status}`);
 *   return res.json();
 *
 * The shape of each package object is the contract your backend should match.
 */

/** @type {import('./types').Package[]} */
const PACKAGES = [
  {
    id: 1,
    slug: "udri-mujo",
    tag: "01 - UDRI MUJO",
    name: "UDRI MUJO",
    description:
      "25 minutes. One person. A modest pile of things waiting to meet their end.",
    includes: [
      "Small electrical device",
      "16 mixed breakables",
      "Safety suit + gloves + goggles",
    ],
    price: 25,
    currency: "KM",
    featured: false,
    durationMinutes: 25,
    maxPeople: 1,
  },
  {
    id: 2,
    slug: "double-breakdown",
    tag: "02 — Double Breakdown",
    name: "DOUBLE BREAKDOWN",
    description:
      "30 minutes for two. Double the pile. Bring a friend and make it competitive.",
    includes: [
      "Medium sized electrical device",
      "32 mixed breakables",
      "Full gear for 2 people",
    ],
    price: 45,
    currency: "KM",
    featured: false,
    durationMinutes: 30,
    maxPeople: 2,
  },
  {
    id: 3,
    slug: "group-therapy",
    tag: "03 — Group Therapy",
    name: "GROUP THERAPY",
    description:
      "40 minutes, up to 4 people, maximum destruction. Good for teams, bad days, and birthdays.",
    includes: [
      "Car windshield",
      "42 mixed breakables",
      "Full gear for up to 4",
    ],
    price: 60,
    currency: "KM",
    featured: false,
    durationMinutes: 40,
    maxPeople: 4,
  },
  {
    id: 4,
    slug: "total-chaos",
    tag: "04 — Total Chaos",
    name: "TOTAL CHAOS",
    description:
      "50 minutes of pure mayhem. Bigger targets, heavier hits, and enough breakables to keep the adrenaline high from start to finish.",
    includes: [
      "Medium and large electrical devices",
      "53 mixed breakables",
      "Full gear for up to 4",
    ],
    price: 80,
    currency: "KM",
    featured: false,
    durationMinutes: 50,
    maxPeople: 4,
  },
  {
    id: 5,
    slug: "jackpot-smash",
    tag: "05 — Jackpot Smash",
    name: "JACKPOT SMASH",
    description:
      "60 minutes. The ultimate prize awaits. Take your swing at a real slot machine and finish with a legendary destruction session worthy of the jackpot.",
    includes: ["Slot machine", "38 mixed breakables", "Full gear for up to 4"],
    price: 100,
    currency: "KM",
    featured: true,
    durationMinutes: 60,
    maxPeople: 4,
  },
];

/**
 * Fetch all available session packages.
 * @returns {Promise<typeof PACKAGES>}
 */
export async function fetchPackages() {
  // Simulate realistic network latency
  await new Promise((r) => setTimeout(r, 380));
  return PACKAGES;
}
