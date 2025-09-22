import React, { useState, useEffect } from "react";

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const people = ["Evan", "Hyunjun", "Hee Joong", "Chloe"];
const chores = [
  ["Free Week (enjoy the weekend!)"],
  [
    "Take out indoor trash to backyard bins this week",
    "Empty bathroom trash can",
    "Take out trash bins to curb on Sunday",
  ],
  [
    "Clean the microwave (all purpose cleaner spray bottle)",
    "Wipe down the kitchen counters (all purpose cleaner spray bottle)",
    "Sweep the kitchen and dining room",
    "Mop the kitchen and dining room (1/2 tsp all purpose cleaner in mop bucket)",
    "Wash bath mat, bathroom rug, hand towels in both bathrooms, and kitchen drying rags",
  ],
  [
    "Clean bathroom sinks (magic eraser and water)",
    "Clean bathroom toilets from top to bottom (all purpose cleaner spray bottle and rags)",
    "Clean bathroom toilet bowls (toilet bowl cleaner)",
    "Pick up big trash items from bathroom floors",
    "Mop bathroom floors (1/2 tsp all purpose cleaner in mop bucket)",
  ],
];
const memberColors = ["#584053", "#8DC6BF", "#FCBC66", "#F97B4F"];

function getCurrentWeekIndex() {
  // Create a 'now' date string in Eastern Time (e.g. '2025-09-20')
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(now);
  const dateParts = {};
  parts.forEach(({ type, value }) => {
    if (type !== "literal") dateParts[type] = value;
  });

  const localDateString = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
  const localNow = new Date(localDateString + "T00:00:00");

  // Calculate week index from local time
  const startDate = new Date("2024-01-01T00:00:00-05:00"); // EDT base time
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const diffWeeks = Math.floor((localNow - startDate) / msPerWeek);
  return diffWeeks % people.length;
}

function WeeklyChores() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const weekIndex = getCurrentWeekIndex();
    const rotatedPeople = [...people.slice(weekIndex), ...people.slice(0, weekIndex)];
    const assigned = chores.map((choreList, i) => ({
    person: rotatedPeople[i],
    chores: choreList
    }));
    setAssignments(assigned);
  }, []);

  return (
    <div className="chore-card mb-6 border-b pb-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Chore Assignments</h1>
      <p className="text-center text-sm text-gray-600 mb-4">Today is {today}</p>
      {assignments.map(({ person, chores }, idx) => (
        <div
          key={idx}
          className="mb-6 border rounded-md p-4 text-center"
          style={{ borderColor: "#ccc" }}
        >
          <div
            className="text-center font-bold text-lg py-2 rounded-t"
            style={{
              backgroundColor: memberColors[idx % memberColors.length],
              color: memberColors[idx % memberColors.length] === "#584053" ? "white" : "black"
            }}
          >
          {person}
          </div>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {chores.map((chore, i) => (
              <li key={i}>{chore}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WeeklyChores;